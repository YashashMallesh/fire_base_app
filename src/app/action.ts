"use server";

import { getPersonalizedStyleSuggestions, StyleSuggestionInput, StyleSuggestionOutput } from '@/ai/flows/personalized-style-suggestions';

type ActionResponse = 
  | { success: true; data: StyleSuggestionOutput }
  | { success: false; error: string };

export async function generateStyleSuggestions(input: StyleSuggestionInput): Promise<ActionResponse> {
  try {
    const result = await getPersonalizedStyleSuggestions(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate AI suggestions. Please try again later." };
  }
}
