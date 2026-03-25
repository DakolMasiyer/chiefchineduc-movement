# CCM 2027 — Chief Chukwuonye Movement Website

**Chief Engr Chinedu Chukwuonye — Senate Candidate, Okigwe Zone, 2027**

A deployment-ready campaign funnel website built for awareness, connection, activation, and dominance across Okigwe Zone.

---

## Project Structure

```
ccm-movement/
├── index.html          ← Homepage / Movement hub
├── about.html          ← Candidate biography
├── vision.html         ← Full 7-Point Agenda
├── community.html      ← Join form, volunteer, diaspora
├── news.html           ← News grid with article modal
├── poster.html         ← Personalised poster generator
├── assets/
│   ├── css/
│   │   └── style.css   ← Full design system
│   ├── js/
│   │   ├── main.js     ← Core: nav, AOS, lang toggle, share
│   │   ├── poster.js   ← Canvas poster generator
│   │   └── ui.js       ← News rendering, modal
│   └── img/
│       ├── portraits/  ← chief-portrait.jpg (add here)
│       ├── news/       ← News article images
│       ├── gallery/    ← Campaign gallery
│       └── logo/       ← Logo files
├── components/
│   ├── navbar.html     ← Global nav (loaded via fetch)
│   ├── footer.html     ← Global footer
│   └── breadcrumb.html ← Breadcrumb template
├── data/
│   ├── news.json       ← All news articles
│   └── config.json     ← Site-wide configuration
├── docs/
│   ├── setup.md        ← Deployment guide
│   ├── design-system.md
│   └── roadmap.md
├── netlify.toml        ← Netlify deployment config
└── README.md
```

---

## Deployment — Netlify

### Option A: Drag and Drop
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire `ccm-movement` folder into the deploy zone
3. Site is live instantly at a `.netlify.app` URL

### Option B: GitHub → Netlify (Recommended)
1. Create a GitHub repository named `ccm-movement`
2. Push all files:
   ```bash
   git init
   git add .
   git commit -m "Initial CCM 2027 site"
   git remote add origin https://github.com/YOUR_USERNAME/ccm-movement.git
   git push -u origin main
   ```
3. In Netlify: New site → Import from Git → Select repo
4. Build settings: Build command = blank, Publish directory = `.`
5. Deploy

### Custom Domain (When Ready)
- In Netlify: Site settings → Domain management → Add custom domain
- Point your domain's DNS to Netlify's nameservers

---

## Content Updates

### Adding News Articles
Edit `data/news.json`. Copy an existing entry and update:
- `id` — unique number
- `slug` — URL-friendly name (no spaces, use hyphens)
- `category` — Announcement / Community / Policy / Endorsement / Movement
- `date` — YYYY-MM-DD format
- `title`, `excerpt`, `body`
- `featured` — true for main feature, false for regular

### Updating Candidate Portrait
Replace `assets/img/portraits/chief-portrait.jpg` with the actual portrait photo.
- Recommended size: 800px wide minimum
- Format: JPG
- The hero on index.html will automatically use this image

### Adding News Images
Add images to `assets/img/news/` matching the filenames in `news.json`.

---

## Language Toggle (EN ↔ Igbo)

The site includes a built-in language toggle. Translations are stored in `assets/js/main.js` in the `translations` object.

To add more translations:
```javascript
'key-name': { en: 'English text', ig: 'Igbo text' }
```

To use a translation in HTML:
```html
<span data-t="key-name">Fallback text</span>
```

For HTML content (with tags like `<em>`):
```html
<h1 data-t="hero-name" data-html="true">Chief Chukwuonye</h1>
```

---

## Formspree Form
Form submissions go to: `https://formspree.io/f/mbdprqoz`
- View submissions at [formspree.io](https://formspree.io)
- Notifications go to the registered email on that account

---

## WhatsApp Integration
The floating WhatsApp button and share buttons use:
`https://wa.me/?text=I%20want%20to%20Join%20the%20Chief%20Chinedu%20Movement.`

To update the WhatsApp number, replace `wa.me/?text=` links with:
`https://wa.me/234XXXXXXXXXX?text=`

---

## Poster Generator
- Built with HTML5 Canvas — no backend required
- Generates 1080×1350px JPG (optimised for WhatsApp/Instagram)
- Users enter name, ward, LGA and download a personalised poster
- Share caption auto-generates alongside the poster

---

## Technical Notes
- No build tools, no dependencies, no package.json required
- Pure HTML/CSS/JS — works on Netlify, GitHub Pages, or any static host
- Components loaded via `fetch()` — requires HTTP server (works on Netlify, not `file://`)
- All fonts loaded from Google Fonts CDN

---

*CCM 2027 — Chief Chukwuonye Movement | From Neglect to Development — It's Okigwe's Time*
