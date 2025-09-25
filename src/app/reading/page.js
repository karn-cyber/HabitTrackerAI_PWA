'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Pause, RefreshCw, ExternalLink, Filter } from 'lucide-react';
import LightRays from '../../components/LightRays';
import Image from 'next/image';

export default function Reading() {
  const { user } = useUser();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [completedReading, setCompletedReading] = useState(false);
  
  // News API integration
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [error, setError] = useState(null);

  const categories = [
    { id: 'general', name: 'General', color: 'bg-blue-500' },
    { id: 'technology', name: 'Technology', color: 'bg-orange-500' },
    { id: 'business', name: 'Business', color: 'bg-green-500' },
    { id: 'health', name: 'Health', color: 'bg-purple-500' },
    { id: 'science', name: 'Science', color: 'bg-cyan-500' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-pink-500' },
    { id: 'sports', name: 'Sports', color: 'bg-yellow-500' }
  ];

  // Fetch news articles
  const fetchNews = async (category = 'general') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/news?category=${category}&pageSize=12`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setArticles(data.articles);
      } else {
        setError('Failed to load news articles');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Network error: Unable to load articles');
    } finally {
      setLoading(false);
    }
  };

  // Load articles on component mount and category change
  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  // Reading timer effect
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
                Today&apos;s <span className="text-cyan-400">News & Articles</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Stay informed with the latest news - Select an article to start your 10-minute reading session
              </p>
              
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-cyan-500 text-white shadow-lg'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${category.color}`} />
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={() => fetchNews(selectedCategory)}
                className="btn-secondary flex items-center gap-2 mx-auto"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh News'}
              </button>
            </motion.div>

            {error && (
              <div className="glass-effect rounded-xl p-6 mb-6 border-red-500/50">
                <p className="text-red-400 text-center">{error}</p>
                <button
                  onClick={() => fetchNews(selectedCategory)}
                  className="btn-primary mx-auto mt-4 block"
                >
                  Try Again
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6 animate-pulse">
                    <div className="bg-slate-700 h-48 rounded-lg mb-4"></div>
                    <div className="bg-slate-700 h-4 rounded mb-2"></div>
                    <div className="bg-slate-700 h-3 rounded mb-4"></div>
                    <div className="bg-slate-700 h-3 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-xl overflow-hidden cursor-pointer hover:bg-slate-800/50 transition-all duration-300 group"
                    onClick={() => startReading(article)}
                  >
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback to a gradient background if image fails
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback gradient */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 hidden"
                        style={{ display: 'none' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          categories.find(cat => cat.id === selectedCategory)?.color || 'bg-blue-500'
                        } text-white`}>
                          {selectedCategory.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{article.source.name}</span>
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="text-cyan-400" size={16} />
                          <span className="text-cyan-400 text-sm">Start Reading</span>
                        </div>
                        <ExternalLink className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Article Content */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-xl overflow-hidden max-w-4xl mx-auto"
          >
            {/* Article Header */}
            <div className="relative h-64 md:h-80">
              <Image
                src={selectedArticle.urlToImage}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
                onError={(e) => {
                  // Fallback to gradient background if image fails
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              {/* Fallback gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hidden items-center justify-center"
                style={{ display: 'none' }}
              >
                <BookOpen size={48} className="text-slate-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Articles
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    categories.find(cat => cat.id === selectedCategory)?.color || 'bg-blue-500'
                  } text-white`}>
                    {selectedCategory.toUpperCase()}
                  </div>
                  <span className="text-white/80 text-sm">
                    {selectedArticle.source.name}
                  </span>
                  <span className="text-white/60 text-sm">
                    {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedArticle.title}
                </h1>
                {selectedArticle.author && (
                  <p className="text-white/80">
                    By {selectedArticle.author}
                  </p>
                )}
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              {/* Article Description */}
              <div className="prose prose-invert prose-lg max-w-none mb-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {selectedArticle.description}
                </p>
              </div>
              
              {/* Article Content */}
              {selectedArticle.content && selectedArticle.content !== '[Removed]' ? (
                <div className="prose prose-invert max-w-none mb-6">
                  <div className="text-gray-300 leading-relaxed text-lg">
                    {/* Remove the [+chars] part from News API content */}
                    {selectedArticle.content.replace(/\[\+\d+\s*chars\]$/, '...')}
                  </div>
                </div>
              ) : null}
              
              {/* External Link */}
              <div className="border-t border-gray-700 pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    Continue reading the full article on {selectedArticle.source.name}
                  </p>
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    Read Full Article
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              {/* Reading Progress Footer */}
              <div className="border-t border-gray-700 pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${completedReading ? 'bg-green-500/20' : 'bg-cyan-500/20'}`}>
                      {completedReading ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : (
                        <Clock className="text-cyan-400" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Reading Time: {formatTime(readingTime)} / 10:00
                      </p>
                      <p className="text-gray-400 text-sm">
                        {completedReading ? 'Daily reading completed!' : 'Keep reading to reach your goal'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleReading}
                    className="btn-secondary flex items-center gap-2"
                  >
                    {isReading ? <Pause size={16} /> : <Play size={16} />}
                    {isReading ? 'Pause' : 'Resume'}
                  </button>
                </div>
                
                <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      completedReading ? 'bg-green-400' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${Math.min((readingTime / 600) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
