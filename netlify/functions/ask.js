exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let question;
  try {
    question = JSON.parse(event.body).question;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
  }

  if (!question) {
    return { statusCode: 400, body: JSON.stringify({ error: "No question provided" }) };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const systemPrompt = `You are Star.AI — a smart, friendly AI assistant with a space theme.

CRITICAL LANGUAGE RULE:
- Detect the language of the user's question
- If question is in English → reply ONLY in English
- If question is in Hindi (Devanagari script) → reply ONLY in Hindi
- If question is in Hinglish (Roman Hindi) → reply in Hinglish naturally
- NEVER mix languages unless the user already mixed them

Style rules:
- Be concise, warm, and clear — max 5-6 lines
- Use 1-2 relevant emojis (space theme preferred 🌌)
- No bullet points — flowing natural text
- For medical/legal questions, suggest consulting a professional at the end`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          { role: "user", parts: [{ text: question }] }
        ],
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Something went wrong! Please try again 🛸";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", detail: err.message })
    };
  }
};
