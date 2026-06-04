import React from 'react';
import { Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import Page from '../components/Page';
import { motion, Variants } from 'framer-motion';

const BINGHAMTON_LOGO = "https://avatars.githubusercontent.com/binghamtonuniversity";

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
      <div className="flex justify-between items-center mb-16 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">Curriculum Vitae</h1>
            <p className="text-slate-500 dark:text-slate-400">Academic and professional background.</p>
        </div>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={PERSONAL_INFO.cvPdf} 
          className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-700 dark:hover:bg-white transition shadow-sm font-medium"
        >
          <Download size={18} /> Download PDF
        </motion.a>
      </div>

      <div className="space-y-16">
        {/* Summary */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800"
          >
            Summary
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm md:text-base"
          >
            <motion.p variants={itemVariants}>
              PhD researcher in Computer Science working on egocentric multimodal AI for wearable human sensing. I build first-person systems for hand perception, sign language understanding, and bimanual motion modeling, spanning data collection, representation learning, real-time inference, and user-independent evaluation. Publications include UIST, CHI, and FG.
            </motion.p>
          </motion.div>
        </section>

        {/* Education */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800"
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
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Thomas J. Watson College, Binghamton University</h3>
                        <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">2025.01 – Now</span>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Ph.D. Candidate in Computer Science</div>
                 </div>
            </motion.div>

            {/* Master */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Thomas J. Watson College, Binghamton University</h3>
                        <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">2023.08 – 2024.12</span>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Master in Computer Science</div>
                 </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Research Experience */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800"
          >
            Research Experience
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-10"
          >
            
            {/* EgoSSA */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">EgoSSA: Egocentric Stereo 3D Hand Reconstruction for ASL, IEEE FG 2026</h3>
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">Binghamton, NY</span>
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Research Assistant, Binghamton University</div>
                    </div>
                    <div className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/50 transition-colors">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Built a stereo 3D hand reconstruction framework for egocentric ASL under fast motion, self-occlusion, motion blur, and bimanual coordination.</li>
                          <li>Used geometry-aware cross-view fusion and structure-aware temporal modeling to recover fine-grained hand motion from first-person cameras.</li>
                          <li>Developed EgoStereoASL-10, a stereo egocentric ASL dataset with over 2M frames from native Deaf signers.</li>
                          <li>Achieved 18.17 mm MPJPE on HOT3D and 35.38 mm MPJPE on EgoStereoASL-10.</li>
                        </ul>
                    </div>
                 </div>
            </motion.div>

            {/* SignGlass */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">SignGlass: First-Person ASL Translation Using Wearable Glass, UIST 2025</h3>
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">Binghamton, NY</span>
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Research Assistant, Binghamton University</div>
                    </div>
                    <div className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/50 transition-colors">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Built a wearable ASL translation system with three embedded cameras capturing hands, face, and signing motion.</li>
                          <li>Implemented preprocessing, augmentation, training, and evaluation pipelines for cross-user ASL recognition and translation.</li>
                          <li>Achieved 16.98% WER and 83 BLEU-1 under leave-one-user-out evaluation.</li>
                          <li>Received UIST Special Recognition for Belonging & Inclusion.</li>
                        </ul>
                    </div>
                 </div>
            </motion.div>

            {/* Scalable ASL */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Toward Scalable ASL Education with Egocentric Sensing and LLM Feedback, CHI 2026</h3>
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">Binghamton, NY</span>
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Research Assistant, Binghamton University</div>
                    </div>
                    <div className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/50 transition-colors">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Built an egocentric ASL learning pipeline combining 3D hand reconstruction, parameter-level error detection, and LLM-based feedback.</li>
                          <li>Detected signing errors across handshape, orientation, location, and movement.</li>
                          <li>Evaluated with 15 instructors, 30 learners, and 13 Deaf participants across 230 signed trials.</li>
                        </ul>
                    </div>
                 </div>
            </motion.div>

            {/* Persistent Contact Identity */}
            <motion.div variants={itemVariants} className="flex gap-5">
                 <img src={BINGHAMTON_LOGO} alt="Binghamton University" className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0 mt-1" />
                 <div className="flex-1 space-y-2">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Persistent Contact Identity for Temporally Stable Hand-Object Interaction</h3>
                            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">Binghamton, NY</span>
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Research Assistant, Binghamton University</div>
                    </div>
                    <div className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/50 transition-colors">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Designed a test-time refinement method that treats contact identity as an explicit temporal state for hand-object reconstruction.</li>
                          <li>Reduced CSR by 9–16% and MDev by 0.35–1.2 mm across five ARCTIC baselines while preserving pose metrics within ±1%.</li>
                        </ul>
                    </div>
                 </div>
            </motion.div>

          </motion.div>
        </section>

        {/* Publications */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800"
          >
            Publications
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 text-slate-700 dark:text-slate-200"
          >
            <motion.div variants={itemVariants} className="flex gap-4">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <p>
                <b>Cai, Yongxiang</b>, et al. “SignGlass: First-Person View Comprehensive and Generalizable ASL Translation Using Wearable Glass.” UIST, 2025. Special Recognition for Belonging & Inclusion Award.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <p>
                <b>Cai, Yongxiang</b>, et al. “Toward Scalable ASL Education: Egocentric Stereo Sensing with LLM Feedback for Error-Aware Learning.” CHI, 2026.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <p>
                <b>Cai, Yongxiang</b>, et al. “EgoSSA: Egocentric Stereo Structure-Aware 3D Hand Reconstruction for American Sign Language Gesture Modeling.” IEEE FG, 2026.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Technical Skills */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs md:text-sm mt-1">Programming</div>
              <div className="md:col-span-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                Python, C/C++, Java, JavaScript, SQL
              </div>

              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs md:text-sm mt-1">ML/CV</div>
              <div className="md:col-span-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                PyTorch, multimodal learning, representation learning, transformers, egocentric vision, video understanding, 3D hand pose, stereo vision, cross-view fusion
              </div>

              <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs md:text-sm mt-1">Systems</div>
              <div className="md:col-span-3">
                Wearable sensing, on-device inference, real-time pipelines, dataset collection, user-independent evaluation, Docker, Git, Linux, OpenCV, React
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </Page>
  );
};

export default CV;