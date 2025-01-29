import { PalCrawl } from './pal';

describe('PalCrawl', () => {
  test('get: array length should be 10', async () => {
    const palCrawl = new PalCrawl();
    const list = await palCrawl.get();
    expect(list).toHaveLength(10);
  });
});
