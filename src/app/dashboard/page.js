'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Calendar, Flame, Trophy, Target, BookOpen, Plus, Check, X, Settings, Home } from 'lucide-react';
import LightRays from '../../components/LightRays';

// Generate activity data for the past 365 days (like LeetCode)
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const activity = Math.random();
    let level = 0;
    if (activity > 0.8) level = 4;
    else if (activity > 0.6) level = 3;
    else if (activity > 0.4) level = 2;
    else if (activity > 0.2) level = 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      level,
      count: level * Math.floor(Math.random() * 3) + 1,
      dayOfWeek: date.getDay(),
      month: date.getMonth(),
      day: date.getDate()
    });
  }
  return data;
};

// Habit categories with icons
const habitCategories = {
  tech: {
    title: 'Tech',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    habits: ['LeetCode', 'System Design', 'Code Review', 'Tech Reading', 'Open Source']
  },
  personal: {
    title: 'Personal',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    habits: ['Exercise', 'Reading', 'Journaling', 'Learning', 'Networking']
  },
  spiritual: {
    title: 'Spiritual',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    habits: ['Meditation', 'Reflection', 'Gratitude', 'Mindfulness', 'Prayer']
  }
};

export default function Dashboard() {
  const { user } = useUser();
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(47);
  const [totalSolved, setTotalSolved] = useState(284);
  const [completedToday, setCompletedToday] = useState(new Set());

  useEffect(() => {
    // Load selected habits from localStorage
    const savedHabits = localStorage.getItem('selectedHabits');
    if (savedHabits) {
      setSelectedHabits(JSON.parse(savedHabits));
    }
    setActivityData(generateActivityData());
  }, []);

  const toggleHabitComplete = (habit) => {
    const newCompleted = new Set(completedToday);
    if (newCompleted.has(habit)) {
      newCompleted.delete(habit);
    } else {
      newCompleted.add(habit);
      setTotalSolved(prev => prev + 1);
    }
    setCompletedToday(newCompleted);
  };

  const getActivityColor = (level) => {
    switch (level) {
      case 0: return 'bg-slate-800/50 border-slate-700';
      case 1: return 'bg-green-900/40 border-green-800';
      case 2: return 'bg-green-700/60 border-green-600';
      case 3: return 'bg-green-500/80 border-green-400';
      case 4: return 'bg-green-400 border-green-300';
      default: return 'bg-slate-800/50 border-slate-700';
    }
  };

  // Calculate weeks for the activity grid
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Subtle background effect */}
      <div className="fixed inset-0 opacity-5">
        <LightRays
          raysOrigin="top-center"
          raysColor="#10b981"
          raysSpeed={0.3}
          lightSpread={2.0}
          rayLength={3.0}
          followMouse={false}
          mouseInfluence={0}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Home size={20} className="text-slate-400" />
              </button>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Settings size={20} className="text-slate-400" />
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Solved</p>
                <p className="text-2xl font-bold text-white">{totalSolved}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Trophy size={24} className="text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-white">{currentStreak}</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Flame size={24} className="text-orange-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Longest Streak</p>
                <p className="text-2xl font-bold text-white">{longestStreak}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Target size={24} className="text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Today</p>
                <p className="text-2xl font-bold text-white">{completedToday.size}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Calendar size={24} className="text-blue-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Activity</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm border ${getActivityColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Months labels */}
          <div className="flex justify-between mb-2 text-xs text-slate-500">
            {monthLabels.map((month, index) => (
              <span key={index}>{month}</span>
            ))}
          </div>

          {/* Activity grid */}
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm border cursor-pointer hover:border-slate-400 transition-colors ${getActivityColor(day.level)}`}
                    title={`${day.date}: ${day.count} activities`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Days labels */}
          <div className="flex flex-col space-y-1 mt-2 text-xs text-slate-500">
            {dayLabels.map((day, index) => (
              index % 2 === 1 && <span key={index} className="h-3 flex items-center">{day}</span>
            ))}
          </div>
        </motion.div>

        {/* Habits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Today&apos;s Habits</h3>
            <button 
              onClick={() => window.location.href = '/'}
              className="text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              + Add more habits
            </button>
          </div>

          {Object.entries(habitCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${category.color.replace('text-', 'bg-')}`} />
                <h4 className="text-lg font-medium text-white">{category.title}</h4>
                <span className="text-sm text-slate-400">({category.habits.length} habits)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.habits.map((habit) => {
                  const isCompleted = completedToday.has(habit);
                  return (
                    <motion.button
                      key={habit}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleHabitComplete(habit)}
                      className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                        isCompleted
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{habit}</span>
                        {isCompleted ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-slate-600 rounded" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Daily Reading Section */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <BookOpen size={20} className="text-blue-400" />
                <h4 className="text-lg font-medium text-white">Daily Reading</h4>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Required</span>
              </div>
              <button 
                onClick={() => window.location.href = '/reading'}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Start Reading
              </button>
            </div>
            <p className="text-slate-400 text-sm">
              Complete 10 minutes of daily reading to maintain your streak
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
