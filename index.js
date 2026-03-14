const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/generate-plan', async (req, res) => {
    try {
        const { ingredients } = req.body;

        const prompt = `You are a professional zero-waste chef. 
        I have these ingredients: ${JSON.stringify(ingredients)}.
        
        Task:
        1. Create a 7-day meal plan.
        2. Use ingredients marked as 'dying' or 'expiring soon' in the first 2 days.
        3. Be creative but realistic.
        
        Constraint: Return ONLY a valid JSON object. No extra text.
        Structure:
        {
          "plan": [
            {"day": 1, "meal": "Meal Name", "recipe": "One sentence instruction"},
            ...up to day 7
          ]
        }`;

        const message = await client.messages.create({
            model: "claude-opus-4-5",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }]
        });

        let text = message.content[0].text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Chef Error:", error);
        res.status(500).json({ error: "The kitchen is on fire. Try again!" });
    }
});

app.listen(3000, () => console.log('👨‍🍳 Chef AI is ready at http://localhost:3000'));