# Dahab Divers - Premium Diving Website

## Short Description
Modern, multilingual diving website with stunning UI, dynamic filtering, and responsive design for dive centers and tour operators.

## Description

**Dahab Divers** is a fully-featured, production-ready diving website built with Next.js 15, TypeScript, and TailwindCSS. This premium template offers a complete solution for diving centers, tour operators, and marine tourism businesses looking to establish a professional online presence.

The website features a stunning, modern design with smooth animations, interactive elements, and a premium user experience. It includes comprehensive pages for diving packages, dive sites, courses, team information, and contact/booking functionality.

**Key Highlights:**
- **Multi-language Support**: Built-in internationalization (i18n) with English, French, German, and Dutch translations
- **Advanced Filtering System**: Dynamic filtering and sorting for dive packages and sites with real-time search
- **Premium UI/UX**: Modern design with glassmorphism effects, smooth animations, and responsive layouts
- **SEO Optimized**: Proper meta tags, semantic HTML, and optimized performance
- **Fully Responsive**: Mobile-first design that works flawlessly on all devices
- **Type-Safe**: Built with TypeScript for enhanced code quality and developer experience

Perfect for diving businesses in popular destinations like Dahab, Sharm El Sheikh, Hurghada, or any coastal diving location worldwide.

## Features

### Core Features
- ✅ **Multi-language Support** - Full i18n implementation with 4 languages (EN, FR, DE, NL)
- ✅ **Dynamic Routing** - URL-based language routing (`/en/`, `/fr/`, etc.)
- ✅ **Advanced Filtering** - Filter dive packages and sites by level, depth, rating, and price
- ✅ **Real-time Search** - Instant search across packages, sites, and courses
- ✅ **Responsive Design** - Mobile-first approach with breakpoints for all devices
- ✅ **Dark Mode Ready** - Navy blue theme with turquoise accents
- ✅ **SEO Optimized** - Meta tags, semantic HTML, and sitemap generation

### Pages Included
- 🏠 **Home Page** - Hero section with image carousel, popular packages, and dive sites
- 🤿 **Diving Page** - Comprehensive listing of dive packages and sites with filtering
- 📚 **Courses Page** - PADI/SSI courses with progression timeline
- 👥 **About Page** - Company story, team members, and statistics
- 📞 **Contact Page** - Contact form, location map, and business information

### UI Components
- **PageHeader** - Stunning headers with background images and curved bottom edges
- **DivePackageCard** - Interactive cards with hover effects and detailed information
- **DiveSiteCard** - Beautiful site cards with ratings, depth, and level indicators
- **CourseCard** - Course cards with pricing and duration
- **FilterSortSystem** - Advanced filtering UI with multiple criteria
- **Navbar** - Responsive navigation with dropdown menus and language selector
- **Footer** - Professional footer with social links and site navigation
- **Breadcrumbs** - Navigation breadcrumbs for better UX

### Technical Features
- ⚡ **Next.js 15** - Latest App Router with server components
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🔷 **TypeScript** - Type-safe development
- 🎭 **Framer Motion** - Smooth animations and transitions
- 🎯 **Lucide Icons** - Modern, customizable icon library
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🚀 **Performance Optimized** - Fast loading times and smooth interactions

## Requirements

### System Requirements
- **Node.js**: 18.17 or higher
- **npm**: 9.0 or higher (or yarn/pnpm equivalent)
- **Operating System**: Windows, macOS, or Linux

### Dependencies
```json
{
  "next": "^16.0.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "latest"
}
```

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Instructions

### Installation

1. **Clone or Download the Project**
   ```bash
   cd dahab-divers
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Configuration

#### 1. Update Content
- **Dive Packages**: Edit `/src/data/packages.json`
- **Dive Sites**: Edit `/src/data/sites.json`
- **Courses**: Edit `/src/data/courses.json`
- **Team Members**: Edit `/src/data/team.json`

#### 2. Customize Translations
Edit language files in `/src/dictionaries/`:
- `en.json` - English
- `fr.json` - French
- `de.json` - German
- `nl.json` - Dutch

#### 3. Update Images
Replace images in `/public/images/` with your own:
- `diving-header-bg.png` - Diving page header
- `courses-header-bg.png` - Courses page header
- `about-header-bg.png` - About page header
- `contact-header-bg.png` - Contact page header

#### 4. Customize Colors
Edit `/src/app/globals.css` to change the color scheme:
```css
--navy: #0a1628;
--turquoise: #00d4ff;
```

#### 5. Configure Contact Information
Update contact details in `/src/dictionaries/[lang].json`:
- Address
- Phone number
- Email
- Business hours

### Deployment

#### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

#### Other Platforms
- **Netlify**: Use `npm run build` and deploy `/.next` folder
- **AWS/Azure**: Use Next.js standalone output
- **Docker**: Dockerfile included for containerization

### Customization Tips

**Change Header Curve Depth**
Edit `/src/components/PageHeader.tsx`:
```tsx
borderRadius: '0 0 50% 50% / 0 0 clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)'
// Adjust the 40px and 80px values
```

**Add New Language**
1. Create `/src/dictionaries/[lang-code].json`
2. Add language to `/src/i18n-config.ts`
3. Update language selector in Navbar

**Modify Filtering Logic**
Edit `/src/components/DivingContent.tsx` to customize filter behavior

## Development Time

**Estimated Development Hours**: 120-150 hours

**Breakdown**:
- UI/UX Design & Implementation: 40 hours
- Component Development: 35 hours
- Internationalization Setup: 15 hours
- Filtering & Search System: 20 hours
- Responsive Design & Testing: 15 hours
- Content Integration: 10 hours
- Performance Optimization: 10 hours
- Testing & Bug Fixes: 15 hours

---

## Support

For questions or issues, please check the documentation in the `/docs` folder or review the inline code comments.

## License

This project is available for commercial use. Please review the license file for details.

---

**Built with ❤️ for the diving community**
