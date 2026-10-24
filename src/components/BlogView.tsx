import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
  selectedPostSlug?: string | null;
  onSelectPost: (slug: string | null) => void;
  onNavigateHome: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  posts,
  selectedPostSlug,
  onSelectPost,
  onNavigateHome
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activePost = selectedPostSlug
    ? posts.find(p => p.slug === selectedPostSlug)
    : null;

  // Filter posts by tag if any
  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags.includes(selectedTag))
    : posts;

  // All unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  if (activePost) {
    // Single Article View with Breadcrumbs, TOC, Reading time, and Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": activePost.title,
      "image": [activePost.featured_image],
      "datePublished": activePost.published_at,
      "dateModified": activePost.updated_at,
      "author": [{
        "@type": "Person",
        "name": activePost.author
      }],
      "publisher": {
        "@type": "Organization",
        "name": "DroidNest",
        "logo": {
          "@type": "ImageObject",
          "url": "https://droidnest.app/logo.png"
        }
      },
      "description": activePost.excerpt
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#657184] mb-6">
          <button onClick={onNavigateHome} className="hover:text-[#2fa5bd]">
            Home
          </button>
          <i className="fa-solid fa-chevron-right text-[9px]"></i>
          <button onClick={() => onSelectPost(null)} className="hover:text-[#2fa5bd]">
            Editorial &amp; Blog
          </button>
          <i className="fa-solid fa-chevron-right text-[9px]"></i>
          <span className="text-[#172033] font-medium truncate max-w-xs">{activePost.title}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => onSelectPost(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2fa5bd] hover:text-[#23869b]"
        >
          <i className="fa-solid fa-arrow-left text-[11px]"></i>
          Back to all articles
        </button>

        {/* Article Header */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#2fa5bd]/10 text-[#2fa5bd] border border-[#2fa5bd]/20">
              {activePost.category}
            </span>
            <span className="text-xs text-[#657184]">
              • {activePost.read_time}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
            {activePost.title}
          </h1>

          <div className="flex items-center justify-between py-3 border-y border-[#e5eaf0] text-xs text-[#657184]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2fa5bd] text-white flex items-center justify-center font-bold text-[10px]">
                DN
              </div>
              <div>
                <span className="font-semibold text-[#172033] block">{activePost.author}</span>
                <span className="text-[10px]">
                  Published {new Date(activePost.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Share controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  } catch (e) {}
                }}
                className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1 ${
                  copied 
                    ? 'bg-emerald-50 text-[#16865c] border-emerald-300' 
                    : 'bg-[#f5f7f9] hover:bg-[#e5eaf0] text-[#172033] border-[#e5eaf0]'
                }`}
                title="Copy Article Link"
              >
                <i className={`fa-solid ${copied ? 'fa-check text-[#16865c]' : 'fa-link text-[#2fa5bd]'} text-[10px]`}></i>
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-xl overflow-hidden border border-[#e5eaf0] mb-8 shadow-xs">
          <img
            src={activePost.featured_image}
            alt={activePost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-slate max-w-none text-[#172033] text-sm sm:text-base leading-relaxed space-y-4">
          {activePost.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-bold text-[#172033] mt-6 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              const code = paragraph.replace(/```(bash|sh|)/g, '').replace(/```/g, '');
              return (
                <pre key={index} className="bg-[#172033] text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{code.trim()}</code>
                </pre>
              );
            }
            return (
              <p key={index} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-[#e5eaf0]">
          <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {activePost.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#f5f7f9] text-[#172033] text-xs rounded-md border border-[#e5eaf0]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author & Editorial Disclosure */}
        <div className="mt-8 p-4 bg-[#f5f7f9] rounded-xl border border-[#e5eaf0] flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[#e5eaf0] text-[#2fa5bd] flex items-center justify-center shrink-0 text-base">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div className="text-xs text-[#657184] leading-relaxed">
            <p className="font-bold text-[#172033]">Editorial Standard Notice</p>
            <p className="mt-0.5">
              Articles published on DroidNest reflect genuine technical analysis and independent testing. We never accept payment for app rankings, ratings, or artificial promotion.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Blog Index View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#2fa5bd] uppercase tracking-wider">
          Editorial Insights
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] mt-1 tracking-tight">
          Android Guides, Security &amp; App Analysis
        </h1>
        <p className="text-xs sm:text-sm text-[#657184] mt-2">
          Practical tutorials, APK verification guides, and open-source software recommendations.
        </p>
      </div>

      {/* Tag Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            selectedTag === null
              ? 'bg-[#2fa5bd] text-white'
              : 'bg-[#f5f7f9] text-[#657184] hover:bg-[#e5eaf0] hover:text-[#172033] border border-[#e5eaf0]'
          }`}
        >
          All Topics
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-[#2fa5bd] text-white'
                : 'bg-[#f5f7f9] text-[#657184] hover:bg-[#e5eaf0] hover:text-[#172033] border border-[#e5eaf0]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post.slug)}
            className="group bg-white rounded-xl border border-[#e5eaf0] overflow-hidden hover:border-[#2fa5bd] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] w-full bg-[#f5f7f9] overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[#2fa5bd] bg-[#2fa5bd]/10 px-2 py-0.5 rounded uppercase">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-[#657184]">
                    {post.read_time}
                  </span>
                </div>

                <h2 className="text-sm font-bold text-[#172033] group-hover:text-[#2fa5bd] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-[#657184] mt-2 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between text-[11px] text-[#657184] border-t border-[#e5eaf0] mt-3">
              <span>{post.author}</span>
              <span className="font-semibold text-[#2fa5bd] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article
                <i className="fa-solid fa-arrow-right text-[9px]"></i>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
