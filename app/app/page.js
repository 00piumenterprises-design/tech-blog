'use client';

import React, { useState } from 'react';
import { Menu, X, Search, Heart, Bookmark, Share2, User, LogOut, Settings, ArrowRight } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const BlogPost = ({ post, onReadMore, onLike, onBookmark, isLiked, isBookmarked, user }) => (
  <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <span className="text-gray-400 text-sm">{post.readTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => user && onLike(post.id)}
            className={`p-2 rounded-full transition-all ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
            title={user ? "Like" : "Login to like"}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => user && onBookmark(post.id)}
            className={`p-2 rounded-full transition-all ${isBookmarked ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500'}`}
            title={user ? "Bookmark" : "Login to bookmark"}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onReadMore(post)}>
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
        </div>
        <button 
          onClick={() => onReadMore(post)}
          className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all hover:underline"
        >
          Read More <ArrowRight size={16} />
        </button>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Heart size={14} /> {post.likes}
        </span>
        <span>{post.views} views</span>
      </div>
    </div>
  </article>
);

const ArticleView = ({ article, onClose, onLike, onBookmark, isLiked, isBookmarked, user }) => (
  <div className="p-8">
    <button onClick={onClose} className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
      ← Back to articles
    </button>
    
    <div className="flex items-center gap-2 mb-4">
      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
        {article.category}
      </span>
      <span className="text-gray-500 text-sm">{article.readTime}</span>
    </div>
    
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
    
    <div className="flex items-center justify-between mb-6 pb-6 border-b">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {article.author[0]}
        </div>
        <div>
          <p className="font-medium text-gray-900">{article.author}</p>
          <p className="text-sm text-gray-500">{article.date} • {article.views} views</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => user && onLike(article.id)}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          {article.likes}
        </button>
        <button 
          onClick={() => user && onBookmark(article.id)}
          className={`p-2 rounded-lg transition-all ${isBookmarked ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-500'}`}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
        <button className="p-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </div>
    
    <div className="prose max-w-none">
      <p className="text-lg text-gray-700 leading-relaxed mb-6">{article.excerpt}</p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        {article.content}
      </p>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways</h2>
      <ul className="space-y-2 text-gray-700 mb-6 list-disc pl-6">
        <li>Understanding modern development patterns and best practices</li>
        <li>Implementing scalable solutions for production environments</li>
        <li>Optimizing performance and user experience</li>
        <li>Staying current with the latest technology trends</li>
      </ul>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="text-gray-700 leading-relaxed">
        As we continue to evolve our development practices, staying informed and adapting to new technologies remains crucial for success in the modern tech landscape.
      </p>
    </div>
  </div>
);

export default function TechBlog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable APIs with Next.js 15",
      excerpt: "Explore the latest features in Next.js 15 and learn how to build performant, scalable APIs with the new App Router and Server Components.",
      content: "Next.js 15 introduces groundbreaking features that revolutionize how we build web applications. The new App Router provides a more intuitive way to structure your application, while Server Components allow for better performance optimization. In this comprehensive guide, we'll explore best practices for API design, caching strategies, and deployment considerations that will help you build production-ready applications.",
      author: "Sarah Chen",
      date: "Oct 10, 2025",
      readTime: "8 min read",
      category: "Web Development",
      likes: 142,
      views: 2847
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt: "How artificial intelligence is transforming the way we write code, debug, and architect software systems in 2025 and beyond.",
      content: "Artificial Intelligence is fundamentally changing how we approach software development. From intelligent code completion to automated testing and bug detection, AI tools are becoming indispensable in modern development workflows. This article explores the current state of AI-assisted development and looks ahead to what the future holds for developers working alongside AI systems.",
      author: "Michael Rodriguez",
      date: "Oct 8, 2025",
      readTime: "12 min read",
      category: "AI & ML",
      likes: 289,
      views: 4521
    },
    {
      id: 3,
      title: "Mastering React Server Components",
      excerpt: "A deep dive into React Server Components, understanding the paradigm shift, and best practices for building modern React applications.",
      content: "React Server Components represent a paradigm shift in how we think about React applications. By allowing components to run exclusively on the server, we can dramatically reduce client-side JavaScript while improving performance. This guide covers everything from basic concepts to advanced patterns, helping you leverage this powerful feature in your applications.",
      author: "Emma Thompson",
      date: "Oct 5, 2025",
      readTime: "10 min read",
      category: "React",
      likes: 215,
      views: 3642
    },
    {
      id: 4,
      title: "TypeScript 5.5: What's New?",
      excerpt: "Discover the latest features and improvements in TypeScript 5.5, including enhanced type inference and new utility types.",
      content: "TypeScript 5.5 brings exciting new features that make type-safe development even more powerful and ergonomic. From improved type inference to new utility types and better performance, this release continues TypeScript's evolution as the go-to language for large-scale JavaScript applications. Learn how to leverage these new features in your projects.",
      author: "David Kim",
      date: "Oct 3, 2025",
      readTime: "6 min read",
      category: "TypeScript",
      likes: 178,
      views: 2934
    },
    {
      id: 5,
      title: "Optimizing Web Performance in 2025",
      excerpt: "Learn cutting-edge techniques for optimizing web performance, from Core Web Vitals to advanced caching strategies.",
      content: "Web performance optimization remains crucial for user experience and SEO. This comprehensive guide covers modern techniques including Core Web Vitals optimization, advanced caching strategies, image optimization, code splitting, and more. Learn how to measure, analyze, and improve your application's performance using the latest tools and best practices.",
      author: "Sarah Chen",
      date: "Sep 28, 2025",
      readTime: "15 min read",
      category: "Performance",
      likes: 312,
      views: 5123
    },
    {
      id: 6,
      title: "Docker Containers: Production Best Practices",
      excerpt: "Essential best practices for containerizing applications and deploying them to production environments with confidence.",
      content: "Containerization with Docker has become the standard for modern application deployment. This guide covers essential best practices for building, securing, and deploying Docker containers in production. From multi-stage builds to security hardening and orchestration strategies, learn how to containerize your applications effectively.",
      author: "James Wilson",
      date: "Sep 25, 2025",
      readTime: "11 min read",
      category: "DevOps",
      likes: 267,
      views: 4156
    }
  ];

  const categories = ['All', 'Web Development', 'AI & ML', 'React', 'TypeScript', 'Performance', 'DevOps'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAuth = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (authForm.email && authForm.password) {
        setUser({
          name: authForm.email.split('@')[0],
          email: authForm.email
        });
        setShowAuthModal(false);
        setAuthForm({ name: '', email: '', password: '' });
      }
    } else {
      if (authForm.name && authForm.email && authForm.password) {
        setUser({
          name: authForm.name,
          email: authForm.email
        });
        setShowAuthModal(false);
        setAuthForm({ name: '', email: '', password: '' });
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
    setLikedPosts({});
    setBookmarkedPosts({});
  };

  const handleLike = (postId) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setBookmarkedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleReadMore = (post) => {
    setSelectedArticle(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedArticle(null)}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechBlog
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <User size={18} />
                    {user.name}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <User size={16} /> Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Bookmark size={16} /> Bookmarks
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Settings size={16} /> Settings
                      </button>
                      <hr className="my-2" />
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {user ? (
                <>
                  <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                    Hello, {user.name}!
                  </div>
                  <button className="px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2 text-gray-700">
                    <User size={16} /> Profile
                  </button>
                  <button className="px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2 text-gray-700">
                    <Bookmark size={16} /> Bookmarks
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      {selectedArticle ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm">
            <ArticleView 
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
              onLike={handleLike}
              onBookmark={handleBookmark}
              isLiked={likedPosts[selectedArticle.id]}
              isBookmarked={bookmarkedPosts[selectedArticle.id]}
              user={user}
            />
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Insights & Innovations
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Exploring the latest in web development, AI, and modern software engineering
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredPosts.map((post) => (
                  <BlogPost 
                    key={post.id} 
                    post={post} 
                    onReadMore={handleReadMore}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    isLiked={likedPosts[post.id]}
                    isBookmarked={bookmarkedPosts[post.id]}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              </div>
            )}
          </section>
        </>
      )}

      {/* Auth Modal */}
      <Modal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <div className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              onClick={handleAuth}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Login"}
            </button>
          </div>
