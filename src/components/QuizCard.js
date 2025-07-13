import React, { useState } from 'react';

function QuizCard({ quizData, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        const isCorrect = selectedOption === quizData.correctAnswer;
        if (isCorrect) {
            setFeedback('Shabash! That\'s absolutely correct!');
        } else {
            setFeedback(`Oops! The correct answer was "${quizData.correctAnswer}". Let's understand why.`);
        }
        onAnswer(isCorrect); // Notify parent component
    };

    return (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md my-4">
            <p className="font-semibold mb-3">{quizData.questionText}</p>
            {quizData.options.map((option, index) => (
                <button
                    key={index}
                    className={`block w-full text-left p-2 my-1 border rounded-md ${selectedOption === option ? 'bg-blue-300' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => handleOptionSelect(option)}
                >
                    {option}
                </button>
            ))}
            <button
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSubmit}
                disabled={!selectedOption}
            >
                Check Answer
            </button>
            {feedback && <p className="mt-2 text-sm">{feedback}</p>}
        </div>
    );
}

export default QuizCard;