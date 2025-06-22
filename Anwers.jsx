import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswer = useRef();

    if (!shuffledAnswer.current) {
        shuffledAnswer.current = [...answers];
        shuffledAnswer.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswer.current.map((answer, index) => {
                const isSelected = selectedAnswer === answer;

                let cssClasses = '';
                if (answerState === '' && isSelected) {
                    cssClasses = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClasses = answerState;
                }

                return (
                    <li key={`${answer}-${index}`} className="answer">
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClasses}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
