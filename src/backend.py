from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os
from dotenv import load_dotenv
import logging

load_dotenv()
client = OpenAI(
            api_key=os.getenv("GOOGLE_API_KEY"),
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
        )

# Define Gemini model
app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)


class RecipeRequest(BaseModel):
    ingredients: List[str]

@app.post("/generate-recipe")
async def generate_recipe(request: RecipeRequest):  # Remove raw_request parameter
    try:
        if not request.ingredients:
            raise HTTPException(status_code=400, detail="No ingredients provided")

        prompt = f"""Create a recipe using these ingredients: {', '.join(request.ingredients)}. 
                    Include title, ingredients list, and step by step instructions."""
        
        messages = [
            {"role": "user", "content": prompt}
        ]
                
        completion = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=messages,
            response_format={"type": "text"},
            temperature=0.7
        )
        
        return {"content": completion.choices[0].message.content.strip()}
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))