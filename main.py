import os
import openai
from dotenv import load_dotenv
from openai import *
from fastapi import FastAPI
from pydantic import BaseModel
import spacy

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
history = [
    {"role": "system", "content" : "You are Socrates, answer or respond as Socrates would, trying to simulate Socratic dialogue. Keep answers to a paragraph max, and keep everything on one line"}
]

nlp = spacy.load("en_core_web_sm")
def preprocess(text):
    doc = nlp(text)
    tokens = [token.lemma_.lower() for token in doc if not token.is_punct and not token.is_space]
    print(tokens)
    return " ".join(tokens)


client = OpenAI()

app = FastAPI()

class UserInput(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "Hello, Socratic AI!"}

@app.post("/chat")
async def chat(input: UserInput):
    try:
        processedText = preprocess(input.message)
        history.append({"role": "user", "content" : processedText})
        output = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=history
        )
        history.append(output.choices[0].message)
        return {"response" : output.choices[0].message.content}
    except OpenAIError as e:
        print(f"OpenAI API Error : {e}")
        return {"error" : "There seems to be an error with the OpenAI API. Please try again later"}