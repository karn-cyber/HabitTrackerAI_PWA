'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Calendar, Flame, Trophy, Target, BookOpen, Plus, Check, X } from 'lucide-react';
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
      case 0: return 'bg-slate-800 border-slate-700';
      case 1: return 'bg-green-900/30 border-green-800';
      case 2: return 'bg-green-700/50 border-green-600';
      case 3: return 'bg-green-500/70 border-green-400';
      case 4: return 'bg-green-400 border-green-300';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  // Calculate weeks for the activity grid
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
  const { user } = useUser();
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalCompleted, setTotalCompleted] = useState(42);

  useEffect(() => {
    // Load selected habits from localStorage
    const savedHabits = localStorage.getItem('selectedHabits');
    if (savedHabits) {
      setSelectedHabits(JSON.parse(savedHabits));
    }
    setStreakData(generateStreakData());
  }, []);

  const handleHabitComplete = (habitName) => {
    // In a real app, this would update the backend
    console.log(`Completed habit: ${habitName}`);
    setCurrentStreak(prev => prev + 1);
    setTotalCompleted(prev => prev + 1);
  };

  const getStreakCalendar = () => {
    const days = [];
    const today = new Date();
    
    // Generate last 105 days (15 weeks)
    for (let i = 104; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const activity = Math.random();
      let level = 0;
      if (activity > 0.8) level = 4;
      else if (activity > 0.6) level = 3;
      else if (activity > 0.4) level = 2;
      else if (activity > 0.2) level = 1;
      
      days.push({
        date: date.toISOString().split('T')[0],
        level,
        day: date.getDay()
      });
    }
    return days;
  };

  const streakDays = getStreakCalendar();

  return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ width: '100%', height: '100vh', position: 'absolute' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={0.8}
          lightSpread={1.8}
          rayLength={2.0}
          followMouse={true}
          mouseInfluence={0.03}
          noiseAmount={0.02}
          fadeDistance={1.5}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-cyan-400" size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.firstName || 'User'}!</p>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Flame className="text-orange-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Current Streak</h3>
            </div>
            <p className="text-3xl font-bold text-orange-400">{currentStreak} days</p>
            <p className="text-gray-400 text-sm">Keep it going!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Trophy className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Total Completed</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{totalCompleted}</p>
            <p className="text-gray-400 text-sm">Habits completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Target className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Active Habits</h3>
            </div>
            <p className="text-3xl font-bold text-cyan-400">{selectedHabits.length}</p>
            <p className="text-gray-400 text-sm">Currently tracking</p>
          </motion.div>
        </div>

        {/* Daily Reading Section - Mandatory 10 min reading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <BookOpen className="text-cyan-400" size={24} />
              Daily Reading (10 min required)
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.href = '/reading'}
                className="btn-primary text-sm px-4 py-2"
              >
                Start Reading
              </button>
              <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                Required
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {dailyReading.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 transition-all duration-200 block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    article.category === 'tech' ? 'bg-orange-400' :
                    article.category === 'personal' ? 'bg-green-400' : 'bg-purple-400'
                  }`} />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {article.readTime}
                  </span>
                </div>
                <h4 className="text-white font-medium mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {article.source}
                </p>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
            <p className="text-yellow-400 text-sm">
              💡 Complete at least 10 minutes of reading daily to maintain your streak!
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Streak Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="text-cyan-400" size={24} />
              Activity Heatmap
            </h3>
            
            <div className="grid grid-cols-15 gap-1 mb-4">
              {streakDays.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm border border-slate-600 ${
                    day.level === 0 ? 'bg-slate-700' :
                    day.level === 1 ? 'bg-cyan-900' :
                    day.level === 2 ? 'bg-cyan-700' :
                    day.level === 3 ? 'bg-cyan-500' :
                    'bg-cyan-300'
                  }`}
                  title={`${day.date}: ${day.level} activities`}
                />
              ))}
            </div>
            
            <div className="text-sm text-gray-400 flex justify-between items-center">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-slate-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-cyan-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-cyan-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-cyan-300 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>

            {/* Chart */}
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={streakData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f1f5f9'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00ffff" 
                    fillOpacity={1} 
                    fill="url(#colorValue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Reading & Habits */}
          <div className="space-y-6">
            {/* Daily Reading */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-cyan-400" size={24} />
                Daily Reading (10 min)
              </h3>
              
              <div className="space-y-3">
                {dailyReading.map((article, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium text-white text-sm mb-1">
                      {article.title}
                    </h4>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{article.source}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Today's Habits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Today&apos;s Habits</h3>
              
              <div className="space-y-2">
                {selectedHabits.slice(0, 5).map((habit, index) => {
                  const IconComponent = habit.icon;
                  const isCompleted = Math.random() > 0.5; // Mock completion status
                  
                  return (
                    <motion.button
                      key={habit.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleHabitComplete(habit.name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isCompleted 
                          ? 'bg-green-500/20 border border-green-400' 
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      <IconComponent size={16} className={habit.color} />
                      <span className={`text-sm font-medium ${
                        isCompleted ? 'text-green-400 line-through' : 'text-white'
                      }`}>
                        {habit.name}
                      </span>
                      {isCompleted && (
                        <div className="ml-auto text-green-400">✓</div>
                      )}
                    </motion.button>
                  );
                })}
                
                {selectedHabits.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No habits selected</p>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      <Plus size={16} className="inline mr-2" />
                      Add Habits
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
