function buildPrompt(ingredients) {

    const list = ingredients
        .map(i => `- ${i.name} (expires in ${i.daysLeft} day${i.daysLeft !== 1 ? 's' : ''})`)
        .join('\n');

    return `You are a zero-waste chef AI. A user has these expiring ingredients in their fridge:

${list}

Generate a 7-day meal plan that uses as many of these ingredients as possible, prioritising the ones expiring soonest.

Rules:
- Use the most urgent (fewest days left) ingredients in Day 1 and Day 2 meals
- Every ingredient must appear in at least one meal
- Each day has breakfast, lunch, and dinner
- Meals should be realistic, simple, and delicious
- You may assume the user has basic pantry staples (salt, oil, spices, water)

Respond ONLY with a valid JSON object in this exact structure. Do not include explanations, markdown, or any extra text.

{
  "wasteScore": 94,
  "co2Saved": 1.2,
  "days": [
    {
      "day": "Monday",
      "meals": {
        "breakfast": {
          "name": "Spinach and egg scramble",
          "usedIngredients": ["Spinach", "Eggs"]
        },
        "lunch": {
          "name": "Egg fried rice",
          "usedIngredients": ["Eggs"]
        },
        "dinner": {
          "name": "Creamy spinach soup",
          "usedIngredients": ["Spinach", "Milk"]
        }
      }
    }
  ]
}`;
}