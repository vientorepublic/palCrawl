import axios, { isAxiosError } from "axios";
import type { ITableData } from "./types";
import * as cheerio from "cheerio";
import { Config } from "./config";

async function getHTML(url: string): Promise<string> {
  try {
    const http = axios.create({
      baseURL: Config.DOMAIN,
    });
    const res = await http.get(url, {
      headers: {
        "User-Agent": Config.UserAgent,
      },
    });
    return res.data as string;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response.statusText);
    } else {
      throw new Error();
    }
  }
}

function parseHTML(data: string): ITableData[] {
  const $ = cheerio.load(data);
  const body = $("body");
  const table = body.find("table > tbody > tr");
  const output: ITableData[] = [];
  table.map((i, el) => {
    let subject = $(el).find("td.td_block > a.board_subject").text().trim();
    if (subject) {
      const link = $(el).find("td.td_block > a.board_subject").attr("href");
      const numComments = Number($(el).find("td:nth-child(8)").text().replace(",", "").trim());
      const proposerCategory = $(el).find("td:nth-child(3)").text().trim();
      const committee = $(el).find("td:nth-child(4)").text().trim();
      const num = i + 1;
      let boardLink = "";
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

async function main() {
  const html = await getHTML(Config.URL);
  console.log(parseHTML(html));
}
main();
