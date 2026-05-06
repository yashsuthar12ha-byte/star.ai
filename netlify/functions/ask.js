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
  const systemPrompt = `You are Star.AI — a smart, friendly AI assistant with a space theme. CRITICAL LANGUAGE RULE: If question is in English reply in English. If in Hindi (Devanagari) reply in Hindi. If Hinglish reply in Hinglish. Style: concise, max 5-6 lines, 1-2 emojis, no bullet points.`;
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
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
