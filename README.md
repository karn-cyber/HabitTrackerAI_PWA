# Habit Tracker AI 🚀

A modern Progressive Web Application (PWA) for habit tracking with AI-powered insights and beautiful visualizations.

## ✨ Features

- **🎯 Smart Habit Selection**: Choose from Tech, Personal, and Spiritual categories
- **📊 LeetCode-style Streak Visualization**: Beautiful activity heatmaps and charts
- **📚 Daily Reading**: Mandatory 10-minute reading section with curated articles
- **🌙 Modern Dark Theme**: Inspired by LeetCode and Perplexity
- **🎨 WebGL Effects**: Interactive light rays background using OGL
- **📱 Progressive Web App**: Installable with offline support
- **🔐 Secure Authentication**: Powered by Clerk with custom dark theme
- **✨ Smooth Animations**: Framer Motion for delightful interactions

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Animations**: Framer Motion
- **Charts**: Recharts
- **WebGL**: OGL
- **PWA**: Next-PWA
- **Icons**: Lucide React

## 🚀 Getting Started

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
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

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
