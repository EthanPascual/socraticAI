import os
import openai
from dotenv import load_dotenv
from openai import *
from fastapi import FastAPI
from pydantic import BaseModel
import spacy
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict




load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
def populateRole():
   return [{"role": "system", "content" : "You are Socrates, answer or respond as Socrates would, trying to simulate Socratic dialogue. Keep answers to a paragraph max, and keep everything on one line"}]

histories = defaultdict(lambda: populateRole())


nlp = spacy.load("en_core_web_sm")
def preprocess(text):
   doc = nlp(text)
   tokens = [token.lemma_.lower() for token in doc if not token.is_punct and not token.is_space]
   print(tokens)
   return " ".join(tokens)




client = OpenAI()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://socratic-ai-self.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserInput(BaseModel):
   message: str
   sessionId: str


@app.get("/")
async def root():
   return {"message": "Hello, Socratic AI!"}


@app.post("/chat")
async def chat(input: UserInput):
   try:
       processedText = preprocess(input.message)
       histories[input.sessionId].append({"role": "user", "content" : processedText})
       output = client.chat.completions.create(
           model="gpt-4o-mini",
           messages=histories[input.sessionId]
       )
       histories[input.sessionId].append(output.choices[0].message)
       return {"response" : output.choices[0].message.content}
   except OpenAIError as e:
       print(f"OpenAI API Error : {e}")
       return {"error" : "There seems to be an error with the OpenAI API. Please try again later"}