export interface Project {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}
