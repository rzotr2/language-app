import type {
    Blank,
    EssayType,
    ExerciseType,
    FlipCardType,
    LanguageOption,
    PhotoType,
    QuizCard,
} from "../types";
import { create } from "zustand";

type State = {
    generalPrompt: string | null;
    nativeLanguage: string | null;
    selectedNativeLanguage: LanguageOption | null;
    languageToLearn: string | null;
    selectedLanguageToLearn: LanguageOption | null;
    languageResult: { native: string; target: string } | null;
    exerciseNumber: string;
    exercise: ExerciseType;
    difficulty: string;
    currentText: string | null;
    blanksArray: Blank[] | null;
    cardsArray: FlipCardType[] | null;
    quizCards: QuizCard[] | null;
    currentPhoto: PhotoType | null;
    currentTopic: EssayType | null;

    setField: <K extends keyof State>(key: K, value: State[K]) => void;
    setFields: (fields: Partial<State>) => void;
};

export const useExerciseStore = create<State>((set) => ({
    generalPrompt: null,
    nativeLanguage: null,
    selectedNativeLanguage: null,
    languageToLearn: null,
    selectedLanguageToLearn: null,
    languageResult: null,
    exerciseNumber: "5",
    exercise: "translation",
    difficulty: "-",
    currentText: null,
    blanksArray: null,
    cardsArray: null,
    quizCards: null,
    currentPhoto: null,
    currentTopic: null,

    setField: (key, value) => set((state) => ({ ...state, [key]: value })),
    setFields: (fields) => set((state) => ({ ...state, ...fields })),
}));
