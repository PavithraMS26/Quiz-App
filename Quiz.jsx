import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import quizCompImg from '../assets/quiz-complete.png';
import Timer from "./Timer.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswer, setUserAnswer] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;
    const quizComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswer((prevUserAnswer) => [...prevUserAnswer, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAns = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    if (quizComplete) {
        return (
            <div id="summary">
                <img src={quizCompImg} alt="Trophy icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswer.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <Timer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeOut={handleSkipAns}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswer.map((answer) => {
                        const lastAnswer = userAnswer[userAnswer.length - 1];
                        const isSelected = lastAnswer === answer;

                        let cssClasses = '';
                        if (answerState === '' && isSelected) {
                            cssClasses = 'selected';
                        }
                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClasses = answerState;
                        }

                        return (
                            <li key={answer} className="answer">
                                <button
                                    onClick={() => handleSelectAnswer(answer)}
                                    className={cssClasses}
                                >
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div id="skip-action">
                    <button onClick={handleSkipAns}>Skip</button>
                </div>
            </div>
        </div>
    );
}