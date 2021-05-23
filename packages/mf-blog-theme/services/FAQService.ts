import { Faq } from "../src/types/wp-graphql.types";
import { IWPGraphQL } from '../utils/types'

export default class FAQService {
  graphql: any;
  actions: any;

  constructor(graphql: any, actions: any) {
    this.graphql = graphql;
    this.actions = actions;
  }

  getAllFAQs = async (): Promise<Array<Faq>> => {
    const GET_ALL_FAQ = `
      query GET_ALL_FAQ {
        wpgraphql {
          faqs {
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
}
