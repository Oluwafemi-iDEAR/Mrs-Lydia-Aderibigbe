# Celebration of Life: Madam Lydia Adenike Aderibigbe

A simple, responsive memorial website for GitHub Pages. Includes a landing page, Order of Program, Biography, and automatically updated photo gallery.

## Upload to GitHub and publish

1. Create a **new public GitHub repository**, for example `lydia-memorial`.
2. Upload **everything inside this folder**, including `.github/workflows/deploy.yml`, to the repository's `main` branch. Preserve the folder structure. GitHub's browser uploader may hide dot-folders on some systems; use Git or VS Code to push the entire project instead if that happens.
3. In the repository open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and allow GitHub Actions if prompted. The workflow titled **Publish memorial website** will publish the site on a push to `main`. If it ran before Pages was configured, select the workflow and choose **Run workflow**.
5. Your website should be available at `https://YOUR-USERNAME.github.io/lydia-memorial/` (replace username and repository name with yours). Check the actual URL under Settings → Pages.

## Add photographs without changing code

1. Upload `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` or `.avif` image files into **`assets/gallery/`**. You may upload several at once. Use descriptive filenames like `Family gathering 01.jpg`.
2. Commit the new images to the **main** branch.
3. GitHub Actions automatically scans `assets/gallery/`, builds `assets/gallery.json`, and publishes the updated website. **You do not edit any HTML or JSON.**
4. Photos automatically appear as thumbnails, and clicking any photo opens the fullscreen slideshow. Use swipe on touchscreens, on-screen arrows, or left/right arrow keys. Press Escape to close.

The gallery is intentionally empty until you add photos. The banner, biography and order-of-program images are separate pages, not repeated in the gallery.

## Replace the three main images

Replace `assets/banner.jpeg`, `assets/biography.png`, and `assets/order-of-program.png` with updated images **using the same filenames** and commit. Every page will use them automatically. For differing extensions, update the matching HTML file.

## Test locally

From the project directory:

```bash
python3 scripts/build_gallery.py
python3 -m http.server 8000
```

Visit `http://localhost:8000/`. Avoid opening gallery.html as a local `file://` URL because browsers can block the gallery JSON request.

## Troubleshooting

- **Gallery empty?** Add images directly under `assets/gallery/`, not in a nested folder. Confirm the Actions workflow completed successfully, then refresh.
- **404 on Pages?** Check that Pages source is **GitHub Actions**, branch is `main`, and the latest workflow is green. Confirm your published link has your actual repo name.
- **GitHub Actions permission issue?** Under Settings → Actions → General, make sure Actions are permitted. This project uses only the minimum Pages deployment permissions.

No server, paid hosting, token, or external image storage is required. A public repo means the images are publicly accessible, which is suitable for images you have permission to publish.
