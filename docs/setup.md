# CCM 2027 — Setup & Deployment Guide

## Before You Deploy — Checklist

- [ ] Add `chief-portrait.jpg` to `assets/img/portraits/`
- [ ] Confirm Formspree endpoint is active at `mbdprqoz`
- [ ] Update WhatsApp number in all `wa.me` links if you have a dedicated campaign number
- [ ] Update social media URLs in `components/footer.html` and `data/config.json`
- [ ] Review and approve all news articles in `data/news.json`

---

## Step 1 — Add Portrait Photo

1. Name your photo file: `chief-portrait.jpg`
2. Place it in: `assets/img/portraits/chief-portrait.jpg`
3. Recommended dimensions: at least 800px wide, portrait orientation
4. The hero on the homepage will display it automatically with a fade mask

---

## Step 2 — Deploy to Netlify

### Quickest Method (Drag & Drop)
1. Zip the entire `ccm-movement` folder
2. Go to https://app.netlify.com
3. Click "Add new site" → "Deploy manually"
4. Drag the zip file into the upload area
5. Your site is live at `random-name.netlify.app`
6. Rename in Site Settings → General → Site name → `ccm2027` or similar

### Via GitHub (Recommended for ongoing updates)
```bash
# In the ccm-movement folder:
git init
git add .
git commit -m "CCM 2027 initial deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_ORG/ccm-movement.git
git push -u origin main
```

Then in Netlify:
- New site → Import from Git → Connect GitHub → Select `ccm-movement`
- Build command: leave blank
- Publish directory: `.`
- Click Deploy

Future updates: just `git push` and Netlify auto-deploys.

---

## Step 3 — Test Everything

Open your deployed URL and check:

- [ ] Homepage loads correctly with all sections
- [ ] Navigation works on mobile (hamburger menu)
- [ ] Language toggle switches EN ↔ Igbo
- [ ] Join form submits successfully (check Formspree dashboard)
- [ ] WhatsApp button opens WhatsApp with correct message
- [ ] Poster generator creates and downloads a poster
- [ ] News articles load and open in modal
- [ ] All share buttons work (WhatsApp, Twitter, Facebook, Copy)
- [ ] All pages load: about, vision, community, news, poster

---

## Step 4 — Custom Domain (When Ready)

1. Purchase domain (e.g. `okigwe2027.com` or `ccm2027.ng`)
2. In Netlify: Site settings → Domain management → Add custom domain
3. Follow Netlify's DNS configuration instructions
4. SSL certificate is issued automatically (free)

---

## Ongoing Content Management

### Adding a News Article
Edit `data/news.json`, add a new object at the top of the array:
```json
{
  "id": "007",
  "slug": "article-url-slug",
  "category": "Community",
  "date": "2025-04-01",
  "title": "Your Article Title",
  "excerpt": "One or two sentence summary shown in the card.",
  "body": "Full article text here.\n\nSeparate paragraphs with blank lines.\n\nUse - or • for bullet lists.",
  "image": "assets/img/news/your-image.jpg",
  "featured": false,
  "tags": ["Tag1", "Tag2"]
}
```

### Updating Statistics
Edit `index.html`, find the `stats-grid` section and update `data-target` values.

### Adding Translations
In `assets/js/main.js`, find the `translations` object and add:
```javascript
'your-key': { en: 'English text', ig: 'Igbo translation' }
```

---

## Support

For technical issues with the site, contact the digital production team.
For campaign content, contact the CCM Campaign Office.
