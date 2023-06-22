import openai from "@/config/openai";
import {  NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of the post request
  const { todos } = await request.json();

  // communicate with openai api
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responsing, always welcome the user as kishore and say welcome to the 
        trello board. Limit the response to 200 words only!`,
      },
      {
        role: "user",
        content: `Hello, provide the summary of the following todos. count how many todos are 
        there in each category, such as Todo, In Progress and Done. Then tell the user to have 
        a productive day! Here's the data : ${JSON.stringify(todos)}`,
      },
    ],
  });

  const { data } = response;
  console.log("Data is: ", data);
  console.log(data.choices[0].message);
  return NextResponse.json(data.choices[0].message);
}
