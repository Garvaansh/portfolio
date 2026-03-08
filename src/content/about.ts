export interface AboutScene {
  id: string;
  headline: string;
  subtext?: string;
  body?: string;
  stats?: { label: string; value: string }[];
  bgColor: string;       // Animates the section background
  headlineColor: string; // Colors the giant h2
  textColor: string;     // Colors the paragraphs and stats
}

export const aboutContent: { scenes: AboutScene[] } = {
  scenes: [
    {
      id: "intro",
      headline: "Hi, I'm Garvaansh.",
      subtext: "CS Student & Software Developer.",
      body: "Currently pursuing my UnderGrad degree, I spend my time figuring out how to make computers do interesting things. My focus is on full-stack web development and AI/ML, aiming to write code that doesn't just compile, but actually solves problems.",
      bgColor: "var(--bg-main)",
      headlineColor: "var(--soft)",
      textColor: "var(--text-secondary)",
    },
    {
      id: "engineering",
      headline: "Engineering across the stack.",
      body: "I don't box myself into one language. Whether I'm building a multilingual RAG backend for CampusMitra, training Graph Neural Networks, or writing a custom PPM image viewer in C++ from scratch, I grab the right tool for the job.",
      // THE POP: Bright pink background, dark text
      bgColor: "var(--accent)", 
      headlineColor: "var(--bg-main)", 
      textColor: "var(--bg-dark)",
    },
    {
      id: "execution",
      headline: "Building for the real world.",
      body: "I treat every project as an excuse to dive into the deep end. From tackling Kaggle datasets to late-night debugging sessions, I'm constantly grinding Data Structures and Algorithms to write more efficient, scalable logic.",
      stats: [
        { label: "Core Focus", value: "AI/ML & Full-Stack Web-Dev" },
        { label: "Key Projects", value: "RAG-system & AML Detection" },
        { label: "Low-Level", value: "Modern C++ & DSA" },
      ],
      // THE HANDOFF: Back to the shadows before the Portal
      bgColor: "var(--bg-dark)", 
      headlineColor: "var(--soft)", 
      textColor: "var(--text-secondary)",
    },
  ],
};

export default aboutContent;