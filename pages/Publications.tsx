import React from 'react';
import { PUBLICATIONS, PERSONAL_INFO } from '../constants';
import { ExternalLink, FileText, Globe, Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';
import Page from '../components/Page';

const Publications: React.FC = () => {
  // Group by year
  const groupedPubs = PUBLICATIONS.reduce((acc, pub) => {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {} as Record<number, typeof PUBLICATIONS>);

  const years = Object.keys(groupedPubs).map(Number).sort((a, b) => b - a);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <Page className="pt-12 space-y-16 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-slate-100 pb-8">
        <div>
           <h1 className="text-4xl font-bold text-slate-900 mb-2">Publications</h1>
           <p className="text-slate-500">Selected papers and conference proceedings.</p>
        </div>
        <div className="flex gap-3">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={PERSONAL_INFO.scholar} target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition bg-white"
          >
             Google Scholar <ExternalLink size={14}/>
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={PERSONAL_INFO.orcid} target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition bg-white"
          >
             ORCID <ExternalLink size={14}/>
          </motion.a>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {years.map(year => (
          <motion.div key={year} variants={itemVariants} className="flex flex-col md:flex-row gap-8 md:gap-16">
             <div className="md:w-24 flex-shrink-0">
               <span className="inline-block text-xl font-bold text-slate-300 font-mono sticky top-24">{year}</span>
             </div>
            
            <div className="flex-1 space-y-10">
              {groupedPubs[year].map(pub => (
                <div key={pub.id} className="group">
                  <a href={pub.links.pdf || pub.links.website || '#'} className="text-lg font-bold text-slate-900 hover:text-indigo-600 block mb-2 transition-colors leading-snug">
                    {pub.title}
                  </a>
                  
                  <div className="text-slate-700 mb-2">
                     {pub.authors.map((author, i) => (
                      <span key={i} className={author.includes("Yongxiang") ? "font-bold text-slate-900" : ""}>
                        {author}{i < pub.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-3">
                     <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        {pub.venue === 'In Submission' && <Hourglass size={14} className="text-amber-500" />}
                        {pub.venue}
                     </span>
                     {Object.entries(pub.links).map(([key, url]) => (
                       url && <a key={key} href={url} className="text-indigo-600 hover:text-indigo-800 font-medium capitalize flex items-center gap-1">
                          {key === 'pdf' && <FileText size={14}/>}
                          {key === 'website' && <Globe size={14}/>}
                          {key}
                       </a>
                     ))}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700 mr-1">TL;DR:</span>
                    {pub.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Page>
  );
};

export default Publications;