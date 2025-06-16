import { TextTranslation } from "./text-translation/TextTranslation.tsx";
import { FillTheBlanks } from "./fill-blanks/FillTheBlanks.tsx";
import { CardsFlipExercise } from "./flip-cards/CardsFlipExercise.tsx";
import { QuizExercise } from "./quiz/QuizExercise.tsx";
import { DescribeImageExercise } from "./describe-image/DescribeImageExercise.tsx";
import { EssayExercise } from "./essay/EssayExercise.tsx";
import type { Blank, EssayType, FlipCardType, PhotoType, QuizCard } from "../../types";

type ExerciseAreaProps = {
    getIsLoading: (isLoading: boolean) => void;
    text: string | null;
    nativeLanguage: string;
    languageToLearn: string;
    blanksArray: Blank[] | null;
    cardsArray: FlipCardType[] | null;
    quizCards: QuizCard[] | null;
    currentPhoto: PhotoType | null;
    currentTopic: EssayType | null;
    generateMore: () => void;
    difficulty: string;
    languageResult: {
        native: string;
        target: string;
    } | null;
};

export const ExerciseArea = (props: ExerciseAreaProps) => {
    return (
        <>
            <section
                id="exercise-area"
                className={`${
                    props.text ||
                    props.blanksArray ||
                    props.cardsArray ||
                    props.quizCards ||
                    props.currentPhoto ||
                    props.currentTopic
                        ? "duration-500 font-bold mx-auto max-w-[98%] md:max-w-[75vw] lg:max-w-[55vw] shadow-md my-3"
                        : "h-0 overflow-hidden"
                }`}
            >
                {props.text && (
                    <TextTranslation
                        getIsLoading={props.getIsLoading}
                        text={props.text}
                        nativeLanguage={props.languageResult?.native as string}
                        languageToLearn={props.languageResult?.target as string}
                        generateMore={props.generateMore}
                        difficulty={props.difficulty}
                    />
                )}
                {props.blanksArray && (
                    <FillTheBlanks
                        blanksArray={props.blanksArray}
                        generateMore={props.generateMore}
                        difficulty={props.difficulty}
                    />
                )}
                {props.cardsArray && (
                    <CardsFlipExercise
                        generateMore={props.generateMore}
                        flipCards={props.cardsArray}
                        difficulty={props.difficulty}
                    />
                )}
                {props.quizCards && (
                    <QuizExercise
                        generateMore={props.generateMore}
                        quizCards={props.quizCards}
                        difficulty={props.difficulty}
                    />
                )}
                {props.currentPhoto && (
                    <DescribeImageExercise
                        generateMore={props.generateMore}
                        image={props.currentPhoto}
                        nativeLanguage={props.languageResult?.native as string}
                        languageToLearn={props.languageResult?.target as string}
                        difficulty={props.difficulty}
                        getIsLoading={props.getIsLoading}
                    />
                )}
                {props.currentTopic && (
                    <EssayExercise
                        generateMore={props.generateMore}
                        nativeLanguage={props.languageResult?.native as string}
                        languageToLearn={props.languageResult?.target as string}
                        difficulty={props.difficulty}
                        getIsLoading={props.getIsLoading}
                        topic={props.currentTopic}
                    />
                )}
            </section>
        </>
    );
};
