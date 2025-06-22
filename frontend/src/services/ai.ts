import axios from "axios";
import type {
    CheckDescriptionProps,
    CheckEssayProps,
    CheckTranslationProps,
    DefaultPropsForGeneration,
} from "../types";

axios.defaults.withCredentials = true;

export const generate = (text: string) => {
    return axios.get("api/ai/generate", { params: { text: text } });
};

export const generateText = (props: DefaultPropsForGeneration) => {
    return generate(
        `Generate a text for translation practice based on my preferences below. 
            The information is listed in priority order (1 = highest priority) (general prompt, aka preferences
            has the highest priority!!!:
            1. Preferences: ${props.generalPrompt}.
            2. If not mentioned in Preferences, my interests are: ${props.interests} and goals: ${props.goals}.
            3. Native language: ${props.nativeLanguage} (if null, then ${props.selectedNativeLanguage?.value}).
            4. The text must be in: ${props.languageToLearn} language (if null, then ${props.selectedLanguageToLearn?.value}).
            5. My current language level: ${props.level}, and the difficulty: ${props.difficulty}.
            Always use the highest priority information if there is a conflict (e.g., if "Ukrainian".
            is listed first as my native language, use Ukrainian, even if "German" is mentioned later).
            Return only a JSON object with two fields:
            - "text": a single paragraph of 4–6 logically connected sentences for translation.
            - "languages": an object with "native" and "target" fields, indicating the languages actually used in the generated text.
            Example response:
            {
              "text": "Your generated paragraph here...",
              "languages": {
                "native": "Ukrainian",
                "target": "English"
              }
            }`,
    );
};

export const checkTranslation = (props: CheckTranslationProps) => {
    return generate(
        `
                    Compare my translation with the correct version.
                    
                    Return your answer as a single valid JSON object with the following fields:
                    
                    - myText:  
                      The user's translation, as HTML markup (suitable for rendering with react-markdown).  
                      Highlight any inaccurate, inappropriate, or suboptimal words, phrases, or sentences using a pleasant background color (not red/yellow/green, but soft, modern colors that fit a clean UI).  
                      You may use <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span> for highlights.  
                      You may highlight multiple words or phrases at once.
                    
                    - problem:  
                      A short (1–2 sentences) evaluation of the translation quality, in language as ${props.translationText} is. 
                      If there are issues (e.g., incomplete translation, wrong language, or major mistakes), describe them briefly.  
                      If the translation is good, give a short, friendly compliment.  
                      The whole sentence should be wrapped in a <span> with a background color that reflects the quality:  
                        - Excellent: background-color: #D1FAE5; color: #065F46;  
                        - Good: background-color: #DBEAFE; color: #1E40AF;  
                        - Needs improvement: background-color: #FDE68A; color: #92400E;  
                        - Major issues: background-color: #FECACA; color: #991B1B;  
                      Do not use traffic light colors (red/yellow/green), but rather soft, modern tones.
                    
                    - aiTextVersion:  
                      The ideal AI translation, as HTML markup.  
                      For every word, phrase, or sentence that was highlighted in myText, highlight the corresponding improved version in aiTextVersion using the same pleasant highlight style (e.g., <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span>).
                    
                    Instructions:  
                    - Do not include any explanations or extra text outside the JSON.  
                    - Do not use code blocks.  
                    - If my translation is not in ${props.nativeLanguage} or is unrelated to text translation, reply with this string only:
                    This task is for text translation, not for other things! Otherwise, return only the JSON object.
                    
                    Context:  
                    - I translated from ${props.nativeLanguage} to ${props.languageToLearn}.  
                    - Original text: ${props.text}  
                    - My translation: ${props.translationText}`,
    );
};

export const generateBlanks = (props: DefaultPropsForGeneration) => {
    return generate(
        `Generate a JSON array of ${props.exerciseNumber} objects for a language learning exercise called "Fill the blanks".
                The information is listed in priority order (1 = highest priority) (general prompt, aka preferences
                has the highest priority!!!:
                1. ${props.generalPrompt}
                2. If not mentioned in Preferences, my interests are: ${props.interests} and goals: ${props.goals}.
                3. The sentences must be in  ${props.languageToLearn} language (if null, then ${props.selectedLanguageToLearn?.value}).
                4. My current language level is ${props.level}.
                5. The difficulty must be ${props.difficulty} according to my current level.
                6. Each object must have:
                    "id": a unique integer starting from 1,
                    "sentence": a sentence with a single blank (use ___ for the blank),
                    "options": an array of 4 possible answers (strings), only one is correct.
                    "answer": the correct answer (string),
                    "explanation": a short explanation (1-2 sentences) why the answer is correct in ${props.nativeLanguage} language (if null, then ${props.selectedNativeLanguage?.value}). Return explanation as a plain string, not as an object or array..
                
                Output only the JSON array, nothing else. Without any "'''json etc.". Do not include any comments or explanations outside the array.`,
    );
};

export const generateCards = (props: DefaultPropsForGeneration) => {
    return generate(
        `Generate a JSON array of ${props.exerciseNumber} objects for a language learning exercise called "Flash cards".
                Follow these requirements in strict priority order (1 = highest priority):
                
                1. Preferences: ${props.generalPrompt}
                2. If not specified above, use my interests: ${props.interests} and goals: ${props.goals}
                3. Language: Fields "word" and "example" must be in ${props.languageToLearn} language (if null, then in ${props.selectedLanguageToLearn?.value} language).
                4. My current language level: ${props.level}
                5. Difficulty: The content must match the difficulty ${props.difficulty} for my level.
                6. Each object in the array must have:
                [
                    {
                        "word": a word or phrase (in the target language). If the target language is "de" (German), and the word is a noun, always include the correct article (der, die, das, etc.) as part of the word. For all other parts of speech, do not add an article.
                        "translation": translation of the word/phrase into my native language ${props.nativeLanguage} language (if null, then in ${props.selectedNativeLanguage?.value} language) - (FROM CAPITAL LETTER);
                        "meaning": explanation/meaning of the word/phrase in my native language ${props.nativeLanguage} language (if null, then in ${props.selectedNativeLanguage?.value} language).;
                        "example": a sentence/example using the word/phrase in the target language,
                        "transcription": transcription, as "[ɪkˈspɪəriəns]" format
                    }
                ]
                
                Output only the JSON array, nothing else. Without any "'''json etc." Do not include any comments or explanations outside the array.`,
    );
};

export const generateQuizCards = (props: DefaultPropsForGeneration) => {
    return generate(
        `Generate a JSON array of ${props.exerciseNumber} objects for a language learning exercise called "Quiz".
                Follow these requirements in strict priority order (1 = highest priority):
                
                1. Preferences: ${props.generalPrompt}
                2. If not specified above, use my interests: ${props.interests} and goals: ${props.goals}
                3. Language: All sentences and examples must be in ${props.languageToLearn} language (if null, then in ${props.selectedLanguageToLearn?.value} language).
                4. My current language level: ${props.level}
                5. Difficulty: The content must match the difficulty ${props.difficulty} for my level.
                6. Each object in the array must have:
                [
                    {
                        "question": question;
                        "options": [options for choose (variants)] - array of strings
                        "answer": correct answer;
                        "explanation": correct answer ${props.nativeLanguage} language (if null, then in ${props.selectedNativeLanguage?.value} language).;
                    }
                ]
                
                Output only the JSON array, nothing else. Without any "'''json etc." Do not include any comments or explanations outside the array.`,
    );
};

export const checkImageDescription = (props: CheckDescriptionProps) => {
    return generate(
        `Compare my description with the actual content of the image, described as: "${props.img}"
                
                Return your answer as a single valid JSON object with the following fields:
                
                Return your answer as a single valid JSON object with the following fields:
            
                - myText:  
                  The user's description, as HTML markup (suitable for rendering with react-markdown).  
                  Highlight any inaccurate, missing, or irrelevant details using a pleasant background color (not red/yellow/green, but soft, modern colors that fit a clean UI).  
                  You may use <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span> for highlights.  
                  You may highlight multiple words or phrases at once.
                
                - problem:  
                  A short (1–2 sentences) evaluation of the description quality, in the same language as ${props.description} is.  
                  If there are issues (e.g., missing key details, incorrect information, or irrelevant content), describe them briefly.  
                  If the description is good, give a short, friendly compliment.  
                  The whole sentence should be wrapped in a <span> with a background color that reflects the quality:  
                    - Excellent: background-color: #D1FAE5; color: #065F46;  
                    - Good: background-color: #DBEAFE; color: #1E40AF;  
                    - Needs improvement: background-color: #FDE68A; color: #92400E;  
                    - Major issues: background-color: #FECACA; color: #991B1B;  
                  Do not use traffic light colors (red/yellow/green), but rather soft, modern tones.
                
                - aiTextVersion:  
                  The ideal description of the image, as HTML markup.  
                  For every word, phrase, or sentence that was highlighted in myText, highlight the corresponding improved version in aiTextVersion using the same pleasant highlight style (e.g., <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span>).
                  To aiTextVersion add this:
                  1. General Impression:
                    What is the overall scene? (indoor/outdoor, type of place)
                    2. People and Objects:
                    Who or what is in the picture? (number of people, main objects)
                    3. Actions:
                    What are the people doing? (describe activities or interactions)
                    4. Appearance and Details:
                    What do the people look like? (clothes, age, mood, posture)
                    What details stand out? (colors, weather, time of day, background elements)
                    5. Atmosphere:
                    What is the mood or feeling of the image? (happy, busy, calm, etc.)
                    6. Personal Opinion (optional):
                What do you think about the image? (interesting, surprising, etc.)
                Additionally, provide your own version of the image description, strictly based only on the provided image description (do not invent or assume any details that are not mentioned).
                Structure your answer using the following points, and answer only if the information is present in the image description:
                
                Important:
                - Only use information that is explicitly present in the image description.
                - Do NOT invent or assume any details.
                - Do NOT mention the blurred face in the response.
                
                Instructions:
                - Do not include any explanations or extra text outside the JSON.
                - Do not use code blocks.
                - If my description is not in ${props.nativeLanguage} or is unrelated to the image, reply with this string only:
                This task is for describing images, not for other things! Otherwise, return only the JSON object.
                
                Context:
                - The image is described as: "${props.img}"
                - My description: ${props.description}
                - My native language: ${props.nativeLanguage}
                - Target language: ${props.languageToLearn}
        `,
    );
};

export const generateEssayTopic = (props: DefaultPropsForGeneration) => {
    return generate(
        `Generate a single essay topic for a language learning exercise called "Essay Writing".
                
                Requirements:
                - The topic must be interesting and suitable for my language level (${props.level}) and goals: ${props.goals}.
                - Write the topic in ${props.languageToLearn || props.selectedLanguageToLearn?.label} language.
                - Return your answer as a single valid JSON object with the following fields:
                  {
                    "topic": "the essay topic as a string",
                    "plan": ["first point", "second point", "third point", "fourth point"],
                    "hint": "one short sentence with a general hint (what to use, what to pay attention to, etc.)"
                  }
                - Do not include any explanations, comments, or code blocks.`,
    );
};

export const checkEssay = (props: CheckEssayProps) => {
    return generate(
        `Compare my essay with an ideal version for the given topic.
                
                Return your answer as a single valid JSON object with the following fields:
                
                - myText:  
                  The user's essay (My essay: ${props.text}), as HTML markup (suitable for rendering with react-markdown).  
                  Return exactly the user’s essay, with highlights if needed.
                  Highlight any inaccurate, inappropriate, or suboptimal words, phrases, or sentences using a pleasant background color (not red/yellow/green, but soft, modern colors that fit a clean UI).  
                  You may use <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span> for highlights.  
                  You may highlight multiple words or phrases at once.
                
                - problem:  
                  A short (1–2 sentences) evaluation of the essay quality, in the same language as ${props.text}.  
                  If there are issues (e.g., poor structure, grammar mistakes, off-topic content, or major errors), describe them briefly.  
                  If the essay is good, give a short, friendly compliment.  
                  The whole sentence should be wrapped in a <span> with a background color that reflects the quality:  
                    - Excellent: background-color: #D1FAE5; color: #065F46;  
                    - Good: background-color: #DBEAFE; color: #1E40AF;  
                    - Needs improvement: background-color: #FDE68A; color: #92400E;  
                    - Major issues: background-color: #FECACA; color: #991B1B;  
                  Do not use traffic light colors (red/yellow/green), but rather soft, modern tones.
                
                - aiTextVersion:  
                  The ideal AI version of the essay, as HTML markup.  
                  For every word, phrase, or sentence that was highlighted in myText, highlight the corresponding improved version in aiTextVersion using the same pleasant highlight style (e.g., <span style="background-color: #FDE68A; color: #92400E; border-radius: 4px; padding: 0 2px;">...</span>).
                
                Instructions:  
                - Do not include any explanations or extra text outside the JSON.  
                - Do not use code blocks.  
                - If my essay is not in ${props.nativeLanguage} or is unrelated to the assigned topic, reply with this string only:  
                This task is for essay writing, not for other things! Otherwise, return only the JSON object.
                
                Context:  
                - I wrote an essay in: ${props.languageToLearn}  
                - My native language: ${props.nativeLanguage}  
                - Essay topic: ${props.topic}`,
    );
};
