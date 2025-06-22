import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import quizCompImg from '../assets/quiz-complete.png';
import Question from './Question.jsx'

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

    return (
        <div id="quiz">
            
                
                <div id="skip-action">
                    <button onClick={handleSkipAns}>Skip</button>
                </div>
            </div>
        </div>
    );
}
