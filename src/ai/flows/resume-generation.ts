// src/ai/flows/resume-generation.ts
'use server';
/**
 * @fileOverview A resume generation AI agent.
 *
 * - generateResume - A function that handles the resume generation process.
 * - ResumeGenerationInput - The input type for the generateResume function.
 * - ResumeGenerationOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeGenerationInputSchema = z.object({
  profile: z.object({
    name: z.string().describe('The name of the user.'),
    email: z.string().email().describe('The email address of the user.'),
    phone: z.string().describe('The phone number of the user.'),
    linkedin: z.string().url().describe('The LinkedIn profile URL of the user.'),
    github: z.string().url().describe('The GitHub profile URL of the user.'),
    skills: z.array(z.string()).describe('A list of skills the user possesses.'),
    experience: z.array(
      z.object({
        title: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        startDate: z.string().describe('The start date of the job.'),
        endDate: z
          .string()
          .describe('The end date of the job, or "Present" if currently employed.'),
        description: z.string().describe('A description of the job responsibilities.'),
      })
    ).describe('A list of the user\'s work experience.'),
    projects: z.array(
      z.object({
        name: z.string().describe('The name of the project.'),
        description: z.string().describe('A description of the project.'),
        link: z.string().url().describe('A link to the project.'),
        technologies: z.array(z.string()).describe('A list of technologies used in the project.'),
      })
    ).describe('A list of the user\'s projects.'),
    education: z.array(
      z.object({
        institution: z.string().describe('The name of the educational institution.'),
        degree: z.string().describe('The degree obtained.'),
        startDate: z.string().describe('The start date of the education.'),
        endDate: z.string().describe('The end date of the education.'),
        description: z.string().describe('A description of the education.'),
      })
    ).describe('A list of the user\'s education.'),
  }).describe('The profile information of the user.'),
  jobDescription: z.string().describe('The description of the target job.'),
});
export type ResumeGenerationInput = z.infer<typeof ResumeGenerationInputSchema>;

const ResumeGenerationOutputSchema = z.object({
  resume: z.string().describe('The generated resume in markdown format.'),
});
export type ResumeGenerationOutput = z.infer<typeof ResumeGenerationOutputSchema>;

export async function generateResume(input: ResumeGenerationInput): Promise<ResumeGenerationOutput> {
  return resumeGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeGenerationPrompt',
  input: {schema: ResumeGenerationInputSchema},
  output: {schema: ResumeGenerationOutputSchema},
  prompt: `You are a resume writing expert. You will generate a resume for the user based on their profile information and the target job description.

Profile Information:
Name: {{{profile.name}}}
Email: {{{profile.email}}}
Phone: {{{profile.phone}}}
LinkedIn: {{{profile.linkedin}}}
GitHub: {{{profile.github}}}
Skills: {{#each profile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Experience:
{{#each profile.experience}}
Title: {{{title}}}
Company: {{{company}}}
Dates: {{{startDate}}} - {{{endDate}}}
Description: {{{description}}}
{{/each}}

Projects:
{{#each profile.projects}}
Name: {{{name}}}
Description: {{{description}}}
Link: {{{link}}}
Technologies: {{#each technologies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Education:
{{#each profile.education}}
Institution: {{{institution}}}
Degree: {{{degree}}}
Dates: {{{startDate}}} - {{{endDate}}}
Description: {{{description}}}
{{/each}}

Target Job Description: {{{jobDescription}}}


Based on the above information, create a resume for the user. The resume should be tailored to the target job description. Highlight the skills and experiences that are most relevant to the target job description.

Format the resume in markdown.
`,
});

const resumeGenerationFlow = ai.defineFlow(
  {
    name: 'resumeGenerationFlow',
    inputSchema: ResumeGenerationInputSchema,
    outputSchema: ResumeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

