import React from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import Page from '../components/Page';
import { motion, Variants } from 'framer-motion';

const BINGHAMTON_LOGO = "https://media.licdn.com/dms/image/v2/C4D0BAQHZ1vB2fYuwLQ/company-logo_100_100/company-logo_100_100/0/1631327553498?e=1771459200&v=beta&t=z3BXhEjSBT7SQjVrypm6ery3fPklFDhb8aOtONK9bLk";
const ARGO_LOGO = "https://media.licdn.com/dms/image/v2/C560BAQHHdubVwwAQTQ/company-logo_100_100/company-logo_100_100/0/1657120195949/argo_ai_logo?e=1771459200&v=beta&t=aHoUs2FgGWwmR8kYYvADWus0nrvfCd9xMbEr0249YGU";

const CV: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <Page className="pt-8 max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-16 border-b border-slate-200 pb-8">
        <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Curriculum Vitae</h1>
            <p className="text-slate-500">Academic and professional background.</p>
        </div>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={PERSONAL_INFO.cvPdf} 
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-700 transition shadow-sm font-medium"
        >
          <Download size={18} /> Download PDF
        </motion.a>
      </div>

      <div className="space-y-16">
        {/* Education */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100"
          >
            Education
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-10"
          >
            {/* PhD */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900">Thomas J. Watson College, Binghamton University</h3>
                        <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">2025.01 – Now</span>
                    </div>
                    <div className="text-indigo-600 font-medium text-sm">Ph.D. Candidate in Computer Science</div>
                 </div>
            </motion.div>

            {/* Master */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900">Thomas J. Watson College, Binghamton University</h3>
                        <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">2023.08 – 2024.12</span>
                    </div>
                    <div className="text-indigo-600 font-medium text-sm">Master in Computer Science</div>
                 </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100"
          >
            Experience
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-10"
          >
            
            {/* RA 2025 */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900">Thomas J. Watson College, Binghamton University</h3>
                            <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">2025.05 – 2025.08</span>
                        </div>
                        <div className="text-indigo-600 font-medium text-sm">Research Assistant</div>
                    </div>
                    <div className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-indigo-50/30 transition-colors">
                        <p className="mb-2">- Worked on two deployment-focused projects: intelligent-disobedience for tug-guided quadruped navigation and SignGlass, a wearable egocentric ASL translation pipeline for low-latency use.</p>
                        <p>- Validated robustness and delivered demos: the quadruped validated safety under scenes, and SignGlass was hardened for motion/occlusion/lighting shifts with on-device efficiency, stable latency, and failure handling.</p>
                    </div>
                 </div>
            </motion.div>

            {/* RA 2024 */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900">Thomas J. Watson College, Binghamton University</h3>
                        <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">2024.05 – 2024.08</span>
                    </div>
                    <div className="text-indigo-600 font-medium text-sm">Research Assistant</div>
                    <div className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-indigo-50/30 transition-colors">
                        <p className="mb-2">- Worked on egocentric 3D perception and human–AI interaction projects centered on hands, sign language, and wearable sensing, including EgoSSA, EgoASL3D, and interaction-aware hand–object reconstruction.</p>
                        <p>- Built large-scale datasets and benchmarks for egocentric ASL and hand–object interaction, covering data capture, annotation workflows, versioned splits, and public evaluation protocols.</p>
                    </div>
                 </div>
            </motion.div>

            {/* Argo AI */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={ARGO_LOGO} alt="Argo AI" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900">Argo AI</h3>
                            <span className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">2022.05 – 2022.08</span>
                        </div>
                        <div className="text-indigo-600 font-medium text-sm">Software Engineer Intern (Mapping & ML Tooling)</div>
                    </div>
                    <div className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 hover:bg-indigo-50/30 transition-colors">
                        <p>- Built an internal React tool for ML mapping teams to inspect 3D data (layers, annotations, trajectories, model outputs) with interactive filtering and side-by-side comparisons. Owned the visualization and interaction stack, coordinate consistency between 2D and 3D views, and REST API integration; shipped documented deliverables and iterative demos.</p>
                    </div>
                 </div>
            </motion.div>

          </motion.div>
        </section>
      </div>
    </Page>
  );
};

export default CV;