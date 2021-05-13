import * as Cheerio from "cheerio";

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

  console.log('=== stripping')
  const $ = Cheerio.load(htmlString);

  $("section.helpie-faq").remove();

  console.log($.html())

  return $.html()
}
