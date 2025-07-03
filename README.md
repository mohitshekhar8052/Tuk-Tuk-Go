# Tuk-Tuk-Go 🛺

A modern, responsive web application for auto-rickshaw booking and city tours in Gorakhpur, India. Built with React, TypeScript, and Tailwind CSS, this project focuses on providing an optimized fare system and excellent user experience.

![Tuk-Tuk-Go Logo](pngwing.com.png)

## 🚀 Features

### Current Features ✅
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Clean, professional interface with intuitive navigation
- **Form Validation**: Real-time validation for contact and booking forms
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Enhanced UX with loading indicators
- **Multi-page Routing**: Smooth navigation between different sections
- **Service Categories**: City tours, point-to-point, and hourly packages
- **Customer Testimonials**: Social proof and reviews
- **Contact System**: Multiple ways to reach support

### Planned Features 🔄
- Backend API integration
- Real-time booking system
- Payment gateway integration
- GPS tracking and route optimization
- Driver management system
- Mobile application
- Push notifications
- Admin dashboard

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form management and validation
- **Yup** - Schema validation
- **Lucide React** - Beautiful icons

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **TypeScript ESLint** - TypeScript-specific linting

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookingModal.tsx    # Ride booking modal
│   ├── ContactSection.tsx  # Contact form component
│   ├── ErrorBoundary.tsx   # Error handling
│   ├── Footer.tsx          # Site footer
│   ├── LoadingSpinner.tsx  # Loading indicator
│   └── Navigation.tsx      # Main navigation
├── pages/              # Page components
│   ├── HomePage.tsx        # Landing page
│   ├── AboutPage.tsx       # About us page
│   ├── ContactPage.tsx     # Contact page
│   └── TestimonialsPage.tsx # Customer reviews
├── utils/              # Utility functions
│   └── validationSchemas.ts # Form validation schemas
├── App.tsx             # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohitkumar/Tuk-Tuk-Go.git
   cd Tuk-Tuk-Go
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#1e1b4b, #4f46e5)
- **Secondary**: Amber (#f59e0b, #fbbf24)
- **Background**: Gradient from amber-50 to white
- **Text**: Gray scale (900, 700, 600, 500)

### Typography
- **Headings**: Bold, varying sizes (text-4xl to text-xl)
- **Body**: Regular weight, readable line heights
- **Interactive**: Medium weight for buttons and links

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Rounded, with transition effects
- **Forms**: Clean inputs with validation states
- **Navigation**: Sticky header with mobile hamburger menu

## 📱 Pages Overview

### 🏠 Home Page
- Hero section with compelling CTA
- Service statistics and metrics
- Service categories overview
- How it works process
- Contact form

### ℹ️ About Page
- Company story and mission
- Core values and principles
- Team information
- Service guarantees

### 💬 Testimonials Page
- Customer reviews and ratings
- Social proof elements
- Success stories
- Call-to-action for new users

### 📞 Contact Page
- Contact form with validation
- Multiple contact methods
- FAQ section
- Emergency contact information

## 🔧 Form Validation

### Contact Form
- **Name**: Required, 2-50 characters
- **Email**: Required, valid email format
- **Message**: Required, 10-500 characters

### Booking Form
- **Pickup Location**: Required, minimum 3 characters
- **Destination**: Required, minimum 3 characters
- **Date & Time**: Required, future dates only
- **Passengers**: Required, 1-3 passengers
- **Phone**: Required, valid Indian phone number format

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Deployment Options
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop `dist` folder or connect repository
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS S3**: Upload `dist` contents to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write descriptive commit messages
- Add proper error handling
- Ensure responsive design
- Test across different browsers

## 📈 Performance Optimizations

- **Vite Build System**: Fast development and optimized production builds
- **Code Splitting**: Automatic code splitting with React Router
- **Image Optimization**: Proper image sizing and formats
- **CSS Purging**: Tailwind CSS purges unused styles
- **Loading States**: Improved perceived performance

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **Error Boundaries**: Graceful error handling
- **Secure Forms**: Protection against common vulnerabilities
- **Safe Routing**: Protected routes and navigation

## 🐛 Known Issues

- Contact form currently logs to console (needs backend integration)
- Booking system is a mock implementation
- Images are placeholders and need real assets
- Social media links are not functional

## 🚧 Roadmap

### Phase 1: Backend Integration
- [ ] REST API development
- [ ] Database design and implementation
- [ ] User authentication system
- [ ] Real booking functionality

### Phase 2: Advanced Features
- [ ] Payment gateway integration
- [ ] Real-time tracking with GPS
- [ ] Push notifications
- [ ] Mobile app development

### Phase 3: Business Features
- [ ] Driver management system
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Mohit Kumar** - *Founder & Developer* - [GitHub](https://github.com/mohitkumar)

## 📞 Support

For support, email support@tukgo.com or call +91 8429258530.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern transportation apps
- Built with love for the Gorakhpur community

---

**Made with ❤️ in Gorakhpur, India**
