'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Pause } from 'lucide-react';
import LightRays from '../../components/LightRays';

const readingArticles = [
  {
    id: 1,
    title: "The Psychology of Habit Formation: Science-Backed Strategies for Lasting Change",
    content: `
# The Psychology of Habit Formation: Science-Backed Strategies for Lasting Change

Habits are the building blocks of our daily lives, shaping everything from our morning routines to our professional success. Understanding the psychology behind habit formation can help us create positive changes that stick.

## The Habit Loop

According to neuroscientist Ann Graybiel, every habit consists of three components:

1. **The Cue**: The trigger that initiates the behavior
2. **The Routine**: The behavior itself
3. **The Reward**: The benefit you gain from doing the behavior

This neurological loop becomes automatic over time, which is why habits are so powerful - and so hard to break.

## The Science of Habit Formation

Research shows that it takes an average of 66 days for a new behavior to become automatic. However, this varies significantly depending on the complexity of the behavior and individual differences.

### Key Findings:

- Simple habits (like drinking water after waking up) can become automatic in as little as 18 days
- Complex habits (like exercising for 50 minutes daily) can take up to 254 days
- Missing one day doesn't significantly impact habit formation
- The basal ganglia in our brain plays a crucial role in habit formation

## Practical Strategies for Building Better Habits

### 1. Start Small
Begin with habits so small they seem almost trivial. Want to read more? Start with just one page per day.

### 2. Stack Your Habits
Link your new habit to an existing one. "After I pour my morning coffee, I will write three things I'm grateful for."

### 3. Design Your Environment
Make good habits obvious and bad habits invisible. Place a book by your bedside instead of your phone.

### 4. Use Implementation Intentions
Be specific about when and where you'll perform your habit: "I will meditate for 5 minutes at 7 AM in my bedroom."

## The Role of Identity in Habit Change

Perhaps the most powerful insight from habit research is the importance of identity. Instead of focusing on what you want to achieve, focus on who you want to become.

- Don't say "I want to run a marathon"
- Say "I am a runner"

Every action you take is a vote for the type of person you want to become. The goal isn't to read a book; it's to become a reader.

## Overcoming Common Obstacles

### Lack of Motivation
Motivation gets you started, but systems keep you going. Design your habits to work even when motivation is low.

### All-or-Nothing Thinking
Perfect is the enemy of good. A 5-minute workout is infinitely better than no workout.

### Impatience with Results
Focus on the process, not the outcome. Trust that consistent small actions will compound over time.

## Conclusion

Building lasting habits isn't about willpower - it's about designing the right systems and understanding how your brain works. By applying these science-backed strategies, you can create positive changes that truly stick.

Remember: You are what you repeatedly do. Excellence, then, is not an act, but a habit.
    `,
    readTime: 12,
    category: 'personal',
    author: 'Dr. Sarah Chen',
    source: 'Psychology Today'
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns: Building Scalable Applications",
    content: `
# Advanced JavaScript Patterns: Building Scalable Applications

Modern JavaScript development requires more than just knowing the syntax. To build maintainable, scalable applications, developers need to understand advanced patterns and architectural principles.

## The Observer Pattern in Action

The Observer pattern is fundamental to reactive programming and is extensively used in modern frameworks.

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
\`\`\`

## Module Pattern and Namespace Management

Organizing code into modules prevents global namespace pollution and creates clear boundaries between different parts of your application.

\`\`\`javascript
const UserManager = (function() {
  // Private variables
  let users = [];
  
  // Private methods
  function validateUser(user) {
    return user.email && user.name;
  }
  
  // Public API
  return {
    addUser(user) {
      if (validateUser(user)) {
        users.push(user);
        return true;
      }
      return false;
    },
    
    getUsers() {
      return [...users]; // Return a copy
    }
  };
})();
\`\`\`

## Factory Pattern for Object Creation

The Factory pattern provides a way to create objects without specifying their exact class.

\`\`\`javascript
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
}

class AnimalFactory {
  static createAnimal(type, name) {
    switch(type) {
      case 'dog':
        return new Animal(name, 'Canis lupus');
      case 'cat':
        return new Animal(name, 'Felis catus');
      default:
        throw new Error('Unknown animal type');
    }
  }
}
\`\`\`

## Asynchronous Patterns

Modern JavaScript heavily relies on asynchronous operations. Understanding promises, async/await, and error handling is crucial.

\`\`\`javascript
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async fetchWithRetry(endpoint, options = {}, retries = 3) {
    try {
      const response = await fetch(\`\${this.baseURL}/\${endpoint}\`, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        console.log(\`Retrying... \${retries} attempts left\`);
        await this.delay(1000);
        return this.fetchWithRetry(endpoint, options, retries - 1);
      }
      throw error;
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
\`\`\`

## State Management Patterns

For complex applications, proper state management is essential.

\`\`\`javascript
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
  
  getState() {
    return { ...this.state };
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}
\`\`\`

## Performance Optimization Patterns

### Debouncing and Throttling

\`\`\`javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
\`\`\`

## Conclusion

These patterns form the foundation of scalable JavaScript applications. By understanding and applying them appropriately, you can write more maintainable, testable, and performant code.

The key is knowing when to use each pattern - premature optimization is the root of all evil, but having these tools in your toolkit will make you a more effective developer.
    `,
    readTime: 15,
    category: 'tech',
    author: 'Alex Rodriguez',
    source: 'Dev.to'
  }
];

export default function Reading() {
  const { user } = useUser();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [completedReading, setCompletedReading] = useState(false);

  useEffect(() => {
    let interval;
    if (isReading && readingTime < 600) { // 10 minutes = 600 seconds
      interval = setInterval(() => {
        setReadingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 600) {
            setCompletedReading(true);
            setIsReading(false);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading, readingTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startReading = (article) => {
    setSelectedArticle(article);
    setIsReading(true);
  };

  const toggleReading = () => {
    setIsReading(!isReading);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={0.5}
          lightSpread={1.5}
          rayLength={2.0}
          followMouse={true}
          mouseInfluence={0.05}
        />
      </div>

      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-cyan-400" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-cyan-400">Daily Reading</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Reading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${completedReading ? 'bg-green-500/20' : 'bg-cyan-500/20'}`}>
                {completedReading ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : (
                  <Clock className="text-cyan-400" size={24} />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Reading Progress</h3>
                <p className="text-gray-400">
                  {completedReading ? 'Daily goal completed!' : 'Complete 10 minutes of reading'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${completedReading ? 'text-green-400' : 'text-cyan-400'}`}>
                {formatTime(readingTime)}
              </p>
              <p className="text-gray-400">/ 10:00</p>
            </div>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                completedReading ? 'bg-green-400' : 'bg-cyan-400'
              }`}
              style={{ width: `${Math.min((readingTime / 600) * 100, 100)}%` }}
            />
          </div>
          
          {selectedArticle && (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleReading}
                className="btn-primary flex items-center gap-2"
              >
                {isReading ? <Pause size={16} /> : <Play size={16} />}
                {isReading ? 'Pause' : 'Resume'} Reading
              </button>
              <span className="text-gray-400">
                Currently reading: {selectedArticle.title}
              </span>
            </div>
          )}
        </motion.div>

        {!selectedArticle ? (
          /* Article Selection */
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your <span className="text-cyan-400">Daily Reading</span>
              </h2>
              <p className="text-xl text-gray-300">
                Select an article to start your 10-minute daily reading session
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {readingArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 cursor-pointer hover:bg-slate-800/50 transition-all duration-300"
                  onClick={() => startReading(article)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      article.category === 'tech' ? 'bg-orange-400' :
                      article.category === 'personal' ? 'bg-green-400' : 'bg-purple-400'
                    }`} />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {article.readTime} min read
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.source}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-cyan-400" size={16} />
                      <span className="text-cyan-400 text-sm">Start Reading</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Article Content */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ← Back to Articles
              </button>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedArticle.category === 'tech' ? 'bg-orange-400' :
                  selectedArticle.category === 'personal' ? 'bg-green-400' : 'bg-purple-400'
                }`} />
                <span className="text-gray-400 text-sm uppercase">
                  {selectedArticle.category}
                </span>
              </div>
            </div>
            
            <div className="prose prose-invert prose-cyan max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedArticle.content
                    .replace(/\n/g, '<br/>')
                    .replace(/```javascript\n([\s\S]*?)\n```/g, '<pre class="bg-slate-800 p-4 rounded-lg overflow-x-auto"><code class="text-cyan-400">$1</code></pre>')
                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-700 px-1 py-0.5 rounded text-cyan-400">$1</code>')
                    .replace(/^# (.+$)/gim, '<h1 class="text-3xl font-bold text-white mb-4">$1</h1>')
                    .replace(/^## (.+$)/gim, '<h2 class="text-2xl font-bold text-white mb-3 mt-6">$1</h2>')
                    .replace(/^### (.+$)/gim, '<h3 class="text-xl font-bold text-white mb-2 mt-4">$1</h3>')
                    .replace(/^\* (.+$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
                    .replace(/^(\d+\.) (.+$)/gim, '<li class="text-gray-300 mb-1">$2</li>')
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
