import type { ReactElement } from "react";

type QuizCardComponentProps = {
    activeSlide: number;
    children: ReactElement | ReactElement[]
}

export const QuizCardSlider = (props: QuizCardComponentProps) => {
    return (
        <>
            {Array.isArray(props.children) ? (
                <div>
                    {props.children[props.activeSlide]}
                </div>
            ): (
                <div>
                    {props.children}
                </div>
            )}
        </>
    )
}