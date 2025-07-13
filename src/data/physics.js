// src/data/physics.js (Example)
export const newtonsThirdLawContent = [
    {
        type: 'text',
        sender: 'Ustaad Buddy',
        content: "Ever slapped your cousin and got slapped back? Newton approves!",
        meta: { humor: true, hook: true }
    },
    {
        type: 'image',
        sender: 'Ustaad Buddy',
        src: '/assets/memes/slap_meme.gif',
        alt: 'Funny slap meme related to action-reaction',
        meta: { visual: true }
    },
    {
        type: 'text',
        sender: 'Ustaad Buddy',
        content: "Alright, so Newton's Third Law says: 'For every action, there is an equal and opposite reaction.' This means forces always come in pairs.",
        meta: { explanation: true, coreConcept: true }
    },
    {
        type: 'image',
        sender: 'Ustaad Buddy',
        src: '/assets/comics/cricket_bat_ball_comic.png',
        alt: 'Comic strip of a cricket bat hitting a ball and the ball pushing back',
        meta: { visual: true, metaphor: true }
    },
    {
        type: 'text',
        sender: 'Ustaad Buddy',
        content: "Think about it, when the bat hits the ball (action), the ball pushes back on the bat with the same force (reaction). If it didn't, the bat wouldn't feel any resistance!",
        meta: { example: true, localized: true }
    },
    {
        type: 'quiz',
        sender: 'Ustaad Buddy',
        data: {
            id: 'N3L-Q1',
            questionText: 'When you press a button on a remote, what is the reaction force?',
            options: [
                'The signal going to the TV',
                'Your finger feeling the button push back',
                'The TV changing channels',
                'The battery draining'
            ],
            correctAnswer: 'Your finger feeling the button push back',
            type: 'mcq'
        },
        meta: { gamified: true }
    },
    {
        type: 'text',
        sender: 'Ustaad Buddy',
        content: "Shabash! You unlocked Ustaad’s Secret Technique: ‘Equal & Opposite Bhai’ – always remember forces are like siblings, they come in pairs!",
        meta: { reinforcement: true, mnemonic: true, localized: true }
    }
];