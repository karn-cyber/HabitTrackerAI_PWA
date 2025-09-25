<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Habit Tracker AI - Custom Instructions for GitHub Copilot

This is a Progressive Web Application (PWA) built with Next.js, focusing on habit tracking with AI insights.

## Project Structure
- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom dark theme
- **Authentication**: Clerk Auth with dark theme
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **WebGL Effects**: OGL library for advanced visual effects
- **PWA**: Next-PWA for Progressive Web App capabilities

## Key Features
1. **Habit Selection Interface**: Animated category expansion with Tech, Personal, and Spiritual habits
2. **Dashboard**: LeetCode-style streak visualization with heatmap and activity charts
3. **Daily Reading**: 10-minute mandatory reading section with curated articles
4. **Dark Theme**: Modern dark UI inspired by LeetCode and Perplexity
5. **PWA Support**: Full offline capabilities and installable
6. **WebGL Background**: Custom LightRays component with mouse interaction

## Design Guidelines
- Use dark theme with cyan (#00ffff) as primary accent color
- Implement glass morphism effects with `glass-effect` class
- Add smooth animations using Framer Motion
- Follow responsive design principles
- Use Lucide React icons consistently
- Maintain accessibility standards

## Code Style
- Use functional components with hooks
- Implement proper TypeScript-like prop validation in comments
- Follow Next.js App Router conventions
- Use Tailwind CSS utility classes
- Implement proper error handling and loading states

## Authentication Flow
- Clerk handles authentication with custom dark theme
- Public routes: /, /sign-in, /sign-up
- Protected routes: /dashboard and other app pages
- User data persisted in localStorage for demo purposes

## Performance Considerations
- Use proper image optimization
- Implement lazy loading where appropriate
- Minimize bundle size with dynamic imports
- Optimize WebGL rendering performance
- Use React.memo for expensive components

When generating code for this project, prioritize modern React patterns, accessibility, and smooth user experience.
