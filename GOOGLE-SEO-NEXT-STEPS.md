# Google Search: next steps

Site: **https://designruse.github.io/Portfolio-V2/**
GitHub repository: **designruse/Portfolio-V2** (GitHub Pages project site)

Work through the sections in order: publish first, then set up Search Console.

---

## 1. Publish to GitHub Pages

The zip `portfolio-redesign.zip` has its files at the **top level**, with no extra folder. After you unzip it, you should see `index.html`, `404.html`, `.nojekyll`, `robots.txt`, `llms.txt`, `sitemap.xml`, `site.webmanifest`, this file, and the folders `css/`, `fonts/`, `images/`, `js/` and `tools/`.
**Upload exactly these items, the contents of the zip, into the root of the Portfolio-V2 repository.**

> `.nojekyll` is an empty file. It is hidden on macOS and Linux (press Cmd+Shift+. in Finder to show it). It tells GitHub Pages to serve the files as they are, without Jekyll. Please include it.

### a) Back up the current site first
Choose one:
- On https://github.com/designruse/Portfolio-V2, click **Code > Download ZIP** and keep the file somewhere safe, **or**
- Create a backup branch: open the branch dropdown (it says `main`), type `backup-old-site`, then click **Create branch: backup-old-site from main**. You can also create a tag or release instead.

### b) Upload the new files

**Option 1: GitHub website (no tools needed)**
1. Open https://github.com/designruse/Portfolio-V2 (you must have write access).
2. Click **Add file > Upload files**.
3. Unzip `portfolio-redesign.zip` on your computer. Select **everything inside it**, including all the folders and `.nojekyll`, and drag it into the upload area. Folders keep their structure when you drag them in Chrome, Edge or Firefox.
4. The new `index.html`, `css/`, `js/` and other files replace the old files with the same names.
5. Add a commit message such as "Redesign: new site + tool pages", choose **Commit directly to the main branch**, and click **Commit changes**.
6. Old folders such as `vendors/` and `resources/` stay in the repo because uploading does not delete anything. The new site does not use them. Before you delete them, use the repo search (press `/`, then search for `vendors/` and `resources/`) to confirm that no remaining file references them. Then delete them: open a file in the folder, click **... > Delete file**, and repeat (or use the git CLI). Leaving them in place does no harm.

**Option 2: git command line**
```bash
git clone https://github.com/designruse/Portfolio-V2.git
cd Portfolio-V2
git checkout -b backup-old-site && git push origin backup-old-site && git checkout main   # backup
# delete the old site files (keeps the .git folder), then copy the new ones in:
git rm -r -q . 
unzip /path/to/portfolio-redesign.zip -d .
git add -A
git commit -m "Redesign: new site + tool pages"
git push origin main
```
(If the repo has a `CNAME` or `README.md` you want to keep, restore it with `git checkout HEAD -- CNAME README.md` before you commit.)

### c) Check the Pages settings
Repo **Settings > Pages > Build and deployment**:
- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)** > Save (if it was not already set)

### d) Wait for the deploy, then check the live site
1. Open the **Actions** tab and wait until the "pages build and deployment" run shows a green check. This usually takes 1–3 minutes.
2. Open https://designruse.github.io/Portfolio-V2/ and one tool page, such as https://designruse.github.io/Portfolio-V2/tools/pixelflow-pro/
3. Hard refresh to skip the cache: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac).
4. Check that:
   - the light/dark toggle works;
   - the tool filter chips work;
   - the tool cards open their pages;
   - the contact form shows its validation messages. Send one real test message only if you want to: the form emails the site owner through FormSubmit, and the first message may ask the owner to confirm activation;
   - a made-up URL such as `/Portfolio-V2/xyz` shows the custom 404 page.

### e) robots.txt and llms.txt at the domain root
Crawlers only read `robots.txt` (and AI tools only look for `llms.txt`) at the **domain root**: `https://designruse.github.io/robots.txt`. Files inside `/Portfolio-V2/` are ignored for that purpose. This is harmless, but to make them count:
1. Check whether a repository named **`designruse.github.io`** exists under the designruse account.
2. If it exists, copy `robots.txt` and `llms.txt` into its root and commit.
3. If it doesn't exist, you can create it as a public repo named exactly `designruse.github.io` and add the two files.
   **Caveat:** creating this repo changes what **https://designruse.github.io/** (the bare domain) shows. Today it is probably a 404, and afterwards it serves whatever is in that repo. Also add an `index.html` that redirects to the portfolio, for example:
   ```html
   <!doctype html><html lang="en"><head><meta charset="utf-8">
   <title>Sanjeevv Kkumar Dass</title>
   <link rel="canonical" href="https://designruse.github.io/Portfolio-V2/">
   <meta http-equiv="refresh" content="0; url=https://designruse.github.io/Portfolio-V2/">
   </head><body><a href="https://designruse.github.io/Portfolio-V2/">Go to the portfolio</a></body></html>
   ```
   The Portfolio-V2 site keeps working at `/Portfolio-V2/` either way.
4. This step is optional. Google can find everything through the sitemap you submit in Search Console.

### f) Then continue with Section 2 (Search Console)

---

## 2. Google Search Console setup (beginner, step by step)

1. Go to **https://search.google.com/search-console** and sign in with the Google account that should own the site data.
2. Click **Add property** and choose **URL prefix** (the right-hand box). A *Domain* property is not possible on `github.io` because you can't edit its DNS. Enter exactly:
   **`https://designruse.github.io/Portfolio-V2/`** (with https and the trailing slash).
3. Under the verification methods, choose **HTML tag**. Google shows something like
   `<meta name="google-site-verification" content="AbC123xyz..." />`
   Copy **only the value inside `content="..."`**.
4. Open `index.html` (the home page, in the repo root). Near the top of the `<head>`, right after the `<meta name="robots" ...>` line, find the clearly marked block **GOOGLE SEARCH CONSOLE VERIFICATION**:
   ```html
   <!-- <meta name="google-site-verification" content="PASTE-CODE" /> -->
   ```
   Replace `PASTE-CODE` with your value, then **remove `<!-- ` and ` -->`** from that line so it becomes:
   ```html
   <meta name="google-site-verification" content="AbC123xyz..." />
   ```
   (You can edit it on GitHub: open index.html, click the pencil icon, edit, then **Commit changes**.)
5. Commit and push, wait for the Pages deploy to turn green (Section 1d), then go back to Search Console and click **Verify**.
6. **Alternative, the HTML file method:** choose "HTML file" instead, download the `googleXXXXXXXX.html` file Google gives you, and upload it unchanged to the **root of the Portfolio-V2 repo** (next to index.html) using Add file > Upload files. After the deploy, click Verify.
7. In the left menu, open **Sitemaps**. Under "Add a new sitemap" type **`sitemap.xml`** (the box already contains the property URL) and click **Submit**. The status should become "Success", listing 12 pages.
8. Use **URL Inspection** (search bar at the top): paste each URL, then click **Request indexing**. Do the home page first, then the tool pages:
   - https://designruse.github.io/Portfolio-V2/
   - https://designruse.github.io/Portfolio-V2/tools/pixelflow-pro/
   - https://designruse.github.io/Portfolio-V2/tools/coinkeeper/
   - https://designruse.github.io/Portfolio-V2/tools/securepass/
   - https://designruse.github.io/Portfolio-V2/tools/senderpro/
   - https://designruse.github.io/Portfolio-V2/tools/wa-bulk-messenger/
   - https://designruse.github.io/Portfolio-V2/tools/cash-tally-pro/
   - https://designruse.github.io/Portfolio-V2/tools/pdfy-studio/
   - https://designruse.github.io/Portfolio-V2/tools/pdfmagic/
   - https://designruse.github.io/Portfolio-V2/tools/profitpulse/
   - https://designruse.github.io/Portfolio-V2/tools/profitpilot-fba/
   - https://designruse.github.io/Portfolio-V2/tools/profitcraft/
   Google limits requests per day, so if you hit the quota, continue the next day. The sitemap covers anything you skip.
9. After a few days, check **Indexing > Pages** (Page indexing report) to see which pages are indexed and why any are not. Later, check **Experience > Core Web Vitals**, which needs enough real visitor data before it shows anything.
10. **Keep the verification meta tag (or the HTML file) on the site permanently.** If you remove it, the site becomes unverified.

### Optional: Bing Webmaster Tools
Bing powers Bing search, DuckDuckGo results, and ChatGPT's web search. Go to **https://www.bing.com/webmasters**, sign in, and choose **Import from Google Search Console**. It copies your verified site and sitemap in a few clicks, with no extra tag needed.

---

## 3. More checks and promotion

- **Rich Results Test:** test the home page and one tool page at https://search.google.com/test/rich-results. You can also use https://validator.schema.org/ to see all the structured data (Person, WebSite, ProfilePage, FAQPage, ItemList, BreadcrumbList, SoftwareApplication/Product). Breadcrumbs are the rich result most likely to show for this site.
- **Link the site from your profiles, using the https URL** `https://designruse.github.io/Portfolio-V2/`:
  - **Pinterest:** the profile's website currently shows `http://designruse.github.io/Portfolio-V2`. Edit the profile and change it to the **https** URL. (Re-claiming may be needed. The `p:domain_verify` tag is kept in the home page.)
  - **Facebook page:** add the https URL in the page's About > Contact info / Website.
  - **Payhip:** add the portfolio URL to the store's profile/about and, where it fits, to the product descriptions. You can also link each product to its own tool page, e.g. `.../tools/pixelflow-pro/`.
- **Social previews:** after deploy, re-scrape with the Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/) and check the Pinterest pins/Rich Pins, so they show the new images and titles.
- **What to expect from rich results (honest limits):**
  - **FAQ rich results:** since 2023 Google shows them only for well-known, authoritative government and health websites. The FAQ markup stays valid and still helps search engines and AI answers understand the page, but don't expect FAQ dropdowns in Google results.
  - **Product / software rich results** (stars, price) need price (`offers`) and/or review/rating data. The tool pages intentionally contain **no prices and no invented reviews**, so they won't get those rich snippets. Each tool card and page has a `PRICE SLOT` comment. If you later add real prices, add an `offers` block (price, priceCurrency, availability, url) to that page's JSON-LD at the same time and keep the two consistent.
- **Updating later:** when you add or change a tool, update `sitemap.xml` (the `<lastmod>` date) and resubmit it, or simply request indexing for the changed URL.
- **Placeholders:** LinkedIn, X, Threads and YouTube profile links are commented out in the HTML and marked `ADD YOUR PROFILE URL`. Fill them in and uncomment them when you have those profiles.
