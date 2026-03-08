export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { prompt } = req.body

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    })

    const data = await response.json()

    console.log(data)

    const reply = data?.choices?.[0]?.message?.content || "No response from AI"

    res.status(200).json({ reply })

  } catch (error) {

    res.status(500).json({
      reply: "AI error occurred"
    })

  }

}
