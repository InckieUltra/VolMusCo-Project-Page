# VolMusCo Project Page (`github.io`)

Static academic project page for **VolMusCo: Learning Full-Body Motion Control with Volumetric Muscles** (`https://inckieultra.github.io/VolMusCo-Project-Page/`).

## Directory Layout

- `site/` — Clean, editable **unencrypted** source files (`index.html`, `assets/`, `paper/VolMusCo_arxiv.pdf`).
- `site_encrypted/` — Zero-leak **AES-256-GCM encrypted** build pushed to `https://github.com/InckieUltra/VolMusCo-Project-Page.git` while the page is in private preview.
- `../encrypt_site.py` — Encrypts HTML, CSS, JS, all figure PNGs, and the 27-page PDF into opaque `.bin` blobs using PBKDF2-HMAC-SHA256 (250,000 iterations) + AES-256-GCM.

## Changing the Access Passcode

```powershell
cd d:\GitRepos\VolMusCo_arxiv
python encrypt_site.py --password "YourNewPasscode"
cd site_encrypted
git add -A
git commit -m "Update encrypted preview"
git push origin main
git push origin main:gh-pages --force
```

## Switching to Public Release (Removing Password Gate)

When you are ready to make the project page public without a password:

```powershell
cd d:\GitRepos\VolMusCo_arxiv\site
git init
git branch -M main
git remote add origin git@github.com:InckieUltra/VolMusCo-Project-Page.git
git add -A
git commit -m "Public release of VolMusCo project page"
git push -u origin main --force
git push origin main:gh-pages --force
```
