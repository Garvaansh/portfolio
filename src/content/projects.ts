export const projectsContent = {
  projects: [
    {
      id: "campusmitra",
      title: "CampusMitra",
      description:
        "An AI campus assistant built on a RAG architecture. It retrieves specific campus data to give students accurate, context-aware answers instead of generic LLM hallucinations.",
      techStack: ["RAG", "Gen-AI", "VectorDB"],
      githubUrl: "https://github.com/Garvaansh/campusmitra",
      liveUrl: null,
      status: "live" as const,
      accent: "accent",
    },
    {
      id: "chanakyanetra",
      title: "ChanakyaNetra",
      description:
        "An anti-money laundering model that maps out financial datasets using Graph Neural Networks to hunt down hidden, suspicious transaction patterns.",
      techStack: ["PyTorch", "NetworkX", "Graph Neural Networks"],
      githubUrl: "https://github.com/Garvaansh/chanakyanetra",
      liveUrl: null,
      status: "development" as const,
      accent: "wine",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description:
        "My personal sandbox. A highly interactive web experience built with React and GSAP, focused on fluid scroll animations and custom WebGL rendering.",
      techStack: ["React 19", "GSAP", "WebGL"],
      githubUrl: "https://github.com/Garvaansh/portfolio",
      liveUrl: "https://notansh.is-a.dev",
      status: "live" as const,
      accent: "accent",
    },
    {
      id: "Image-Viewer",
      title: "Image Viewer",
      description:
        "A custom image viewer built entirely from scratch. This was a deep dive into modern C++ and handling pixel rendering directly with SDL2.",
      techStack: ["C++", "SDL2", "CMake"],
      githubUrl: "https://github.com/Garvaansh/Image-Viewer",
      liveUrl: null,
      status: "live" as const,
      accent: "accent",
    },
  ],
};
