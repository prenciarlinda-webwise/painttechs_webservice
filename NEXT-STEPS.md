# Next steps

Tracks work remaining after the May 2026 blog + internal-linking session. Check items off as you go.

## Done this session
- Added 6 new blog posts (ids 16–21) in `src/data/blog-posts.ts`: house painting cost, best exterior paint for humid climates, interior painting cost, best time of year to paint, garage door paint colors, how to choose a painting contractor.
- Wired FAQPage JSON-LD + a `<details>` FAQ accordion into the blog template (`src/app/blog/[slug]/page.tsx`) via a new optional `faqs` field.
- Built `src/components/sections/RelatedArticles.tsx` and added a "Related articles" block to: all 6 service pages, all 10 location pages, both combo pages, and the home page.
- Cross-linked the blog cluster so every new post has 2+ inbound contextual links.
- `tsc` clean, `next build` passing (58 pages).

## TODO — ship it
- [ ] Review the diff locally: `npm run dev`, then open `/blog/house-painting-cost` and any service/location page to confirm the accordion + related-articles block look right.
- [ ] Commit the changes (branch is `main`):
      `git add -A && git commit` — changed: blog-posts.ts, blog/[slug]/page.tsx, page.tsx, ServicePageContent.tsx, [location]/page.tsx, residential-exterior-painting-jacksonville/page.tsx, cabinet-refinishing-nocatee/page.tsx, + new RelatedArticles.tsx
- [ ] Push to GitHub: `git push origin main` (remote: github.com/prenciarlinda-webwise/painttechs_webservice).
- [ ] Deploy to the Hostinger VPS. Typical Next.js flow (adjust to your actual setup):
      1. SSH into the VPS.
      2. In the project dir: `git pull origin main`
      3. `npm ci` (only if dependencies changed — they did not this session)
      4. `npm run build`
      5. Restart the app process (e.g. `pm2 restart <app>` or `systemctl restart <service>`), then reload nginx if needed.
- [ ] Confirm the site is up and the new pages render in production.

## TODO — post-deploy SEO verification
- [ ] Confirm the 6 new URLs return 200 in production (e.g. `https://www.paint-techs.com/blog/house-painting-cost`).
- [ ] Re-ping the sitemap and submit the new blog URLs in Google Search Console (Request Indexing).
- [ ] Validate FAQPage markup on a new post with Google's Rich Results Test.
- [ ] In ~2–4 weeks, check GSC impressions for the new posts and the inbound-link target pages.

## TODO — remaining SEO backlog (from the SEMrush gap analysis)
- [x] Resolve home vs `/jacksonville-house-painters` cannibalization — done 2026-07-06. Home keeps the broad "Jacksonville painters/painting contractors" cluster (already winning it); the location page retargeted to a Duval County neighborhood angle (new title, meta description, H1 "Painters in Every Jacksonville Neighborhood"). Also fixed a sitewide bug where `src/lib/metadata.ts`'s title template was double-appending "Paint-Techs LLC" on every non-home page.
- [x] Added `public/llms.txt` — site had zero AI-crawler-facing summary; SEMrush AI Search data showed near-zero ChatGPT/AI Overview/Gemini visibility.
- [x] Geo-optimized `/commercial-painting` for "commercial painting contractors jacksonville" — done 2026-07-07. Title now includes "Contractors", added OSHA spray-finishing citation (first outbound link on the page).
- [x] Geo-optimized `/services` for "painting services jacksonville" / "painting company jacksonville" — done 2026-07-07. Page was completely absent from the SEMrush export; added FAQ schema, AEO block, EPA RRP citation.
- [x] Strengthened `/residential-exterior-painting-jacksonville` — done 2026-07-07. Title trimmed to 60 chars, added FAQ schema + visible $4,000-15,000 pricing (was missing pricing transparency entirely).
- [x] Optimized `/pool-deck-painting-staining` for "deck painting near me" — done 2026-07-07. Title now includes "Near Me" (was missing it entirely), added CDC Model Aquatic Health Code citation.
- [x] Checked the `/atlantic-beach-house-painters` vs `/jacksonville-beach-house-painters` overlap on "painting services atlantic beach" — done 2026-07-07. Not real cannibalization (atlantic-beach already wins 24 vs 69); tightened metaDescription as reinforcement only.
- [ ] (Optional) `/painting-services-southside` neighborhood page — only if Southside is a service focus.

## TODO — competitor content-gap blog posts (from anewleafpainting.com SEMrush export, Jul 2026)
Filter applied: only topics where the search intent plausibly ends in "hire a painting contractor," not just DIY/product-shopping intent (killed a planned "Benjamin Moore vs Sherwin Williams" post on this basis — high volume, wrong intent, grows the paint brands' traffic not Paint-Techs' leads).
- [x] `/blog/how-to-paint-hardie-board-siding` — done 2026-07-07. Angle: repainting James Hardie ColorPlus finish wrong voids the 15-year manufacturer warranty.
- [x] `/blog/how-to-paint-exterior-brick` — done 2026-07-07. Angle: non-breathable paint traps moisture in brick, near-irreversible decision (Brick Industry Association citation).
- [x] `/blog/removing-textured-walls` — done 2026-07-07. Angle: skim coat mistakes only show up after painting; asbestos testing for pre-1977 homes. Published without a featured image — see image library note below.
- [ ] **Image library is exhausted** for new blog content. Every unused, on-topic Paint-Techs image in `public/images` has now been used. Note: that folder also contains ~80 unrelated images from a different client (roofing/siding company assets, filenames like `gimos-roofing-*`, `roof-replacement-*`) that are not referenced anywhere in this codebase — worth asking the client to clean up, and don't mistake them for available Paint-Techs imagery. Need new photos before generating more image-bearing posts.
