export type CvAnalysisResult = {
  languages: string[];
  skills: string[];
  score: number;
  summary: string;
};

const knownLanguages = ['dutch', 'english', 'arabic', 'turkish', 'nederlands'];
const knownSkills = [
  'recruitment',
  'logistics',
  'warehouse',
  'customer service',
  'operations',
  'sales',
  'administration',
  'management',
];

export function analyzeCv(cvText: string): CvAnalysisResult {
  const normalized = cvText.toLowerCase();

  const languages = knownLanguages.filter((lang) => normalized.includes(lang));
  const skills = knownSkills.filter((skill) => normalized.includes(skill));
  const score = Math.min(100, 40 + skills.length * 10 + languages.length * 8);

  return {
    languages,
    skills,
    score,
    summary: `Detected ${skills.length} relevant skills and ${languages.length} language markers.`,
  };
}
