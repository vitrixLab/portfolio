# SEO / AEO Batch 2 — page metadata integrity

## Scope

This batch follows the discovery baseline in PR #19 and applies Google's SEO Starter Guide to the existing single-page portfolio.

## Changes

- Align canonical, Open Graph URL, and JSON-LD page URLs with the `https://vitrixlab.com/` host assumed by the sitemap in Batch 1.
- Remove the `meta keywords` tag, which Google Search does not use for indexing or ranking.
- Remove generic, non-standard "AI-friendly" meta tags and the `revisit-after` hint rather than treating them as ranking controls.
- Remove structured-data claims for cloud/Kubernetes certifications and an education provider because the repository content does not substantiate those claims.
- Remove duplicate Person microdata on the document root/body; retain JSON-LD as the structured-data source.

## Important domain gate

The code now consistently assumes `https://vitrixlab.com/` is the production canonical host. This is not proof that the domain is attached to the production deployment. Before release, confirm domain ownership and production routing, verify that the site is actually intended to live at this host, and configure permanent redirects from alternate hosts. If the portfolio is meant to remain at `soojidano.vercel.app`, revert the host substitutions and update Batch 1's sitemap/robots sitemap URL instead.

## Acceptance checks

- [ ] Canonical, `og:url`, Person URL, WebSite URL, WebPage URL, and sitemap all agree on the canonical origin.
- [ ] Canonical origin returns HTTP 200 in production; alternate host redirects permanently.
- [ ] Rendered page title/description accurately describe the visible portfolio.
- [ ] JSON-LD parses and contains no unverified credentials or education claims.
- [ ] Test with Rich Results Test / Schema Markup Validator as applicable and inspect the live URL in Search Console.
- [ ] Run the production build and inspect deployment logs. A preview deployment alone does not certify production.
- [ ] Confirm the contact details, profile links, image URLs, and favicon/manifest paths resolve.

## Limits

This is a single-page React app with one declared route (`/`). It does not create new landing pages or guarantee indexing, ranking, or appearance in AI-generated answers. Search Console evidence is required to report indexing status.
