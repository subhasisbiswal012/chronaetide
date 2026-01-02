# 🌙 Celestial Whispers - Birthday Website

## 📁 File Structure

Create this exact folder structure on your computer:

```
birthday-surprise/
├── index.html          (Main HTML file)
├── styles.css          (All styling)
├── script.js           (All JavaScript)
└── assets/
    ├── memory_01.mp4   (960x1280 video)
    ├── memory_02.mp4   (832x1504 video)
    ├── memory_03.mp4   (960x1280 video)
    ├── memory_04.mp4   (832x1504 video)
    ├── memory_05.mp4   (960x1280 video)
    ├── memory_06.mp4   (832x1504 video)
    ├── moon.png        (Transparent moon image)
    └── background-music.mp3 (Romantic ambient music)
```

---

## 🚀 Step-by-Step Setup

### Step 1: Create the Project Folder
1. Create a folder on your Desktop called `birthday-surprise`
2. Inside it, create a folder called `assets`

### Step 2: Copy the Files
1. **Create `index.html`**:
   - Copy the HTML code from the first artifact above
   - Save it as `index.html` in the `birthday-surprise` folder

2. **Create `styles.css`**:
   - Copy the CSS code from the second artifact
   - Save it as `styles.css` in the `birthday-surprise` folder

3. **Create `script.js`**:
   - Copy the JavaScript code from the third artifact
   - Save it as `script.js` in the `birthday-surprise` folder

### Step 3: Add Your Assets
Place all these files in the `assets` folder:
- Your 6 renamed videos (`memory_01.mp4` through `memory_06.mp4`)
- Your moon image (`moon.png`)
- Your background music (`background-music.mp3`)

---

## ⚙️ Configuration

Open `script.js` and edit these values at the top:

```javascript
const CONFIG = {
    username: "Kobi",           // Change to her username
    password: "Chora",          // Change to your password
    girlName: "Kobi",           // Her name
    boyName: "Chora",           // Your name
    loginFailMessage: "The stars do not align. Try again, my dear.",
    loginSuccessMessage: "Welcome to your constellation of dreams..."
};
```

---

## 🎬 Adding More Memory Videos

The HTML includes only Memory 1 and 2 as examples. To add memories 3-6:

**Copy this block for each memory** (replace numbers and text):

```html
<!-- Memory 3 - Left -->
<div class="memory-item left" data-memory="3">
    <div class="video-wrapper">
        <div class="video-container aspect-3-4" data-video="3">
            <video loop muted playsinline data-video-id="3">
                <source src="assets/memory_03.mp4" type="video/mp4">
            </video>
        </div>
        <div class="video-audio-control" data-video-id="3">
            <svg class="volume-on" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
            </svg>
            <svg class="volume-off" style="display: none;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>
    <div class="memory-caption">
        <h3>Memory III</h3>
        <p>Your custom text here...</p>
    </div>
</div>
```

**Important Changes for Each Memory:**
- Odd numbers (1,3,5): `class="memory-item left"` + `aspect-3-4`
- Even numbers (2,4,6): `class="memory-item right"` + `aspect-9-16`
- Update `data-memory`, `data-video`, `data-video-id` numbers
- Update video source (`memory_03.mp4`, `memory_04.mp4`, etc.)
- Update caption title and text

---

## 🧪 Testing Locally

1. Open `index.html` directly in Google Chrome
2. Test the login (username: Kobi, password: Chora)
3. Scroll through to test videos
4. Check on your phone by opening the file

---

## 🌐 Deploying to GitHub Pages

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Sign up for free account

### Step 2: Create Repository
1. Click "+" icon → "New repository"
2. Name: `birthday-surprise`
3. Select "Public"
4. ✅ Check "Add a README file"
5. Click "Create repository"

### Step 3: Upload Files
1. In your repository, click "Add file" → "Upload files"
2. Drag and drop:
   - `index.html`
   - `styles.css`
   - `script.js`
   - The entire `assets` folder
3. Click "Commit changes"

### Step 4: Enable GitHub Pages
1. Go to "Settings" (top menu)
2. Click "Pages" (left sidebar)
3. Under "Source": select "Deploy from a branch"
4. Under "Branch": select "main" and "/ (root)"
5. Click "Save"
6. Wait 2-3 minutes

### Step 5: Get Your Link
1. Refresh the Pages settings
2. You'll see: "Your site is live at `https://YOUR-USERNAME.github.io/birthday-surprise/`"
3. Copy this link and send it to her!

---

## ✨ Key Features

✅ **Separate Files** - Easy to edit and maintain
✅ **Clean Code** - Professional structure
✅ **Responsive** - Works on all devices
✅ **Golden Silk Thread** - Flowing S-curves throughout
✅ **Video Audio Controls** - YouTube-style mute/unmute
✅ **Background Music** - Continuous ambient music
✅ **Voice Feedback** - Browser speaks on login
✅ **Loading Screen** - Professional asset loading
✅ **Premium Fonts** - Alex Brush calligraphy
✅ **Glowing Moon** - Large with animated glow
✅ **Heart Made from Thread** - Silk thread forms the heart
✅ **Golden Rose** - At the end of the thread

---

## 🎨 Customization Quick Reference

### Change Text in HTML:
- Hero title: Line ~90 in `index.html`
- Finale text: Line ~260+ in `index.html`
- Memory captions: Each memory section in HTML

### Change Colors in CSS:
- Edit `:root` variables at top of `styles.css`

### Change Login in JS:
- Edit `CONFIG` object at top of `script.js`

---

## 🐛 Troubleshooting

**Videos not playing:**
- Check file names match exactly
- Ensure they're in `assets` folder
- Try scrolling slowly

**Thread looks wrong:**
- Clear browser cache
- Wait a moment after page loads
- Resize window to trigger recalculation

**Music not playing:**
- Click the golden button bottom-right
- Check file is named `background-music.mp3`
- Some browsers block autoplay

**Heart not showing:**
- Check console for errors (F12 in browser)
- Ensure all files are uploaded
- Try refreshing the page

---

## 📱 Mobile Testing

Test on actual devices:
- iPhone: Open link in Safari
- Android: Open link in Chrome
- Rotate device to test portrait/landscape
- Test touch controls
- Check video playback

---

## 💡 Pro Tips

1. **Compress videos** before uploading to speed up loading
2. **Use high-quality moon image** (PNG with transparency)
3. **Choose calm instrumental music** (3-5 minutes, loops automatically)
4. **Test thoroughly** before sending the link
5. **Send at midnight** on her birthday for maximum impact!

---

## 🎁 What She'll Experience

1. Loading screen with spinning golden ring
2. Login page with her name
3. Voice welcome message
4. Hero section with glowing moon and title in handwriting
5. Beautiful narrative in elegant italic
6. Videos connected by flowing golden silk thread
7. Videos bloom to color as she scrolls
8. Individual audio controls on each video
9. Heart made entirely from silk thread at the end
10. Golden rose blooming from the thread
11. Final message in romantic calligraphy

---

## ✅ Final Checklist

Before deploying:
- [ ] All 6 videos renamed correctly
- [ ] Moon image added
- [ ] Background music added
- [ ] Password changed in `script.js`
- [ ] All memory captions customized
- [ ] Tested locally in browser
- [ ] All files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Live link tested
- [ ] Tested on mobile device

---

**You're all set! This is now a professional, separated, maintainable codebase.** 🚀

No more single file mess - everything is clean, organized, and easy to modify!