import React from 'react';
import { Mail, MapPin, Github, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import Page from '../components/Page';

const Contact: React.FC = () => {
  return (
    <Page className="pt-12 space-y-12 pb-24 max-w-3xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Contact</h1>
        <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
          I'm always open to discussing research collaborations, internship opportunities, or just having a chat about HCI and 3D perception. 
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 space-y-8">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <Mail className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Email</h3>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <MapPin className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Office</h3>
              <p className="text-slate-600 dark:text-slate-200">{PERSONAL_INFO.affiliation}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Connect Online</h3>
          <div className="flex flex-col sm:flex-row gap-4">
             <a href={PERSONAL_INFO.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group w-full sm:w-auto">
               <GraduationCap size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
               <span className="font-medium text-slate-900 dark:text-slate-100">Google Scholar</span>
             </a>
             <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group w-full sm:w-auto">
               <Github size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
               <span className="font-medium text-slate-900 dark:text-slate-100">GitHub</span>
             </a>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contact;