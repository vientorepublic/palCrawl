import { PalCrawl } from './pal';

describe('PalCrawl', () => {
  test('getPalHTML: should be return string', async () => {
    const palCrawl = new PalCrawl();
    const html = await palCrawl.getPalHTML();
    expect(typeof html).toBe('string');
  });
  test('parseTable: array length should be 0 when invalid html', () => {
    const palCrawl = new PalCrawl();
    const table = palCrawl.parseTable('asdf');
    expect(table).toHaveLength(0);
  });
  test('get: array length should be 10', async () => {
    const palCrawl = new PalCrawl();
    const table = await palCrawl.get();
    expect(table).toHaveLength(10);
  });
});
