# Habit Tracker AI 🚀

A modern Progressive Web Application (PWA) for habit tracking with AI-powered insights, beautiful WebGL visualizations, and mandatory daily reading features.

## ✨ Features

### 🎯 Core Functionality
- **Smart Habit Selection**: Choose from Tech, Personal, and Spiritual categories with 15+ predefined habits
- **LeetCode-style Dashboard**: Activity heatmaps, streak tracking, and progress visualization
- **Daily Reading**: Mandatory 10-minute reading section with curated tech and personal development articles
- **Real-time Progress**: Live streak counting and habit completion tracking

### � Visual Experience
- **WebGL Light Rays**: Advanced shader-based background effects using React Bits OGL implementation
- **Modern Dark Theme**: Inspired by LeetCode and Perplexity with cyan (#00ffff) accents
- **Glass Morphism**: Beautiful frosted glass effects throughout the UI
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Responsive Design**: Perfect on desktop and mobile devices

### 🔧 Technical Features
- **Progressive Web App**: Installable with offline capabilities
- **Secure Authentication**: Clerk integration with custom dark theming
- **TypeScript-like Patterns**: Well-documented prop validation and modern React patterns
- **Performance Optimized**: Lazy loading, image optimization, and efficient rendering

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.25 with App Router
- **Language**: JavaScript (ES6+) with JSDoc comments
- **Styling**: Tailwind CSS v3 with custom dark theme
- **Authentication**: Clerk v4.31.0
- **Animations**: Framer Motion v11.17.2
- **Charts**: Recharts v2.15.0
- **WebGL**: OGL v1.0.11 for advanced visual effects
- **Icons**: Lucide React v0.468.0
- **State Management**: React hooks with localStorage persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/habit-tracker-ai.git
   cd habit-tracker-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Clerk credentials:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### 1. Authentication
- Sign up or sign in using Clerk's secure authentication
- Customized dark theme matches the app's aesthetic

### 2. Habit Selection
- Choose from three main categories:
  - **Tech**: LeetCode, Codeforces, GitHub contributions, System Design study
  - **Personal**: Gym workout, Daily walk, Reading, Journaling, Healthy eating
  - **Spiritual**: Meditation, Prayer, Gratitude practice, Mindful reading

### 3. Dashboard Features
- **Activity Heatmap**: GitHub-style contribution graph showing daily progress
- **Streak Tracking**: Current streak counter with flame icon
- **Progress Charts**: Visual representation of habit completion over time
- **Daily Habits**: Check off completed habits for the day

### 4. Daily Reading (Mandatory)
- **10-minute requirement**: Complete daily reading to maintain streak
- **Curated content**: Tech articles, personal development, and mindfulness pieces
- **Reading timer**: Live tracking of reading progress
- **Rich content**: Properly formatted articles with syntax highlighting for code

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#00ffff) for accents and CTAs
- **Background**: Dark gray (#111827) with gradient overlays  
- **Glass Effects**: Semi-transparent backgrounds with blur
- **Text**: White (#ffffff) primary, gray variants for secondary

### Components
- **Glass Effect**: Custom Tailwind class for frosted glass appearance
- **Button Styles**: Primary (cyan) and secondary (outlined) variants
- **Light Rays**: WebGL-powered background with mouse interaction
- **Category Cards**: Expandable sections with smooth animations

## 🔧 Architecture

### File Structure
```
src/
├── app/
│   ├── page.js              # Home/Habit Selection
│   ├── dashboard/
│   │   └── page.js          # Main dashboard
│   ├── reading/
│   │   └── page.js          # Daily reading page
│   ├── layout.js            # Root layout with Clerk
│   └── globals.css          # Global styles
├── components/
│   ├── LightRays.js         # WebGL background component
│   └── LightRays.css        # Component styles
└── middleware.js            # Clerk authentication middleware
```

### Key Components

#### LightRays Component
Advanced WebGL shader implementation with:
- Mouse-following light rays
- Customizable colors, speed, and spread
- Performance optimizations with intersection observer
- Proper cleanup and memory management

#### Dashboard
- Real-time habit tracking
- GitHub-style activity heatmap
- Recharts integration for data visualization
- localStorage integration for persistence

## 📚 Daily Reading System

### Features
- **Timer-based tracking**: Accurate 10-minute reading sessions
- **Pause/Resume**: Flexible reading experience
- **Progress persistence**: Maintains reading state across sessions
- **Rich content**: Markdown-style formatting with code syntax highlighting
- **Category variety**: Tech tutorials, productivity tips, mindfulness content

### Content Categories
1. **Tech Articles**: JavaScript patterns, development best practices
2. **Personal Development**: Habit formation psychology, productivity
3. **Mindfulness**: Meditation guides, spiritual growth content

## 🔐 Authentication Flow

- **Public Routes**: `/`, `/sign-in`, `/sign-up`
- **Protected Routes**: `/dashboard`, `/reading`
- **Middleware**: Automatic redirect to sign-in for unauthenticated users
- **User Persistence**: Habit selections stored in localStorage
- **Session Management**: Handled entirely by Clerk

## 🚀 Performance Optimizations

- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Next.js automatic image optimization
- **WebGL Efficiency**: Intersection observer for background effects
- **Bundle Size**: Tree shaking and minimal dependencies
- **Caching**: Proper cache headers and asset optimization

## 🔧 Development

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
```

### Environment Setup
- **Node.js**: v18 or higher recommended
- **Clerk Setup**: Create account at https://clerk.com/
- **WebGL Support**: Modern browsers with WebGL 2.0 support

### Adding New Habits
Edit the `categories` object in `src/app/page.js`:
```javascript
const categories = {
  tech: {
    title: 'Tech',
    icon: Code2,
    gradient: 'category-gradient-tech',
    habits: [
      { name: 'New Habit', icon: IconComponent, color: 'text-color-class' }
    ]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Bits**: For the amazing LightRays WebGL component
- **Clerk**: For seamless authentication
- **Vercel**: For Next.js and deployment platform  
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For beautiful animations
- **OGL**: For lightweight WebGL library

## 🔗 Links

- [Live Demo](https://your-demo-url.vercel.app)
- [Design Inspiration](https://leetcode.com)
- [React Bits Components](https://reactbits.dev)

---

**Built with ❤️ by [Your Name]** | [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername)

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 PWA Installation

1. Visit the app in your browser
2. Look for the "Install" prompt or use browser menu
3. The app will be installed and can run offline

## 🎨 Design Features

### Habit Categories
- **Tech**: LeetCode, Codeforces, GitHub, System Design, Tech Reading
- **Personal**: Gym, Walking, Reading, Journaling, Healthy Eating
- **Spiritual**: Meditation, Prayer, Gratitude, Mindful Reading, Nature

### Dashboard Features
- Activity heatmap (GitHub-style)
- Streak statistics
- Interactive charts
- Daily reading recommendations
- Real-time habit completion

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   └── LightRays.js     # WebGL background effect
└── middleware.js        # Clerk authentication middleware
```

## 🌟 Key Components

### LightRays Component
Interactive WebGL background with:
- Mouse following effects
- Customizable colors and speed
- Performance optimized rendering
- Smooth animations

### Dashboard
- Real-time streak tracking
- Activity visualization
- Reading recommendations
- Habit completion interface

## 🚀 Deployment

The app can be deployed to any platform supporting Next.js:

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
- Netlify
- Heroku
- AWS
- Railway

## 📱 PWA Features

- **Installable**: Add to home screen
- **Offline Support**: Works without internet
- **Background Sync**: Sync data when online
- **Push Notifications**: Habit reminders (optional)

## 🎯 Future Enhancements

- [ ] AI-powered habit recommendations
- [ ] Social features and habit sharing
- [ ] Advanced analytics and insights
- [ ] Integration with fitness trackers
- [ ] Habit streaks leaderboard
- [ ] Custom habit creation
- [ ] Data export capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from LeetCode and Perplexity
- WebGL effects powered by OGL
- Authentication by Clerk
- Charts by Recharts
- Animations by Framer Motion

---

Built with ❤️ using Next.js and modern web technologies
# HabitTrackerAI_PWA
