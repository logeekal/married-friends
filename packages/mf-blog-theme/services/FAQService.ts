import { Faq } from "../src/types/wp-graphql.types";
import { IFAQRestContent, IWPGraphQL } from '../utils/types'
import axios from 'axios'

const host = `https://www.backend-primary.marriedfriends.in`;

export default class FAQService {
  graphql: any;
  actions: any;
  host: string;

  constructor(graphql: any, actions: any) {
    this.graphql = graphql;
    this.actions = actions;
    this.host = process.env.MF_HOST;
    if (!this.host) throw new Error(`Backend host is empty : ${this.host}`)
  }

  getAllFAQs = async (): Promise<Array<Faq>> => {
    const GET_ALL_FAQ = `
      query GET_ALL_FAQ {
        wpgraphql {
          faqs(first: 1000) {
            nodes {
              id
              title
              content
              faqId
            }
          }
        }
      }
    `;

    const response:  IWPGraphQL<{
      faqs: { nodes: Array<Faq> };
    }> = await this.graphql(GET_ALL_FAQ);

    return response.data.wpgraphql.faqs.nodes;

  };


  getAllFAQREST =  async(): Promise<Array<IFAQRestContent>> => {
    
    const res = await axios.get<Array<IFAQRestContent>>(`${this.host}/wp-json/wp/v2/helpie_faq?per_page=100`);

    const faqs = res.data
    
    return faqs
  }
}
