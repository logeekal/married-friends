import { Post } from "../types/wp-graphql.types";
import { document } from "browser-monads";
import { IDuration } from '../types/common'

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

  let dateFormat = new Intl.DateTimeFormat("en", dateFormatOption as any);

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

export const ifWindow = () => {
  return typeof window !== "undefined";
};

export const getStepURL = (
  sectionTitle: string,
  stepTitle: string,
  stepCounter: number
) => {
  let stepURL = "";
  if (sectionTitle) {
    stepURL = stepURL + sectionTitle.toLowerCase().replace(" ", "-");
    stepURL += "-";
  } else {
    stepURL += "";
  }

  if (stepTitle) {
    stepURL += stepTitle.toLowerCase().replace(" ", "-");
    stepURL += "-";
  } else {
    stepURL += "";
  }

  stepURL += `step-${stepCounter}`;

  return stepURL;
};


export const addDurations = (durations: IDuration[])  => {

  const totalDuration : IDuration = {
    hours: 0,
    minutes: 0
 
  }

  console.log('Adding durations : ', durations)

  durations.forEach(duration => {
    totalDuration.hours += duration.hours;
    totalDuration.minutes += duration.minutes;
  })


  return convertTimeToHighestUnit(totalDuration)

}


export const convertTimeToHighestUnit = (duration :IDuration): IDuration  => {
  let additionalHours : number = 0
  let leftoverMinutes: number;
  if(duration.minutes  >= 60){
    additionalHours = Math.floor(duration.minutes/60);
    leftoverMinutes = duration.minutes % 60;
  }

  if(typeof leftoverMinutes === 'undefined'){
    leftoverMinutes = duration.minutes
  }

  return {
    hours: duration.hours + additionalHours,
    minutes: leftoverMinutes
  }
}

export const convertDurationToISO8601 = (duration: IDuration): string => {
  let result = "PT";

  //if(!duration.hours && !duration.minutes){
    //throw new Error(`Invalid Duration value :${JSON.stringify(duration) }`)
  //}

  if(duration.hours > 0){
    result += duration.hours + "H"  
  }

  if(duration.minutes > 0) {
    result += duration.minutes + "M"
  }

  return result
}


export function log(...args){
  if (process.env.NODE_ENV === 'development'){
    console.log( new Date().toUTCString(),'---',...args)
  }
}
