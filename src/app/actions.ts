"use server";

import { generateResume, ResumeGenerationInput } from "@/ai/flows/resume-generation";
import { portfolioData } from "@/lib/data";

export async function generateResumeAction(jobDescription: string) {
  try {
    const profileInput: ResumeGenerationInput = {
      profile: {
        ...portfolioData.profile,
        // The AI flow expects skills as an array of strings, not objects.
        skills: portfolioData.profile.skills.map(skill => skill.name),
      },
      jobDescription,
    };

    const result = await generateResume(profileInput);

    return { success: true, data: result.resume };
  } catch (error) {
    console.error("Error generating resume:", error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}
