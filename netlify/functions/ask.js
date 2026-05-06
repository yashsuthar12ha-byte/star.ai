exports.handler = async function(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  let question;
  try { question = JSON.parse(event.body).question; }
  catch { return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) }; }
  if (!question) return { statusCode: 400, body: JSON.stringify({ error: "No question" }) };
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are Star.AI — a smart friendly AI assistant. LANGUAGE RULE: Reply in the same language as the question. English = English. Hindi Devanagari = Hindi. Hinglish = Hinglish. Style: concise, max 5-6 lines, 1-2 emojis, no bullet points." },
          { role: "user", content: question }
        ],
        max_tokens: 600
      })
    });
    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Something went wrong! Please try again 🛸";
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answer }) };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
