import fetch from 'node-fetch';

export default class MailchimpClient {

  LIST_ID :string;
  MAILCHIMP_API_KEY: string;
  MAILCHIMP_URL: string;

  constructor() {
    this.LIST_ID = process.env.MAILCHIMP_LIST_ID;
    this.MAILCHIMP_API_KEY = process.env.MAILCHIMP_KEY;

    this.MAILCHIMP_URL = "https://us19.api.mailchimp.com/3.0";
    



    if (!this.LIST_ID || !this.MAILCHIMP_API_KEY) {
      throw new Error(`Mailchimp List ID or API Key invalid`);
    }else{
      console.log('Mailchimp Config : ', {
        LIST_ID: this.LIST_ID,
        API_KEY: this.MAILCHIMP_API_KEY,
      })
    }
  }

  addMemberToList = async (email: string, tags: string[]) => {
    const response = await fetch(
      `${this.MAILCHIMP_URL}/lists/${this.LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.getAuthorizationString()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          tags,
          status: "subscribed"
        }),
      } 
    );

    return response;
  };

  getAuthorizationString = () => {
    return Buffer.from(`SOMESTRING:${this.MAILCHIMP_API_KEY}`).toString("base64");
  };
}
