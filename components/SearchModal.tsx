import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { PUBLICATIONS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
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

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase();

  const filteredPubs = query ? PUBLICATIONS.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.venue.toLowerCase().includes(lowerQuery) ||
    p.authors.some(a => a.toLowerCase().includes(lowerQuery)) ||
    p.takeaway.toLowerCase().includes(lowerQuery)
  ) : [];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-slate-100 p-4 gap-3">
          <Search className="text-slate-400" size={20} />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications..."
            className="flex-1 text-lg outline-none text-slate-900 placeholder:text-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query && (
            <div className="p-8 text-center text-slate-400 text-sm">
              Type to search across {PUBLICATIONS.length} publications.
            </div>
          )}

          {query && filteredPubs.length === 0 && (
             <div className="p-8 text-center text-slate-500">
               No results found for "{query}".
             </div>
          )}

          {filteredPubs.length > 0 && (
            <div className="space-y-6 p-2">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Publications</h3>
                <div className="space-y-1">
                  {filteredPubs.map(pub => (
                    <button 
                      key={pub.id}
                      onClick={() => handleNavigate('/publications')}
                      className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex items-start gap-3 group transition-colors"
                    >
                      <FileText className="text-slate-400 mt-0.5 group-hover:text-indigo-600" size={18} />
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600">{pub.title}</div>
                        <div className="text-sm text-slate-500">{pub.venue} {pub.year}</div>
                      </div>
                      <ArrowRight className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-2 text-xs text-center text-slate-400 border-t border-slate-100">
          Press ESC to close
        </div>
      </div>
    </div>
  );
};

export default SearchModal;