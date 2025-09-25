'use client';

import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import LightRays from '../components/LightRays';
import { Code2, Dumbbell, Heart, Plus, X, Github, Users, BookOpen, Zap, Settings, Brain } from 'lucide-react';

const categories = {
  tech: {
    title: 'Tech',
    icon: Code2,
    gradient: 'category-gradient-tech',
    habits: [
      { name: 'LeetCode', icon: Code2, color: 'text-orange-400' },
      { name: 'Codeforces', icon: Zap, color: 'text-blue-400' },
      { name: 'GitHub Contributions', icon: Github, color: 'text-green-400' },
      { name: 'System Design Study', icon: Settings, color: 'text-purple-400' },
      { name: 'Tech Reading', icon: BookOpen, color: 'text-cyan-400' }
    ]
  },
  personal: {
    title: 'Personal',
    icon: Dumbbell,
    gradient: 'category-gradient-personal',
    habits: [
      { name: 'Gym Workout', icon: Dumbbell, color: 'text-red-400' },
      { name: 'Daily Walk', icon: Users, color: 'text-green-400' },
      { name: 'Reading', icon: BookOpen, color: 'text-blue-400' },
      { name: 'Journaling', icon: Heart, color: 'text-pink-400' },
      { name: 'Healthy Eating', icon: Heart, color: 'text-orange-400' }
    ]
  },
  spiritual: {
    title: 'Spiritual',
    icon: Heart,
    gradient: 'category-gradient-spiritual',
    habits: [
      { name: 'Meditation', icon: Brain, color: 'text-purple-400' },
      { name: 'Prayer', icon: Heart, color: 'text-pink-400' },
      { name: 'Gratitude Practice', icon: Heart, color: 'text-yellow-400' },
      { name: 'Mindful Reading', icon: BookOpen, color: 'text-indigo-400' },
      { name: 'Nature Connection', icon: Heart, color: 'text-green-400' }
    ]
  }
};

export default function Home() {
  const { isSignedIn } = useUser();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedHabits, setSelectedHabits] = useState([]);

  const handleCategoryClick = (categoryKey) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const handleHabitToggle = (habit, categoryKey) => {
    const habitWithCategory = { ...habit, category: categoryKey };
    const isSelected = selectedHabits.some(h => h.name === habit.name);
    
    if (isSelected) {
      setSelectedHabits(selectedHabits.filter(h => h.name !== habit.name));
    } else {
      setSelectedHabits([...selectedHabits, habitWithCategory]);
    }
  };

  const handleProceedToDashboard = () => {
    localStorage.setItem('selectedHabits', JSON.stringify(selectedHabits));
    window.location.href = '/dashboard';
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ width: '100%', height: '100vh', position: 'absolute' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Habit Tracker AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Transform your daily routines with AI-powered insights and beautiful streak tracking
            </p>
            
            <div className="flex gap-4 justify-center">
              <SignInButton mode="modal">
                <span className="btn-primary text-lg px-8 py-4 cursor-pointer inline-block">
                  Sign In
                </span>
              </SignInButton>
              <SignUpButton mode="modal">
                <span className="btn-secondary text-lg px-8 py-4 cursor-pointer inline-block">
                  Sign Up
                </span>
              </SignUpButton>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ width: '100%', height: '100vh', position: 'absolute' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.05}
          distortion={0.02}
        />
      </div>

      <header className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-cyan-400">Habit Tracker AI</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-cyan-400">Habits</span>
          </h2>
          <p className="text-xl text-gray-300">
            Select the categories that matter to you and build lasting habits
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(categories).map(([categoryKey, category]) => {
            const IconComponent = category.icon;
            const isExpanded = expandedCategory === categoryKey;
            
            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Object.keys(categories).indexOf(categoryKey) * 0.1 }}
                className="relative"
              >
                <motion.div
                  className={`glass-effect rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'scale-105' : ''
                  }`}
                  onClick={() => handleCategoryClick(categoryKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-16 h-16 rounded-full ${category.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {category.title}
                  </h3>
                  
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="text-cyan-400" size={24} />
                    </motion.div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 glass-effect rounded-xl p-4"
                    >
                      <div className="space-y-2">
                        {category.habits.map((habit) => {
                          const HabitIcon = habit.icon;
                          const isSelected = selectedHabits.some(h => h.name === habit.name);
                          
                          return (
                            <motion.button
                              key={habit.name}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleHabitToggle(habit, categoryKey)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-cyan-500/20 border-2 border-cyan-400'
                                  : 'bg-slate-800 hover:bg-slate-700'
                              }`}
                            >
                              <HabitIcon size={20} className={habit.color} />
                              <span className="text-white font-medium">{habit.name}</span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto"
                                >
                                  <X size={16} className="text-cyan-400" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {selectedHabits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Selected Habits ({selectedHabits.length})
            </h3>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {selectedHabits.map((habit) => (
                <motion.span
                  key={habit.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/30"
                >
                  {habit.name}
                </motion.span>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={handleProceedToDashboard}
                className="btn-primary text-lg px-8 py-4"
              >
                Proceed to Dashboard →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
