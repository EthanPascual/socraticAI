import os
import openai
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import FastAPI
from pydantic import BaseModel

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
history = [
    {"role": "system", "content" : "You are Socrates, answer or respond as Socrates would, trying to simulate Socratic dialogue. Keep answers fairly short, to a paragraph max, and keep everything on one line"}
]

client = OpenAI()

app = FastAPI()

class UserInput(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "Hello, Socratic AI!"}

@app.post("/chat")
async def chat(input: UserInput):
    history.append({"role": "user", "content" : input.message})
    output = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=history
    )
    history.append(output.choices[0].message)
    return {"response" : output.choices[0].message.content}