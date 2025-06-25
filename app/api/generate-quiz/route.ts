// /app/api/generate-quiz/route.ts
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store in .env
});

export async function POST(req: NextRequest) {
  const { transcriptPart } = await req.json();

  const prompt = `
Generate 3 multiple-choice questions with 4 options and correct answers from the following content:

"${transcriptPart}"

Respond in JSON format like:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]
`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = chat.choices[0].message.content;
  try {
    const quiz = JSON.parse(text || "[]");
    return NextResponse.json({ quiz });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON format from AI", text },
      { status: 500 }
    );
  }
}
