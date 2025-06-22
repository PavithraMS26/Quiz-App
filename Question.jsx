export default function Question() {
    return (
        <div id="question">
            <Timer
                key={activeQuestionIndex}
                timeout={10000}
                onTimeOut={handleSkipAns}
            />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <Answers
                key={activeQuestionIndex}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswer[userAnswer.length - 1]}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}