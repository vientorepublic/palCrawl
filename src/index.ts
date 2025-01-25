import axios, { isAxiosError } from 'axios';
import * as cheerio from 'cheerio';
import { Config } from './config';

export interface ITableData {
  num: number;
  subject: string;
  proposerCategory: string;
  committee: string;
  numComments: number;
  link: string;
}

export class PalCrawl {
  public async getPalHTML(): Promise<string> {
    try {
      const res = await axios.get<string>(Config.URL, {
        baseURL: Config.DOMAIN,
        headers: {
          'User-Agent': Config.UserAgent,
        },
      });
      return res.data;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        throw new Error(
          `Invalid response: ${err.response.status} ${err.response.statusText}`,
        );
      } else {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          console.error(err);
          throw new Error('Unknown Error');
        }
      }
    }
  }

  public parseTable(html: string): ITableData[] {
    const $ = cheerio.load(html);
    const body = $('body');
    const table = body.find('table > tbody > tr');
    const output: ITableData[] = [];
    table.map((i, el) => {
      const subject = $(el).find('td.td_block > a.board_subject').text().trim();
      if (subject) {
        const link = $(el).find('td.td_block > a.board_subject').attr('href');
        const numComments = Number(
          $(el).find('td:nth-child(8)').text().replace(',', '').trim(),
        );
        const proposerCategory = $(el).find('td:nth-child(3)').text().trim();
        const committee = $(el).find('td:nth-child(4)').text().trim();
        const num = Number($(el).find('td:nth-child(1)').text().trim());
        let boardLink = '';
        if (link) {
          boardLink = Config.DOMAIN + link;
        }
        output.push({
          num,
          subject,
          proposerCategory,
          committee,
          numComments,
          link: boardLink,
        });
      }
    });
    return output;
  }

  public async main(): Promise<void> {
    const html = await this.getPalHTML();
    const table = this.parseTable(html);
    console.log(table);
  }
}

const palCrawl = new PalCrawl();
palCrawl.main();
