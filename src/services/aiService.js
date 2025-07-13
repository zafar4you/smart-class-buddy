// src/services/aiService.js

// IMPORTANT: You will need to get your Hugging Face API Token.
// Go to Hugging Face website, sign up, then go to your settings -> Access Tokens.
// Create a new token with 'read' access.
const HUGGING_FACE_API_TOKEN = 'hf_YOUR_HUGGING_FACE_TOKEN'; // <<< Replace this!

// Choose an open-source LLM model from Hugging Face.
// You'll need to explore and find one that works well for text generation and ideally Roman Urdu.
// Examples: 'HuggingFaceH4/zephyr-7b-beta', 'mistralai/Mistral-7B-Instruct-v0.2', 'google/gemma-2b-it'
// For free inference, you might be limited to smaller models.
const LLM_MODEL_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta'; // <<< Replace with your chosen model URL

// Example for a simple text generation task with LLM
export async function getUstaadBuddyResponse(prompt) {
    try {
        const response = await fetch(
            LLM_MODEL_API_URL,
            {
                headers: { Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}` },
                method: 'POST',
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 150, // Limit response length
                        temperature: 0.7,    // Creativity (higher = more creative)
                        top_p: 0.9,          // Diversity
                        do_sample: true,
                        return_full_text: false // Only return generated text
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Hugging Face API Error:', errorData);
            throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        // The structure of the result depends on the model.
        // For many text generation models, it's an array with a 'generated_text' property.
        if (result && result[0] && result[0].generated_text) {
            // Apply Ustaad Buddy's persona filters (e.g., add a local phrase, check for tone)
            let generatedText = result[0].generated_text.trim();

            // Simple persona filtering example (more complex logic in adaptiveLogic.js or LLM prompt)
            if (!generatedText.includes("beta") && !generatedText.includes("shabash")) {
                generatedText = "Shabash, " + generatedText; // Add a common Pakistani encouraging word
            }

            return generatedText;
        } else {
            console.warn('Unexpected Hugging Face API response structure:', result);
            return "Ustaad Buddy is thinking... 🤔 Can you rephrase?";
        }

    } catch (error) {
        console.error('Error getting Ustaad Buddy response:', error);
        return "Sorry, my brain is taking a chai break. Please try again!";
    }
}

// Function for Roman Urdu NLP (conceptual, might use a separate model or LLM for this)
export async function processRomanUrdu(text) {
    // This would ideally use a fine-tuned model for Roman Urdu to Urdu translation/transliteration
    // Or, if the main LLM supports Roman Urdu directly, you might just send the prompt as is.
    console.log("Processing Roman Urdu:", text);
    // Placeholder for actual NLP call
    return `(Processed Roman Urdu: ${text})`;
}