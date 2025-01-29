# 국회 입법예고 크롤러

[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![stars - pal-crawl](https://img.shields.io/github/stars/vientorepublic/pal-crawl?style=social)](https://github.com/vientorepublic/pal-crawl)
[![forks - pal-crawl](https://img.shields.io/github/forks/vientorepublic/pal-crawl?style=social)](https://github.com/vientorepublic/pal-crawl)

국회입법예고(pal.assembly.go.kr)의 진행 중인 입법 예고 크롤러

## How to use

```javascript
import { PalCrawl } from 'pal-crawl';

const palCrawl = new PalCrawl();
const table = await palCrawl.get();

console.log(table);
```

## License

MIT
