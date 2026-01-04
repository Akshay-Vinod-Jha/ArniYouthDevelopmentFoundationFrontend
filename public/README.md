# Public Assets Directory

This folder contains all static assets that are served directly by Vite in both development and production (Vercel).

## Contents

- **favicon.png** - Website favicon/logo
- **default-avatar.png** - Placeholder avatar for board members without images
- **default-avatar.svg** - SVG version of default avatar (optional)
- **aydf_gallery/** - Gallery images for the AYDF website (60+ images)
- **logo_type_photo/** - Logo and type photos

## Usage

All files in this directory are served from the root URL path.

### Referencing Assets

**In HTML/JSX:**

```jsx
<img src="/favicon.png" alt="Logo" />
<img src="/aydf_gallery/image.jpg" alt="Gallery" />
<img src="/logo_type_photo/logo.jpg" alt="Logo" />
```

**In CSS:**

```css
background-image: url("/aydf_gallery/image.jpg");
```

### Important Notes

1. **Do NOT import these files** - Reference them directly using absolute paths starting with `/`
2. **Absolute paths only** - Always use `/filename.ext` not `./filename.ext` or `../filename.ext`
3. **Works everywhere** - Same paths work on localhost (`npm run dev`) and production (Vercel)
4. **Vite best practice** - Files in `public/` are copied as-is to the build output

## Deployment

When deploying to Vercel:

- All files in `public/` are automatically copied to the root of the deployment
- URLs like `/favicon.png` work exactly the same as in development
- No special configuration needed
