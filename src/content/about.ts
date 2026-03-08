export interface AboutScene {
  id: string;
  headline: string;
  subtext?: string;
  body?: string;
  stats?: { label: string; value: string }[];
  bgColor: string; // Animates the section background
  headlineColor: string; // Colors the giant h2
  textColor: string; // Colors the paragraphs and stats
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
      body: "My goal isn’t to collect technologies. It’s to understand them well enough to choose the right one for the job and use it properly. The starting point is always the problem, not the tool. As performance and scalability matters, I’m comfortable dropping down a level to understand what the system is actually doing under the hood.",
      // THE POP: Bright pink background, dark text
      bgColor: "var(--accent)",
      headlineColor: "var(--bg-main)",
      textColor: "var(--bg-dark)",
    },
    {
      id: "execution",
      headline: "Building for the real world.",
      body: "I like working on problems where things actually break. Messy edge cases, and systems that need to scale beyond a demo. I focus on fundamentals like data structures and algorithms to build fast, scalable software, and I test that thinking in hackathons with new problems and real constraints.",
      stats: [
        { label: "Core Focus", value: "AI/ML & Full-Stack Web-Dev" },
        { label: "Key Projects", value: "RAG-system & AML Detection" },
      ],
      // THE HANDOFF: Back to the shadows before the Portal
      bgColor: "var(--bg-dark)",
      headlineColor: "var(--soft)",
      textColor: "var(--text-secondary)",
    },
  ],
};

export default aboutContent;
