# AYDF Frontend - Arni Youth Development Foundation

React frontend for the AYDF NGO website built with Vite, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - API calls
- **EmailJS** - Contact form emails
- **Razorpay** - Payment integration
- **Cloudinary** - Image uploads

## 📦 Installation

```bash
npm install
```

## ⚙️ Environment Setup

Create `.env` file:

```env
VITE_API_URL=your_backend_api_url
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

## 🏃 Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── context/       # React context
│   ├── hooks/         # Custom hooks
│   └── App.jsx        # Main app
├── public/            # Static assets
└── index.html         # Entry HTML
```

## 🎨 Theme

- Primary: Saffron/Orange (#FF6B35)
- Secondary: Green (#2E7D32)
- Accent: Light Orange (#FFA726)

---

**AYDF** - Building a better tomorrow for rural communities 🌾
