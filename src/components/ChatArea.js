import React from 'react';
import ChatBubble from './ChatBubble';
import QuizCard from './QuizCard';

function ChatArea({ messages, onUserAction }) {
    return (
        <div className="flex-grow overflow-y-auto p-4 bg-white rounded-lg shadow-inner">
            {messages.map((msg, index) => {
                if (msg.type === 'text') {
                    return <ChatBubble key={index} sender={msg.sender} content={msg.content} />;
                } else if (msg.type === 'lesson-block') {
                    // Render different content types based on msg.data
                    const block = msg.data;
                    if (block.type === 'text') {
                        return <ChatBubble key={index} sender="Ustaad Buddy" content={block.value} />;
                    } else if (block.type === 'image' || block.type === 'gif') {
                        return (
                            <div key={index} className="flex justify-center my-2">
                                <img src={block.src} alt={block.alt} className="max-w-xs rounded-lg shadow-md" />
                            </div>
                        );
                    } else if (block.type === 'quiz') {
                        return <QuizCard key={index} quizData={block.data} onAnswer={(isCorrect) => onUserAction('answeredQuiz', { quizId: block.data.id, isCorrect })} />;
                    }
                }
                return null;
            })}
        </div>
    );
}

export default ChatArea;