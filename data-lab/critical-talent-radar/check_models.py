import google.generativeai as genai
import os
import toml

# Try to load secrets from .streamlit/secrets.toml
try:
    secrets = toml.load(".streamlit/secrets.toml")
    api_key = secrets.get("GEMINI_API_KEY")
except Exception as e:
    print(f"Error loading secrets: {e}")
    api_key = None

if not api_key:
    # Fallback to env var or user input if needed (but for this env, we expect secrets)
    print("Could not find GEMINI_API_KEY in .streamlit/secrets.toml")
    exit(1)

genai.configure(api_key=api_key)

print("Listing available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Name: {m.name}")
except Exception as e:
    print(f"Error listing models: {e}")
