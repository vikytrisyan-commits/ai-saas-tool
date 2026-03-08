export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const {prompt} = req.body

const response = await fetch(
"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.HF_API_KEY}`
},
body:JSON.stringify({
inputs: prompt
})
}
)

const data = await response.json()

res.status(200).json({
reply:data[0]?.generated_text || "No response"
})

}catch(err){

res.status(500).json({
reply:"AI error"
})

}

}
