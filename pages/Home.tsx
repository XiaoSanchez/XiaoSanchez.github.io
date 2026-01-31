import React from 'react';
import { Mail, FileText, Github, GraduationCap, ArrowRight, Info, Globe, Hourglass } from 'lucide-react';
import { PERSONAL_INFO, RESEARCH_INTERESTS, PUBLICATIONS, NEWS } from '../constants';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import Page from '../components/Page';

const Home: React.FC = () => {
  const selectedPubs = PUBLICATIONS.slice(0, 6);
  const recentNews = NEWS.slice(0, 5);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <Page className="space-y-24 pb-24">
      {/* 3.1 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 pt-16 md:pt-24"
      >
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-xl text-slate-600 font-medium">{PERSONAL_INFO.title}</p>
            <p className="text-lg text-slate-500">{PERSONAL_INFO.affiliation}</p>
          </div>
          
          <div className="space-y-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
            <p className="font-bold text-slate-900">{PERSONAL_INFO.researchFocus}</p>
            <p className="font-medium text-slate-800">{PERSONAL_INFO.researchOneLiner}.</p>
            <p className="text-slate-600">{PERSONAL_INFO.bio}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: 'CV', icon: FileText, href: PERSONAL_INFO.cvPdf, primary: true },
              { label: 'Email', icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, primary: false },
              { label: 'Scholar', icon: GraduationCap, href: PERSONAL_INFO.scholar, primary: false },
              { label: 'GitHub', icon: Github, href: PERSONAL_INFO.github, primary: false },
            ].map((btn) => (
              <motion.a 
                key={btn.label}
                href={btn.href} 
                target={btn.label !== 'Email' && btn.label !== 'CV' ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition font-medium shadow-sm ${
                  btn.primary 
                    ? 'bg-slate-900 text-white hover:bg-indigo-600' 
                    : 'border border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600'
                }`}
              >
                <btn.icon size={18} /> {btn.label}
              </motion.a>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative group"
        >
          <div className="absolute inset-0 bg-indigo-600 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
          <img 
            src="https://media.licdn.com/dms/image/v2/D4E03AQFdWba2FJvDVA/profile-displayphoto-crop_800_800/B4EZwVgn7fG0AI-/0/1769887400206?e=1771459200&v=beta&t=ZVUg8EQw957ds9yDfwyNK_a-dlUpANbI364nUicoTl8" 
            alt="Yongxiang Cai" 
            className="w-full h-full object-cover rounded-full shadow-lg border border-slate-100 relative z-10"
          />
        </motion.div>
      </motion.section>

      {/* Contact / Internship Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-slate-50 border border-slate-100 rounded-xl p-6 flex gap-4 items-start"
      >
         <Info className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
         <div>
             <h3 className="font-bold text-slate-900 mb-2">For Internship Opportunities</h3>
             <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                 I am seeking a research internship focused on HCI and Human-Centered AI. My research explores interpretability and user control for multimodal 3D perception of hands and motion, including how explanations, uncertainty, and interaction design affect user decisions and model reliability. Please <a href={`mailto:${PERSONAL_INFO.email}`} className="text-indigo-600 underline font-medium hover:text-indigo-800">email me</a> with your project area, timeline, and any relevant links.
             </p>
         </div>
      </motion.section>

      {/* 3.2 Recent News */}
      {recentNews.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex justify-between items-baseline mb-8 pb-3 border-b border-slate-100">
             <h2 className="text-2xl font-bold text-slate-900">Recent News</h2>
          </div>
          <div className="space-y-4">
             {recentNews.map(news => (
               <motion.div 
                 key={news.id} 
                 variants={itemVariants}
                 className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 text-sm group p-3 rounded-lg hover:bg-slate-50 transition -mx-3"
               >
                 <span className="text-slate-400 font-mono font-medium md:w-24 flex-shrink-0 md:text-right group-hover:text-indigo-600 transition-colors">{news.date}</span>
                 <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{news.content}</span>
               </motion.div>
             ))}
          </div>
        </motion.section>
      )}

      {/* 3.3 Research Interests */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-3 border-b border-slate-100">Research Interests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_INTERESTS.map((interest, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition"
            >
              <h3 className="font-bold text-slate-900 text-lg">{interest.title}</h3>
              <p className="text-slate-600 mt-2 leading-relaxed">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3.4 Selected Publications */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex justify-between items-baseline mb-8 pb-3 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">Selected Publications</h2>
          <Link to="/publications" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition group">
            View All <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={16} /></motion.span>
          </Link>
        </div>
        <div className="space-y-8">
          {selectedPubs.map(pub => (
            <motion.div key={pub.id} variants={itemVariants}>
              <div className="flex justify-between items-baseline">
                <a href={pub.links.website || pub.links.pdf || '#'} className="font-semibold text-lg text-slate-900 hover:text-indigo-600 transition">
                  {pub.title}
                </a>
              </div>
              <div className="text-slate-600 mt-1">
                {pub.authors.map((author, i) => (
                  <span key={i} className={author.includes("Yongxiang") ? "font-bold text-slate-900" : ""}>
                    {author}{i < pub.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm mt-2">
                <span className="font-medium text-slate-900 flex items-center gap-1.5">
                   {pub.venue === 'In Submission' && <Hourglass size={14} className="text-amber-500" />}
                   {pub.venue} {pub.year}
                </span>
                {Object.keys(pub.links).length > 0 && <span className="text-slate-300">|</span>}
                <div className="flex gap-3">
                  {Object.entries(pub.links).map(([key, url]) => (
                     url && <a key={key} href={url} className="text-slate-500 hover:text-indigo-600 capitalize font-medium transition flex items-center gap-1">
                        {key === 'pdf' && <FileText size={14} />}
                        {key === 'website' && <Globe size={14} />}
                        {key}
                     </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Page>
  );
};

export default Home;