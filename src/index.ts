import axios from "axios";
import * as cheerio from "cheerio";
import { Config } from "./config";
import type { ITableData } from "./types";

async function getHTML(url: string): Promise<string | null> {
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
    return null;
  }
}

function parseHTML(data: string): ITableData[] {
  const $ = cheerio.load(data);
  const body = $("body");
  const table = body.find("table > tbody > tr");
  const output: ITableData[] = [];
  table.map((i, el) => {
    let subject = $(el).find("td.td_block > a.board_subject").text().replace("\n", "").trim();
    if (subject) {
      const link = $(el).find("td.td_block > a.board_subject").attr("href");
      let boardLink = "";
      let num = i + 1;
      if (link) {
        boardLink = Config.DOMAIN + link;
      }
      output.push({
        num,
        subject,
        link: boardLink,
      });
    }
  });
  return output;
}

async function main() {
  const html = await getHTML(Config.URL);
  if (html) {
    console.log(parseHTML(html));
  }
}
main();
