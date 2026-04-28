# Events 412 — Website

Static website for Events 412, LLC (Pittsburgh DJ & event entertainment).
Pure HTML/CSS/JS — no build step, no dependencies.

## Project structure

```
events412-site/
├── index.html              ← Home
├── investments.html        ← Pricing
├── reviews.html
├── gallery.html
├── contact.html
├── 404.html
├── services/
│   ├── index.html          ← Services overview
│   ├── weddings.html
│   ├── lighting.html
│   ├── photo-booth.html
│   ├── photography.html
│   └── cinematography.html
├── css/styles.css
├── js/main.js
└── images/                 ← drop your photos here
```

## Editing

Open any `.html` file in a text editor. Each page contains its own header
and footer markup so they're easy to edit independently. If you change the
nav menu or footer info, update each page (or use Find & Replace across
the folder).

To preview locally, just double-click `index.html` — or run a quick local
server from this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Before going live — checklist

1. **Contact form**: Sign up at <https://web3forms.com> (free, no account
   needed — just enter your email). They'll email you an access key.
   Open `contact.html` and replace `YOUR_ACCESS_KEY_HERE` with that key.
   Form submissions will arrive at the email you signed up with.

2. **Social links**: Search the project for `facebook.com/`, `instagram.com/`,
   `youtube.com/` and replace with your real social URLs.

3. **Photos**: Drop real photos into `/images/` and update `gallery.html`
   (the existing placeholders have inline comments explaining how).

4. **Pricing**: Edit `investments.html` to match your actual packages.

## Deploying to Cloudflare Pages (via GitHub)

This is the recommended setup — push to GitHub, Cloudflare auto-deploys
on every commit, and you get free SSL + CDN.

### Step 1 — Push to GitHub

```bash
cd ~/Documents/events412-site
git init
git add .
git commit -m "Initial site"
git branch -M main

# Create a new empty repo on github.com first (e.g. "events412-site"),
# then connect it:
git remote add origin https://github.com/YOUR_USERNAME/events412-site.git
git push -u origin main
```

### Step 2 — Connect Cloudflare Pages

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare to read your GitHub repo and select `events412-site`.
3. Build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/`
4. Click **Save and Deploy**. First deploy takes ~30 seconds.

You'll get a free `your-project.pages.dev` URL immediately.

### Step 3 — Use your custom domain (events412.com)

In your Cloudflare Pages project:

1. **Custom domains** → **Set up a custom domain** → enter `events412.com`.
2. If your domain's DNS is already on Cloudflare, it'll auto-configure.
3. If your domain is registered elsewhere, Cloudflare will show you the
   CNAME / A records to add at your registrar.
4. Repeat for `www.events412.com` and add a redirect rule if you want
   one to forward to the other.

After this, every `git push` to `main` redeploys the live site automatically.

## Alternative: GitHub Pages

If you'd rather skip Cloudflare entirely:

1. In your repo on github.com → **Settings** → **Pages**.
2. Source: **Deploy from a branch** → `main` / `/ (root)` → **Save**.
3. Site will be at `https://YOUR_USERNAME.github.io/events412-site/`.

⚠️ Note: GitHub Pages serves from a sub-path (`/events412-site/`), which
breaks the root-relative links in this site (`/css/styles.css`, etc.).
If you go this route, either (a) use a custom domain, or (b) change all
links to be relative (e.g. `css/styles.css` instead of `/css/styles.css`).
**Cloudflare Pages avoids this problem** — recommended.
