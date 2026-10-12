# SEO / AEO indexing rollout

## Scope

This branch prepares the VitrixLab portfolio for discovery and clearer interpretation by search engines and answer engines. It does not claim that Google has indexed the site; indexing and ranking are controlled by external systems.

## Included

- `frontend/public/robots.txt` allows normal crawling and advertises the sitemap.
- `frontend/public/sitemap.xml` lists the canonical homepage at `https://vitrixlab.com/`.

## Before merge / deployment

1. Confirm the production canonical host. This change assumes `https://vitrixlab.com/` is canonical. If `www.vitrixlab.com` is canonical instead, update the sitemap and robots sitemap URL consistently and configure a permanent redirect from the alternate host.
2. Confirm Vercel serves `/robots.txt` and `/sitemap.xml` from the deployed frontend root.
3. Inspect `frontend/public/index.html` and ensure the title, meta description, canonical URL, Open Graph metadata, and JSON-LD describe the actual portfolio and match visible page content. Avoid duplicating structured data or claiming credentials not supported by the page.
4. In Google Search Console, verify the domain via a DNS TXT record in Cloudflare, submit `https://vitrixlab.com/sitemap.xml`, and inspect the homepage. Request indexing after deployment.
5. Check Google Search Console URL Inspection and Page Indexing reports for crawl, canonical, and indexing errors. A zero-result `site:` query is a clue, not definitive proof that no URL is indexed.

## AEO (answer-engine readiness)

- State who VitrixLab is, what it offers, and who it serves in concise, visible page copy.
- Use descriptive headings and direct answers; keep important information in crawlable HTML text rather than image-only content.
- Use semantic landmarks, descriptive links, and meaningful image alt text.
- Add JSON-LD only when it accurately reflects visible content. Consider `Organization` / `Person` and `WebSite` schema where appropriate; validate before release.
- Keep contact details, brand naming, and profile links consistent across the site and official profiles.
- Earn relevant, legitimate references from GitHub profiles, professional profiles, partner pages, and useful public technical writing. Do not buy links or add irrelevant directory spam.

## Acceptance checks

- [ ] Production `/robots.txt` returns HTTP 200 and does not disallow the whole site.
- [ ] Production `/sitemap.xml` returns valid XML with the correct canonical host.
- [ ] Sitemap URLs return successful responses and are canonical, indexable pages.
- [ ] No unintended `noindex` directive or conflicting canonical is present.
- [ ] Metadata and structured data match the rendered page and are free of unsupported claims.
- [ ] Google Search Console sitemap submission and URL inspection completed after deployment.
- [ ] Indexing status is reported from Search Console evidence, not inferred solely from `site:`.

## Limitation

The sitemap currently lists only the homepage because the route inventory and canonical URL policy have not been verified in this change. Add only confirmed, publicly accessible canonical routes after reviewing the app router and deployment configuration. Sitemap submission helps discovery; it does not guarantee indexing or ranking.
