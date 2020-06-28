import { Post } from "../types/wp-graphql.types";

let defaultDateFormatOption = {
  day: "2-digit",
  year: "numeric",
  month: "long"
};

interface IFormattedDate {
  day: number;
  month: string;
  year: number;
}

export function extractTextfromHTML(html) {
  if (document) {
    let span = document.createElement("span");
    span.innerHTML = html;
    return span.innerText;
  }
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
    year: 0
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
    slug += `/${currCategory.parent.slug}`;
    currCategory = currCategory.parent;
  }

  return `${slug}/${post.slug}`;
}
