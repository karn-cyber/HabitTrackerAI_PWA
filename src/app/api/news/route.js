import { NextResponse } from 'next/server';

const NEWS_API_KEY = 'b62047fd97994db6a37c6e98fda606bd';
const NEWS_API_URL = 'https://newsapi.org/v2';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const country = searchParams.get('country') || 'us';
    const pageSize = searchParams.get('pageSize') || '20';
    
    // Fetch top headlines with images
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
      {
        headers: {
          'User-Agent': 'HabitTrackerAI/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter articles to only include those with images and sufficient content
    const articlesWithImages = data.articles.filter(article => 
      article.urlToImage && 
      article.title && 
      article.description && 
      article.content &&
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    );
    
    return NextResponse.json({
      status: 'success',
      totalResults: articlesWithImages.length,
      articles: articlesWithImages
    });
    
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// Alternative endpoint for everything endpoint (more flexible search)
export async function POST(request) {
  try {
    const { query, sortBy = 'publishedAt', language = 'en', pageSize = 20 } = await request.json();
    
    const response = await fetch(
      `${NEWS_API_URL}/everything?q=${encodeURIComponent(query)}&sortBy=${sortBy}&language=${language}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
      {
        headers: {
          'User-Agent': 'HabitTrackerAI/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter articles to only include those with images
    const articlesWithImages = data.articles.filter(article => 
      article.urlToImage && 
      article.title && 
      article.description &&
      article.title !== '[Removed]' &&
      article.description !== '[Removed]'
    );
    
    return NextResponse.json({
      status: 'success',
      totalResults: articlesWithImages.length,
      articles: articlesWithImages
    });
    
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
