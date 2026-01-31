import { Publication, NewsItem, ResearchInterest } from './types';

export const PERSONAL_INFO = {
  name: "Yongxiang Cai",
  title: "Ph.D. Candidate, Computer Science",
  affiliation: "Binghamton University",
  researchFocus: "Human-Computer Interaction and Human-Centered AI",
  researchOneLiner: "Interpretable, controllable multimodal 3D perception for hands and human motion",
  bio: "I study how to make multimodal 3D perception models understandable and actionable in interactive settings, and how interface design changes what “good performance” means.",
  email: "ycai3@binghamton.edu",
  github: "https://github.com/YX-CAI-BU",
  scholar: "https://scholar.google.com/citations?user=i5rtqhoAAAAJ",
  orcid: "https://orcid.org/0009-0002-4061-0308",
  cvPdf: "/path/to/cv.pdf"
};

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    title: "Human-Centered AI for 3D Hands and Motion",
    description: "Interpretable and controllable multimodal perception for interactive systems."
  },
  {
    title: "Interactive Evaluation of Perception Models",
    description: "Task-driven metrics, failure modes, and user-centered study designs."
  },
  {
    title: "User Control and Model Feedback Loops",
    description: "Interfaces for steering, debugging, and repairing model predictions."
  },
  {
    title: "Robust Multimodal 3D Understanding",
    description: "Calibration-aware geometry, temporal consistency, and uncertainty estimation."
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "chi2026",
    title: "Toward Scalable ASL Education: Egocentric Stereo Sensing with LLM Feedback for Error-Aware Learning",
    authors: ["Yongxiang Cai*", "Zhenghao Li*", "Taiting Lu", "Yanjun Zhu", "Yi-Shan Wu", "Qingsen Zhang", "Xuhai Xu", "Zhanpeng Jin", "Mahanth Gowda", "Yincheng Jin"],
    venue: "CHI",
    year: 2026,
    links: {},
    takeaway: "First egocentric ASL learning system integrating stereo vision and LLM-driven feedback for error-aware learning.",
    featured: true
  },
  {
    id: "signglass",
    title: "SignGlass: First-Person View Comprehensive and Generalizable ASL Translation Using Wearable Glass",
    authors: ["Yongxiang Cai", "Taiting Lu", "Zhenghao Li", "Hao Zhou", "Kenneth DeHaan", "Xuhai Xu", "Mahanth Gowda", "Yincheng Jin"],
    venue: "UIST",
    year: 2025,
    links: { website: "https://dl.acm.org/doi/10.1145/3746059.3747782" },
    takeaway: "First egocentric SLT system using smart glasses with real-time feedback.",
    featured: true
  },
  {
    id: "egoasl3d",
    title: "EgoASL3D: A Large-Scale Egocentric Stereo Dataset for American Sign Language (ASL) Translation and 3D Hand Reconstruction",
    authors: ["Zhenghao Li", "Yanjun Zhu", "Yongxiang Cai", "Qingsen Zhang", "Yi-Shan Wu", "Taiting Lu", "Daniel Krutz", "Kenneth. J. DeHaan", "Lijun Yin", "Mahanth Gowda", "Yincheng Jin"],
    venue: "In Submission",
    year: 2026,
    links: {},
    takeaway: "Largest multimodal dataset for egocentric sign language recognition.",
    featured: true
  },
  {
    id: "egossa",
    title: "EgoSSA: Egocentric Stereo Structure-Aware 3D Hand Reconstruction for American Sign Language Gesture Modeling",
    authors: ["Yongxiang Cai", "Zhenghao Li", "Yanjun Zhu", "Taiting Lu", "Kenneth. J. DeHaan", "Lijun Yin", "Mahanth Gowda", "Yincheng Jin"],
    venue: "In Submission",
    year: 2025,
    links: {},
    takeaway: "Structure-aware 3D hand reconstruction for ASL gestures.",
    featured: true
  }
];

export const NEWS: NewsItem[] = [
  { id: "n1", date: "Jan 2026", content: "CHI 2026 acceptance (first author)." },
  { id: "n2", date: "Oct 2025", content: "UIST 2025 Special Recognition for Belonging & Inclusion Award." },
  { id: "n3", date: "Apr 2025", content: "UIST 2025 acceptance (first author)." }
];