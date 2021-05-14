import { Post } from "../types/wp-graphql.types";
import { document } from "browser-monads";

let defaultDateFormatOption = {
  day: "2-digit",
  year: "numeric",
  month: "long",
};

interface IFormattedDate {
  day: number;
  month: string;
  year: number;
}

export function extractTextfromHTML(html) {
  let span = document.createElement("span");
  let result = "";
  if ("innerHTML" in span) {
    result = span.innerHTML;
  }
  return result;
}

export function getFormattedDate(
  dateInString: string | number | Date,
  dateFormatOption = defaultDateFormatOption
): IFormattedDate {
  let date: Date;
  if (!dateInString) {
    date = new Date();
  } else {
    date = new Date(dateInString);
  }

  let dateFormat = new Intl.DateTimeFormat("en", dateFormatOption);

  let formattedParts: Array<{
    type: string;
    value: string;
  }> = dateFormat.formatToParts(date);
  let result: IFormattedDate = {
    day: 0,
    month: "",
    year: 0,
  };
  for (let part of formattedParts) {
    if (part.type in result) {
      result[part.type] = part.value;
    }
  }

  return result;
}

export function makePostSlug(post: Post): string {
  const baseCategory = post.categories.nodes[0];
  let slug = `/${baseCategory.slug}`;
  let currCategory = baseCategory;
  while (currCategory.parent) {
    slug += `/${currCategory.parent.node.slug}`;
    currCategory = currCategory.parent;
  }

  return `${slug}/${post.slug}`;
}

export function genCompleteURL(
  URLWithPath: string,
  params: Record<string, string>
) {
  let qs: string = "";
  for (let key in params) {
    let ampersand = "&";
    if (qs.length == 0) {
      ampersand = "?";
    }

    qs =
      qs +
      ampersand +
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])} `;
  }

  return `${URLWithPath}${qs}`;
}
