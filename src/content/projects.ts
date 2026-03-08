export const projectsContent = {
  projects: [
    {
      id: "campusmitra",
      title: "CampusMitra",
      description:
        "A GenAI/RAG-based platform for campus assistance, leveraging vector databases and LLMs for intelligent query responses.",
      techStack: ["Python", "React", "TensorFlow", "ChromaDB", "FastAPI"],
      githubUrl: "https://github.com/Garvaansh/campusmitra",
      liveUrl: null,
      status: "live" as const,
      accent: "accent",
    },
    {
      id: "chanakyanetra",
      title: "ChanakyaNetra",
      description:
        "Graph Neural Network-based Anti-Money Laundering system for detecting suspicious transaction patterns in financial networks.",
      techStack: ["PyTorch", "NetworkX", "Docker", "PostgreSQL", "FastAPI"],
      githubUrl: "https://github.com/Garvaansh/chanakyanetra",
      liveUrl: null,
      status: "development" as const,
      accent: "wine",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio built with React 19, featuring dual themes, smooth scrolling, and optimized CDN asset delivery.",
      techStack: ["React 19", "Vite 7", "Tailwind CSS", "GSAP", "TypeScript"],
      githubUrl: "https://github.com/Garvaansh/portfolio",
      liveUrl: "https://notansh.dev",
      status: "live" as const,
      accent: "accent",
    },
    {
      id: "Image-Viewer",
      title: "Image Viewer",
      description: "A minimal Image Viewer built with C++",
      techStack: ["C++", "SDL2", "CMake"],
      githubUrl: "https://github.com/Garvaansh/Image-Viewer",
      liveUrl: null,
      status: "live" as const,
      accent: "accent",
    },
  ],
};