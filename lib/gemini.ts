const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generatePCBuildRecommendation(
  request: PCBuilderRequest,
  apiKey: string,
): Promise<PCBuildRecommendation> {
  const prompt = createPrompt(request);
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt,
        }],
      }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    throw new Error("Invalid response format from Gemini API");
  }

  return parseGeminiResponse(responseText);
}

function createPrompt(request: PCBuilderRequest): string {
  return `
You are an expert PC builder AI assistant with deep knowledge of the current Bangladeshi PC hardware market.

🌐 Response Language: ${request.language === "bn" ? "Bengali (বাংলা)" : "English"}

🎯 Your goal:
Recommend the best **compatible**, **available**, and **price-to-performance optimized** PC build strictly within the user's budget.

📌 User Request:
- Budget: ${request.budget} ${request.currency}
- Location: ${request.location}
- Primary Usages: ${request.usages.join(", ")}
${request.additionalNotes ? `- Additional Notes: ${request.additionalNotes}` : ""}
- User Preference: ${request.preference}

🛑 Strict Requirements:
1. 🚫 NEVER exceed the total budget of ${request.budget} ${request.currency}.
2. ✅ Total 'totalPrice' must exactly equal the sum of all 'components.price'.
3. 🔍 Recommend only components available in ${request.location} or major Bangladeshi markets (e.g., IDB, Multiplan, StarTech, Ryans).
4. 🛠 Include ALL required components based on use case:
   - Essential: CPU, GPU, RAM, Storage, Motherboard, PSU, Case
   - Peripherals: Monitor, Keyboard, Mouse (if budget allows or use-case needs)
   - Accessories: Headphones, Printer (if specified or budget allows)
5. 🔧 All parts must be fully compatible (socket, wattage, form factor, RAM type).
6. 💸 Prioritize best **value-to-performance** ratio over brand or popularity.
7. 📉 If budget is tight, intelligently downscale peripherals or reduce non-critical specs.
8. ✅ Include local pricing from Bangladesh where possible.
9. 📣 **The entire JSON response content (summary, notes, descriptions, etc.) must be written in ${request.language === "bn" ? "Bengali" : "English"}.**

🧾 Required Output:
Return response in the EXACT JSON format below:

{
  "summary": string,
  "totalPrice": number,
  "marketLocation": {
    "name": string,
    "address": string,
    "popularFor": string,
    "contact": string
  },
  "performanceRating": number,
  "valueRating": number,
  "components": [
    {
      "type": "CPU"|"GPU"|"Motherboard"|"RAM"|"Storage"|"PSU"|"Case"|"Monitor"|"Keyboard"|"Mouse"|"Headphones"|"Printer",
      "name": string,
      "description": string,
      "price": number,
      "performanceNote": string,
      "valueRating": number
    }
  ],
  "estimatedPerformance": {
    "gaming": string,
    "productivity": string,
    "contentCreation": string
  },
  "futureProofing": string,
  "notes": string[]
}

⚠️ Return ONLY valid raw JSON without any extra explanation or formatting.

If budget is very low, explain trade-offs in 'summary' and still return the best possible configuration.

Make sure JSON is 100% parseable using JSON.parse().
  `;
}

function parseGeminiResponse(responseText: string): PCBuildRecommendation {
  const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(jsonString);
  }
  catch {
    console.error("Failed to parse Gemini response:", jsonString);
    throw new Error("Failed to parse AI response");
  }
}
