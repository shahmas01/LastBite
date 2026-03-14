import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
export async function savePlan(ingredients, mealPlan) {

    const { data, error } = await supabase
        .from("meal_plans")
        .insert([
            {
                ingredients: ingredients,
                meal_plan: mealPlan
            }
        ]);

    if (error) {
        console.error(error);
    }

    return data;

}