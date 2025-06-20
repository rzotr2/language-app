export type DefaultPropsForGeneration = {
    generalPrompt: string | null;
    nativeLanguage: string | null;
    selectedNativeLanguage: LanguageOption | null;
    languageToLearn: string | null;
    selectedLanguageToLearn: LanguageOption | null;
    difficulty: string;
    level?: string | null;
    exercise: ExerciseType;
    exerciseNumber?: string;
    goals?: string;
    interests?: string;
};

export type ExerciseType = "translation" | "blanks" | "cards" | "quiz" | "imageDesc" | "essay";

export type CheckTranslationProps = {
    nativeLanguage: string | null;
    languageToLearn: string | null;
    text: string;
    translationText: string | null;
};

export type LanguageOption = {
    value: string;
    label: string;
};

export type Blank = {
    id: number;
    sentence: string;
    options: string[];
    answer: string;
    explanation: string;
};

export type FlipCardType = {
    word: string;
    translation: string;
    meaning: string;
    example: string;
    transcription: string;
};

export type QuizCard = {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
};

export type PhotoType = {
    src?: string;
    alt?: string | null;
};

export type CheckDescriptionProps = {
    nativeLanguage: string;
    languageToLearn: string;
    description: string;
    img: string;
};

export type EssayType = {
    topic: string;
    plan: string[];
    hint: string;
};

export type CheckEssayProps = {
    nativeLanguage: string;
    languageToLearn: string;
    text: string | null;
    topic: string;
};

export type FirstPageType = {
    total_results: number;
};

export type PexelsResponsePhoto = {
    src: { landscape: string };
    alt: string;
};

export type PexelsResponse = {
    photos: PexelsResponsePhoto[];
};

export type ProfileSearchParams = {
    page: "about" | "resume" | "projects";
};
