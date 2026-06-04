import React from 'react';
import Page from '../components/Page';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Interactive 3D Hand Tracking Viewer",
      description: "A web-based interactive tool for visualizing egocentric 3D hand poses and structural meshes in real-time, built to help researchers debug and evaluate model predictions.",
      tags: ["React", "Three.js", "WebGL"],
      imagePlaceholder: "bg-indigo-100",
      link: "#",
      github: "#"
    },
    {
      title: "ASL Gesture Translation Pipeline",
      description: "An end-to-end processing pipeline for extracting and classifying sign language gestures from stereo vision, featuring automated error-correction and LLM-driven feedback.",
      tags: ["Python", "PyTorch", "LLMs"],
      imagePlaceholder: "bg-emerald-100",
      link: "#",
      github: "#"
    }
  ];

  return (
    <Page className="pt-12 space-y-12 pb-24">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Projects</h1>
        <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed max-w-2xl">
          A selection of open-source tools, interactive systems, and side projects I've built alongside my academic research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all block group"
          >
            <div className={`h-48 w-full ${project.imagePlaceholder} dark:opacity-80 flex justify-center items-center`}>
              <span className="text-slate-400 dark:text-slate-600 font-medium">Project Preview</span>
            </div>
            
            <div className="p-6 flex flex-col flex-grow bg-white dark:bg-slate-900">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 text-xs font-semibold rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                <a href={project.github} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  <Github size={16} /> Code
                </a>
                <a href={project.link} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
};

export default Projects;