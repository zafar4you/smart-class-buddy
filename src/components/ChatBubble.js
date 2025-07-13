import React from 'react';

function ChatBubble({ sender, content }) {
    const isUstaad = sender === 'Ustaad Buddy';
    return (
        <div className={`flex ${isUstaad ? 'justify-start' : 'justify-end'} my-2`}>
            <div className={`p-3 rounded-lg max-w-[70%] ${isUstaad ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                {isUstaad && <span className="font-semibold text-sm block mb-1">Ustaad Buddy</span>}
                <p>{content}</p>
            </div>
        </div>
    );
}

export default ChatBubble;