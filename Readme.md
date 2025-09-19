
# 🌟 GlowRadar: Modular Product Discovery Engine

GlowRadar is a scalable, modular product discovery engine designed for affiliate monetization and content injection. It combines Python scraping, JSON-based data storage, dynamic frontend rendering, and Google Sheets-powered blog management—all optimized for speed, clarity, and commercial impact.


🧱 System Architecture


[Python Scraper] → [products.json] → [JavaScript Frontend] → [Client UI]
                             ↘
                      [Google Sheets Blog Injector]


 🔍 1. Scraping Logic (Python)

The backend scraper performs:

- Targeted scraping of product pages (e.g., Jumia, Kilimall, Masoko)
- Extraction of key fields:
  - `name`, `price`, `description`, `ingredient`, `image`, `buy_link`
- Secure affiliate link rewriting
- Output to `products.json` in this format:

  json
{
  "name": "Glow Serum",
  "price": "KES 1,200",
  "description": "Brightens skin and reduces blemishes",
  "ingredient": "Niacinamide",
  "image": "https://cdn.example.com/glow.jpg",
  "buy_link": "https://affiliate.example.com/product123"
}


- Scheduled via cron (e.g., every 12 hours)
- Modular scraping logic per site
- Audit-grade logging for debugging and traceability



 📦 2. JSON Storage

- `products.json` acts as a static backend
- Hosted publicly (e.g., GitHub Pages or CDN)
- Frontend fetches this file on page load or search trigger
- Unified schema across all sources for consistent rendering
- No database or server required



 🖼️ 3. Frontend Display (JavaScript)

The frontend includes:

 🔍 Search Engine
- Keyword-based filtering
- Matches `name`, `ingredient`, or `tags`

🧠 Card Structure

Image Card:
```html
<div class="card">
  <img src="..." />
  <h3>Name</h3>
  <p>Price</p>
  <p>Description</p>
  <p><strong>Ingredient:</strong> ...</p>
  <a href="buy_link">Buy Now</a>
</div>
```

Doc Card: Same as above, excluding the `<img>` tag.

- Responsive design for mobile and desktop
- Instant rendering from JSON without reload
- Modular JS functions for search, filter, and view switching

---

 📚 4. Blog Management System (Google Sheets)

- Blog posts stored in a Google Sheet with columns:
  - `Title`, `Summary`, `Tags`, `Image URL`, `Body`, `Slug`
- Sheet is shared publicly with Viewer access
- JavaScript fetches blog rows using Google Sheets API or Tabletop.js
- Injects blog cards into the “Latest Insights” section below the search engine

Example Blog Card:
```html
<div class="blog-card">
  <h3>How to Choose a Laptop</h3>
  <p>A guide for students in Kenya</p>
  <a href="/blog/choose-laptop">Read More</a>
</div>
```

- Real-time updates: editing the Sheet reflects instantly on the site
- No CMS or backend required—just Sheets + JS

---

🚀 Deployment

- Hosted via GitHub Pages: [GlowRadar](https://simon-cloud-tech.github.io/glowradar/)
- No backend server required
- JSON and Sheets act as modular, updatable data sources
- Can be scaled to custom domains or CDN hosting

---

🔐 Security Notes

- Affiliate logic is server-side in Python
- Frontend only consumes sanitized JSON
- Google Sheets is read-only to the public
- Admin access protected via Google account permissions

---

🧠 Founder Insight

GlowRadar is more than a product search tool—it's a modular monetization engine. Designed to scale across categories, languages, and affiliate networks while staying lean and secure.

This system is built to empower creators, inform consumers, and generate revenue—all while remaining lightweight, auditable, and adaptable to future modules like category expansion, user personalization, or localized commerce.

---

🛠️ Future Modules (Optional)

- 🔄 Real-time JSON sync via webhook or serverless function
- 🧪 A/B testing for card layouts and CTA performance
- 📊 Analytics dashboard for click-through and conversion tracking
- 🛍️ Category-based filtering and multi-language support
- 🔐 Admin panel for blog and product moderation

---
🤝 Contribution

Want to contribute or extend GlowRadar? Fork the repo, build your module, and submit a pull request. All code should follow modular, scalable, and secure design principles.

---

 📄 License

This project is licensed under the MIT License. See `LICENSE.md` for details.
