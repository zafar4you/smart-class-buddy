// src/services/dbService.js

const DB_NAME = 'SmartClassBuddyDB';
const DB_VERSION = 1;
const STORE_NAME_PROGRESS = 'student_progress';
const STORE_NAME_LESSONS = 'lessons'; // To store pre-loaded lesson content

let db;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            // Create object stores if they don't exist
            if (!db.objectStoreNames.contains(STORE_NAME_PROGRESS)) {
                db.createObjectStore(STORE_NAME_PROGRESS, { keyPath: 'studentId' });
            }
            if (!db.objectStoreNames.contains(STORE_NAME_LESSONS)) {
                db.createObjectStore(STORE_NAME_LESSONS, { keyPath: 'lessonId' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.errorCode);
            reject('IndexedDB error');
        };
    });
}

export async function getStudentProgress(studentId) {
    if (!db) db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME_PROGRESS], 'readonly');
        const store = transaction.objectStore(STORE_NAME_PROGRESS);
        const request = store.get(studentId);

        request.onsuccess = () => {
            resolve(request.result || { studentId: studentId, completedLessons: [], quizScores: {}, mistakeTracker: {} });
        };

        request.onerror = () => {
            reject('Error getting student progress');
        };
    });
}

export async function updateStudentProgress(studentId, newData) {
    if (!db) db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME_PROGRESS], 'readwrite');
        const store = transaction.objectStore(STORE_NAME_PROGRESS);

        store.get(studentId).onsuccess = (event) => {
            const existingData = event.target.result || { studentId: studentId, completedLessons: [], quizScores: {}, mistakeTracker: {} };
            const updatedData = { ...existingData, ...newData }; // Simple merge

            const request = store.put(updatedData);

            request.onsuccess = () => resolve();
            request.onerror = () => reject('Error updating student progress');
        };
    });
}

// Function to pre-load and get lesson content
// In a real scenario, you would structure your lesson data (e.g., in src/data/physics.js)
// and load it into IndexedDB when the app first launches or when a subject is chosen.
export async function saveLessonContent(lesson) {
    if (!db) db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME_LESSONS], 'readwrite');
        const store = transaction.objectStore(STORE_NAME_LESSONS);
        const request = store.put(lesson); // lesson object must have lessonId

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error saving lesson content');
    });
}

export async function getLessonsForTopic(topicId) {
    if (!db) db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME_LESSONS], 'readonly');
        const store = transaction.objectStore(STORE_NAME_LESSONS);
        const allLessons = [];

        store.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                if (cursor.value.topicID === topicId) { // Filter by topicID
                    allLessons.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(allLessons.sort((a, b) => a.order - b.order)); // Sort if you have an 'order' property
            }
        };

        request.onerror = () => reject('Error fetching lessons for topic');
    });
}

// Example of initial lesson data to save (in src/data/physics.js or similar)
export const initialPhysicsLessons = [
    {
        lessonId: 'L-N3L-001',
        topicID: 'physics-newton-laws',
        lessonTitle: 'Newton\'s Third Law Hook',
        order: 1,
        content: [
            { type: 'text', value: "Ever slapped your cousin and got slapped back? Newton approves!" },
            { type: 'gif', src: '/assets/memes/slap_meme.gif', alt: 'Funny slap meme' }
        ]
    },
    {
        lessonId: 'L-N3L-002',
        topicID: 'physics-newton-laws',
        lessonTitle: 'Newton\'s Third Law Explanation',
        order: 2,
        content: [
            { type: 'text', value: "Alright, so Newton's Third Law says: 'For every action, there is an equal and opposite reaction.' Think about it like this..." },
            { type: 'image', src: '/assets/comics/cricket_comic.png', alt: 'Cricket bat & ball comic strip' }
        ]
    },
    {
        lessonId: 'L-N3L-003',
        topicID: 'physics-newton-laws',
        lessonTitle: 'Newton\'s Third Law Quiz',
        order: 3,
        content: [
            { type: 'text', value: "Time for a quick test, beta! Which of these is an example of an action-reaction pair?" },
            { type: 'quiz', data: {
                id: 'Q-N3L-001',
                questionText: 'Which of these is an example of an action-reaction pair?',
                options: ['A car driving', 'A ball falling to the ground', 'A swimmer pushing water backward and moving forward', 'A light bulb glowing'],
                correctAnswer: 'A swimmer pushing water backward and moving forward'
            }}
        ]
    }
];

// Call this once on app load to populate initial data
export async function initializeLessons() {
    // Only add if not already in DB (check by lessonId)
    for (const lesson of initialPhysicsLessons) {
        // Simple check, more robust check would involve getting by ID first
        try {
            await saveLessonContent(lesson);
        } catch (e) {
            console.log("Lesson already exists or error saving:", lesson.lessonId, e);
        }
    }
}