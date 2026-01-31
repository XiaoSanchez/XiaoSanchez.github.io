import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, Sparkles, Globe, Loader2 } from 'lucide-react';
import { PUBLICATIONS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { searchWithGemini, SearchResult } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'local' | 'ai'>('local');
  const [aiResult, setAiResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset state when closing or switching modes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSearchMode('local');
      setAiResult(null);
      setError(null);
    }
  }, [isOpen]);
  
  useEffect(() => {
    setAiResult(null);
    setError(null);
    setIsLoading(false);
  }, [searchMode]);

  if (!isOpen) return null;

  const handleLocalNavigate = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  const handleAiSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const result = await searchWithGemini(query);
      setAiResult(result);
    } catch (err) {
      setError("Unable to complete the search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchMode === 'ai') {
      handleAiSearch();
    }
  };

  // Local filtering
  const lowerQuery = query.toLowerCase();
  const filteredPubs = query && searchMode === 'local' ? PUBLICATIONS.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.venue.toLowerCase().includes(lowerQuery) ||
    p.authors.some(a => a.toLowerCase().includes(lowerQuery)) ||
    p.takeaway.toLowerCase().includes(lowerQuery)
  ) : [];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Mode Toggle */}
        <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50/50">
          <button
            onClick={() => setSearchMode('local')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              searchMode === 'local' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Search size={16} /> Site Search
          </button>
          <button
            onClick={() => setSearchMode('ai')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              searchMode === 'ai' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles size={16} className={searchMode === 'ai' ? 'text-indigo-600' : ''} /> Ask AI
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center border-b border-slate-100 p-4 gap-3 bg-white">
          {searchMode === 'ai' ? (
             <Sparkles className="text-indigo-500 animate-pulse" size={20} />
          ) : (
             <Search className="text-slate-400" size={20} />
          )}
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={searchMode === 'ai' ? "Ask a question about my research..." : "Search publications..."}
            className="flex-1 text-lg outline-none text-slate-900 placeholder:text-slate-400 bg-transparent"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-md transition">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 min-h-[300px] bg-slate-50/30">
          
          {/* LOCAL SEARCH MODE */}
          {searchMode === 'local' && (
            <>
              {!query && (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Type to search across {PUBLICATIONS.length} publications.
                </div>
              )}

              {query && filteredPubs.length === 0 && (
                 <div className="py-12 text-center text-slate-500">
                   No results found for "{query}".
                 </div>
              )}

              {filteredPubs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Publications</h3>
                  <div className="space-y-2">
                    {filteredPubs.map(pub => (
                      <button 
                        key={pub.id}
                        onClick={() => handleLocalNavigate('/publications')}
                        className="w-full text-left p-4 bg-white hover:bg-indigo-50/50 hover:border-indigo-100 border border-transparent rounded-xl flex items-start gap-4 group transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                           <FileText className="text-slate-500 group-hover:text-indigo-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{pub.title}</div>
                          <div className="text-sm text-slate-500 mt-1">{pub.venue} {pub.year}</div>
                        </div>
                        <ArrowRight className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity self-center" size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* AI SEARCH MODE */}
          {searchMode === 'ai' && (
            <div className="space-y-6">
              {!query && !isLoading && !aiResult && (
                 <div className="py-12 text-center text-slate-400">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 mb-4">
                     <Sparkles size={24} />
                   </div>
                   <p className="text-sm font-medium text-slate-600">Powered by Gemini & Google Search</p>
                   <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Ask about research topics, recent findings, or specific papers. I'll search the web for the latest info.</p>
                 </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="animate-spin text-indigo-600" size={32} />
                  <p className="text-slate-500 animate-pulse font-medium">Researching...</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
                  {error}
                </div>
              )}

              {aiResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles size={12} /> AI Answer
                    </h3>
                    <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {aiResult.text}
                    </div>
                  </div>

                  {aiResult.sources.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Sources</h3>
                      <div className="grid gap-2">
                        {aiResult.sources.map((source, idx) => (
                          <a 
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg hover:border-indigo-200 hover:shadow-sm transition-all group"
                          >
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 transition-colors">
                              <Globe size={14} className="text-slate-400 group-hover:text-indigo-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-slate-900 truncate group-hover:text-indigo-700">{source.title}</div>
                              <div className="text-xs text-slate-400 truncate">{source.uri}</div>
                            </div>
                            <ExternalLinkIcon />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-3 text-xs text-center text-slate-400 border-t border-slate-100 flex justify-between px-6">
          <span>{searchMode === 'ai' ? 'Press Enter to ask' : 'Type to filter'}</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default SearchModal;