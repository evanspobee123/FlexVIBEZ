# Opening Act

A read-only music discovery site, hosted on Cloudflare Workers with static assets. There are no accounts, profiles or uploads.

```
opening-act/
├── wrangler.jsonc          Cloudflare config
├── package.json
├── .gitignore
├── README.md
├── src/
│   └── worker.js           Adds security and cache headers
└── public/                 Everything visitors can see
    ├── index.html
    ├── spotlight.html
    ├── releases.html
    ├── interviews.html
    ├── reviews.html
    ├── stories.html
    ├── upcoming-projects.html
    ├── 404.html
    ├── robots.txt
    ├── sitemap.xml
    └── styles.css
```

On Cloudflare the pages load without the .html ending (for example `/releases`). The files also work if you open them straight from your computer.

## Deploy

```
npm install
npx wrangler login
npm run dev      # preview locally
npm run deploy   # publish to Cloudflare
```

## Before you launch

1. Replace `https://opening-act.example.com` in `public/sitemap.xml` and `public/robots.txt` with your real domain.
2. Add your custom domain in the Cloudflare dashboard, or add a `routes` entry to `wrangler.jsonc`.
3. Content is edited directly in the HTML files in `public/`.
