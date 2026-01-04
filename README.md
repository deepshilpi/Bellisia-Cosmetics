# bellisia Shopify Theme V1.0.0 by Gentmind

A premium, feature-rich Shopify theme designed for modern e-commerce stores with advanced functionality and beautiful design.

## 🌟 Features

### 🎨 Design & UX
- **Modern Glass-morphism Design** - Stunning blur effects and transparency
- **Mobile-First Responsive** - Perfect on all devices
- **Advanced Typography** - Multiple font options and text presets
- **Color Schemes** - Comprehensive color customization
- **Smooth Animations** - Professional transitions and effects

### 🛍️ E-commerce Features
- **Advanced Product Display** - Grid, list, and gallery layouts
- **Product Bundles** - Create product bundles and deals
- **Quick View & Quick Add** - Streamlined shopping experience
- **Product Comparison** - Side-by-side product comparison
- **Wishlist Functionality** - Customer wishlists
- **Advanced Filtering** - Powerful product filtering
- **Search & Discovery** - Intelligent search with suggestions

### 📱 Mobile Features
- **Mobile-Optimized Navigation** - Intuitive mobile menus
- **Touch-Friendly Interface** - Optimized for touch interactions
- **Progressive Web App Ready** - Modern mobile experience

### 🌍 Internationalization
- **26+ Language Support** - Multi-language ready
- **Currency Support** - Multiple currency options
- **Localization** - Region-specific features

### ⚡ Performance
- **Optimized Loading** - Fast page load times
- **SEO Friendly** - Built-in SEO optimizations
- **Accessibility** - WCAG compliant design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Shopify CLI
- Shopify Partner Account or Store

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd bellisia-cosmetics
   ```

2. **Login to Shopify**
   ```bash
   shopify auth login
   ```

3. **Start development**
   ```bash
   shopify theme dev
   ```

4. **Push to live**
   ```bash
   shopify theme push
   ```

## 📁 Theme Structure

```
bellisia-cosmetics/
├── assets/          # CSS, JavaScript, images
├── blocks/          # Reusable content blocks
├── config/          # Theme settings and schema
├── layout/          # Main theme layout
├── locales/         # Multi-language support
├── sections/        # Page sections
├── snippets/        # Reusable code snippets
└── templates/       # Page templates
```

## 🎨 Customization

### Theme Settings
Access theme settings in Shopify Admin → Online Store → Themes → Customize

### Key Customizable Areas
- **Colors & Typography** - Brand colors, fonts, text styles
- **Header & Navigation** - Logo, menu, search functionality
- **Product Display** - Grid layouts, product cards, quick view
- **Footer** - Layout, links, social media
- **Advanced Features** - Animations, effects, transitions

### CSS Customization
Main styles in `assets/base.css`. Component-specific styles in individual CSS files.

## 🔧 Development

### Local Development
```bash
# Start local development server
shopify theme dev

# Watch for changes and auto-sync
shopify theme dev --live
```

### File Structure
- **Liquid Templates** (`.liquid`) - Shopify's template language
- **CSS/SCSS** (`.css`) - Stylesheets
- **JavaScript** (`.js`) - Interactive functionality
- **JSON** (`.json`) - Configuration and localization

### Key Files
- `layout/theme.liquid` - Main theme layout
- `sections/header.liquid` - Header with blur effect
- `assets/base.css` - Core styles
- `config/settings_schema.json` - Theme configuration

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 15+

## ⚠️ Important Notes

### Blur Effect
The sticky header includes a glass-morphism blur effect using `backdrop-filter`. This requires modern browser support.

### Performance
- Images are optimized for web
- CSS and JS are minified in production
- Lazy loading implemented for images

### Compatibility
- Fully compatible with Shopify Online Store 2.0
- Supports all Shopify payment gateways
- Compatible with Shopify Apps

## 🤝 Support

### Documentation
- [Theme Documentation](https://gentmind.com/documentation/)
- [Shopify Theme Docs](https://shopify.dev/themes)

### Get Help
- [Support Portal](https://gentmind.com/support/)
- Email: support@gentmind.com

## 📄 License

This theme is proprietary software licensed by Gentmind. See license agreement for details.

## 🔄 Updates

Theme updates are delivered through the Shopify Theme Store. Always backup before updating.

## 🎯 Version History

### V1.0.0 (Current)
- Initial release
- Complete rebrand from Ella to bellisia
- Enhanced sticky header with blur effect
- Full Shopify 2.0 compatibility
- 26+ language support
- Advanced e-commerce features

---

**Developed by Gentmind**  
*Premium Shopify Themes & Development*  
[https://gentmind.com](https://gentmind.com)
