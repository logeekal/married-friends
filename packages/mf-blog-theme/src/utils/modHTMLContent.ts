import * as Cheerio from "cheerio";
import {log} from ".";

export function getFAQs(htmlString: string): number[] {
  const $ = Cheerio.load(htmlString);

  const faqSection = $("section.helpie-faq");

  const questions = faqSection.find("div.accordion__header").toArray();

  if (!questions || questions.length === 0) {
    return [];
  }

  const faqIds: number[] = questions.map((ques) => {
    if (ques.type === "tag") {
      return parseInt(ques.attribs["data-id"].split("-")[1]);
    }
  });

  return faqIds;
}

export function stripFAQSection(htmlString: string) {
  log("=== stripping");
  const $ = Cheerio.load(htmlString);

  $("section.helpie-faq").remove();

  log($.html());

  return $.html();
}

export function replaceYTwithLiteTY(htmlString: string, title: string) {
  let videoId = getYoutubeVideoId(htmlString)
  if(!videoId){
    //  is no iframe and video in the article
    return htmlString;
  }

  const $ = Cheerio.load(htmlString)

  $("iframe.youtube-player").remove()

  $("span.embed-youtube").append(`<lite-youtube videoid=${videoId} title="${title}" videoTitle="${title}"/>`)

  return $.html()

}

export function getYoutubeVideoId(htmlString: string) {
  log("Getting video id")
  const $ = Cheerio.load(htmlString);

  const ytIframe = $("iframe.youtube-player").toArray();
  log({ytIframe})

  if (!ytIframe) {
    return null;
  }



  if (ytIframe[0] && ytIframe[0].type === "tag") {
    let ytEmbedURL = new URL(ytIframe[0].attribs["src"]);
    log({ytEmbedURL})

    let vidId = ytEmbedURL.pathname.split("/")[2];
    log(`Found video ID: ${vidId}`);
    return vidId;
  }
}
