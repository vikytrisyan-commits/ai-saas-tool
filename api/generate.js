export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" })
  }

  try {

    const { prompt } = req.body

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    )

    const data = await response.json()

    console.log(data)

    let reply = "No response"

    if (Array.isArray(data)) {
      reply = data[0]?.generated_text || "No text generated"
    }

    res.status(200).json({ reply })

  } catch (error) {

    res.status(500).json({
      reply: "Server error"
    })

  }

}
