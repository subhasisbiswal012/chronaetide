# 🌙 Celestial Whispers - Birthday Website

Welcome — **Celestial Whispers** is a tiny, forkable web experience for creating a personalised birthday / love page you can send to someone special. It displays a hero, narrative, a memory gallery (videos), a tarot-inspired reveal with personalised photos, background music and a final message. This repo name is **`chronaetide`**.

---

## Repo contents (what to expect)
- `index.html` — main page (hero, narrative, memory gallery, tarot cards, finale). Edit visible strings and structure here.
- `script.js` — configuration and interactive logic. Edit the `CONFIG` block at the top to personalise username/password and names.
- `styles.css` — styling and responsive rules.
- `assets/` — place your videos, images and audio here (see **Required asset names**).

---

## Quick Personalization checklist (copy-edit ready)
1. **Edit `script.js` CONFIG**  
   Open `script.js` and update the `CONFIG` object:
   - `username`: the login name shown/accepted (often your loved one’s name).
   - `password`: secret for the surprise gate (client-side only).
   - `girlName` / `boyName`: used in UI strings.
   - Optional messages (`loginFailMessage`, `loginSuccessMessage`, etc.).

2. **Replace visible demo name(s) in `index.html`**  
   Search for the demo name (e.g., `Kairavi`) and replace with your loved one’s name so hero, headings and the finale read correctly.

3. **Add your own media to `assets/`**  
   Put your images, music and videos into the `assets/` folder using the exact filenames below (or update the HTML if you prefer different names).

4. **Tarot photos**  
   Replace tarot card images with your photos but **keep the exact filenames** (including `GF` suffix) so the JavaScript finds them. Even if the photo is of a boyfriend, keep `GF` in the filename.

5. **Push changes**  
   Commit and push your fork. Then host using GitHub Pages or Azure (instructions below).

---

## Required asset names (use these exact filenames unless you change the code)
Place the following files inside the `assets/` folder:

- `background-music.mp3` — background track used by the site  
- `chime.mp3` — short chime sound used for tarot flips / UI cues  
- `moon.png` — decorative hero image (optional)  
- `memory_01.mp4`, `memory_02.mp4`, `memory_03.mp4`, `memory_04.mp4`, `memory_05.mp4`, `memory_06.mp4` — six memory videos (keep names exact if you don't want to edit HTML)  
- Tarot images (replace contents but keep names):  
  - `lovers_GF.png`  
  - `two_of_cups_GF.png`  
  - `impress_GF.png`

> If you want more/fewer memories or different file names, update the markup in `index.html` (and any references in `script.js`) to match your assets.

---

## Hosting — two simple ways

### A) Host on **GitHub Pages** (recommended, free and simple)
1. Fork the `chronaetide` repository to your GitHub account.  
2. Edit the repo (personalise `script.js`, `index.html`, add `assets/`), commit and push to your fork’s `main` branch.  
3. On GitHub: go to **Settings → Pages** (or **Settings → Code and automation → Pages**).  
4. Under *Build and deployment* select **Branch: main** and **Folder: / (root)**, then click **Save**.  
5. After a minute or two GitHub will provide a site URL (something like `https://<your-username>.github.io/chronaetide/`). Copy that URL and share it.

**Notes:**  
- Make the repo public if you want anyone with the link to open it (private repos can also use Pages with paid plans; making it public is simplest).  
- If assets are large, consider hosting large videos externally (see performance tips below).

### B) Host on **Azure Static Website using a Storage Account ($web container)**
(This uses Azure Blob Storage's static website feature. It hosts static files from the special `$web` container.)

**Portal steps (no CLI):**
1. Create an Azure account (if you don’t have one).  
2. In the Azure Portal, create a new **Storage account**. Choose region and SKU as desired.  
3. Once the storage account is created, open it and find **Static website** (under the Data storage section).  
4. Enable **Static website hosting**, set **Index document name** to `index.html`, and save. Enabling this will create a special `$web` container automatically.  
5. Open **Containers** → click the `$web` container → upload your site files and folders (upload `index.html`, `script.js`, `styles.css`, and the whole `assets/` folder). Be sure the directory structure inside `$web` matches how files are referenced in `index.html` (so `assets/` sits at the same level as `index.html`).  
6. After upload, the **Primary endpoint** URL shown in the Static website blade is your site link. Copy and share it.

**CLI alternative (az CLI) — upload a folder to `$web`:**
```bash
# login and set subscription if needed
az login
az account set --subscription "<your-subscription-id>"

# upload local folder (escaping $web)
az storage blob upload-batch \
  --account-name <your-storage-account-name> \
  -s ./path-to-your-site-folder \
  -d '$web'
```
After upload confirm the Static website index is `index.html` and use the primary endpoint URL.

**Notes / caveats (Azure):**

* Ensure `index.html` is at the root of `$web` (not nested).
* Check content-types (Azure typically sets them automatically, but confirm video/audio files are served correctly).
* If you plan to allow editing by others after hosting, either give them access to the storage account or prefer GitHub for collaborative workflows.

---

## Mobile & performance tips (important)

* The page loads multiple high-quality videos and audio which can be heavy for phones and tablets. If you see slow loads or crashes:

  * **Compress videos** to 720p or 480p, reduce bitrate, or convert to `webm`.
  * **Host large videos externally** (YouTube unlisted / Vimeo / S3) and use external URLs in `<video>` sources.
  * **Lazy-load** videos via `data-src` + IntersectionObserver so only nearby videos download.
  * Set `<video preload="metadata">` and provide `poster` images so full files aren’t loaded until play.
  * Serve lower-quality fallbacks for small screens (conditional logic in `script.js` using `window.innerWidth`).
* For best UX on mobile, require the visitor to interact (tap) before music plays; many browsers block autoplay otherwise.

---

## Security & privacy

* The "login" is **client-side JavaScript only** (UX gate). It is **not secure** — do not store secrets or sensitive information in it.
* If your GitHub repo is public, any media you upload there is publicly accessible. Use a private repo (or external private storage) for private media.

---

## How to change behavior (developer notes)

* **Number / order of memories**: edit the memory `<div>` blocks in `index.html` (class names and `video` elements).
* **Tarot / reveal logic**: open `script.js` — the tarot flip, messages and timers are implemented there. Tweak durations and messages in that file.
* **Styling / layout**: modify `styles.css` — breakpoints and hero styles live there.

---

## Troubleshooting checklist

* If page doesn’t load or shows missing media: confirm `assets/` files exist and filenames exactly match those referenced in `index.html`.
* If videos fail to play: confirm correct `Content-Type` on the host (especially on Azure) and check browser console for errors.
* If audio won’t autoplay: ensure user interaction occurs before music starts (login button click is the usual trigger).

---

## License & credits

* Use freely. Add an `LICENSE` file (MIT recommended) if you want to explicitly permit reuse.
* Replace any demo assets (AI videos/images/music) with your own memories for a true personalised page.

---

## Final notes

* Keep the `GF` suffix in tarot filenames even if the photo is of a boyfriend — the JavaScript expects that naming convention.
* Repo name reminder: **chronaetide**.
* Main title shown on the site / repo: **🌙 Celestial Whispers - Birthday Website**.




