# Static Assets Configuration for Vite + Vercel

This document explains how static assets are configured in this project to work seamlessly on both localhost and Vercel production.

## ✅ Current Setup

### Directory Structure

```
frontend/
├── public/                    # Static assets directory (Vite standard)
│   ├── favicon.png           # Website favicon
│   ├── aydf_gallery/         # Gallery images (60 images)
│   ├── logo_type_photo/      # Logo and type photos
│   └── README.md             # Documentation
├── index.html
└── src/
```

### How It Works

1. **Vite serves `public/` from root**: All files in `public/` are served from `/` in both dev and production
2. **Absolute paths work everywhere**: `/favicon.png` resolves correctly on localhost:5173 and on Vercel
3. **No imports needed**: Static assets are referenced directly via URL paths
4. **Build process**: Vite copies `public/` contents to `dist/` root during build

## 📝 Usage Examples

### In HTML (index.html)

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

### In JSX Components

```jsx
// Header.jsx - Logo
<img src="/favicon.png" alt="AYDF Logo" />

// Gallery.jsx - Gallery images
<img src="/aydf_gallery/SAVE_20260101_200110.jpg" alt="Gallery" />
<img src={`/aydf_gallery/${filename}`} alt="Dynamic image" />

// BoardManagement.jsx - Default avatar
<img src={row.image?.url || "/default-avatar.png"} alt="Avatar" />

// Other components
<img src="/logo_type_photo/logo.jpg" alt="Logo" />
```

### In CSS

```css
.background {
  background-image: url("/aydf_gallery/image.jpg");
}
```

## 🚫 What NOT to Do

❌ **Don't use relative paths:**

```jsx
<img src="./favicon.png" />        // ❌ Won't work
<img src="../public/favicon.png" /> // ❌ Won't work
```

❌ **Don't import static assets:**

```jsx
import logo from "/favicon.png"; // ❌ Not needed for public assets
import gallery from "./gallery.jpg"; // ❌ Wrong approach
```

❌ **Don't put assets in src/assets:**

```
src/assets/images/gallery.jpg       // ❌ Wrong location for static files
```

## ✅ What TO Do

✅ **Always use absolute paths starting with /**

```jsx
<img src="/favicon.png" />          // ✅ Correct
<img src="/aydf_gallery/img.jpg" /> // ✅ Correct
```

✅ **Place all static assets in public/**

```
public/favicon.png                  // ✅ Correct
public/aydf_gallery/img.jpg         // ✅ Correct
```

## 🚀 Deployment Checklist

### Local Development (npm run dev)

- ✅ All assets accessible at `http://localhost:5173/favicon.png`
- ✅ Gallery images load from `http://localhost:5173/aydf_gallery/`
- ✅ No 404 errors for static files

### Production (Vercel)

- ✅ All assets accessible at `https://yourdomain.com/favicon.png`
- ✅ Gallery images load from `https://yourdomain.com/aydf_gallery/`
- ✅ No build configuration needed
- ✅ Vite automatically copies `public/` to deployment root

## 🔍 Verification

To verify everything works correctly:

### Development

```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

- Check browser console for 404 errors
- Verify favicon appears in browser tab
- Navigate to Gallery page and verify images load

### Production (After Vercel Deploy)

```bash
npm run build
npm run preview
```

Visit: `http://localhost:4173`

- Check browser console for 404 errors
- Verify all static assets load correctly
- Test all pages with images

## 📚 References

- [Vite Static Asset Handling](https://vitejs.dev/guide/assets.html#the-public-directory)
- [Vercel Deployment](https://vercel.com/docs/frameworks/vite)

## 🎯 Benefits of This Setup

1. **Consistency**: Same paths work in dev and production
2. **Performance**: Assets served directly without bundling
3. **Simplicity**: No import statements needed
4. **Standard**: Follows Vite best practices
5. **Vercel-Ready**: Zero configuration needed for deployment
6. **Cache-friendly**: Static assets can be cached efficiently
