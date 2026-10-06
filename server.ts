import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Server-side Gemini client initialized successfully.");
  } catch (err) {
    console.error("Error initializing Gemini client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not set. AI features will fallback to client-side simulation.");
}

// Helper to check Gemini client status
function getAIClient() {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. Please ensure GEMINI_API_KEY is set in your environment variables via Settings > Secrets.");
  }
  return ai;
}

// API endpoint to generate a full video script with visual scene descriptions & voiceover lines
app.post("/api/generate-script", async (req, res) => {
  try {
    const { topic, style, duration, aspect } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const client = getAIClient();
    const prompt = `
      You are ClipPro AI's advanced creative scriptwriter.
      Generate a professional, highly engaging video script outline based on the following:
      - Topic: ${topic}
      - Creative Style: ${style || "cinematic"}
      - Target Duration: ${duration || "30s"}
      - Aspect Ratio: ${aspect || "16:9"}

      Provide the response in structured JSON format with the following schema:
      {
        "title": "A catchy, viral title",
        "hook": "An attention-grabbing first sentence",
        "scenes": [
          {
            "id": 1,
            "timestamp": "0:00 - 0:05",
            "visualDescription": "Describe what is on screen in detail for the editor (e.g., fast cuts, neon lighting, camera pans)",
            "voiceover": "The exact script spoken out loud",
            "musicBeat": "Recommended background music feel (e.g., upbeat synthwave, ambient classical)"
          }
        ],
        "tags": ["trending_tag1", "trending_tag2"]
      }
      Do NOT include any markdown block fences like \`\`\`json or \`\`\` around the JSON output, return only raw valid JSON.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in /api/generate-script:", error);
    res.status(500).json({ error: error.message || "Failed to generate video script." });
  }
});

// API endpoint to generate automatic synchronized subtitles from raw script transcript
app.post("/api/generate-captions", async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const client = getAIClient();
    const prompt = `
      You are ClipPro AI's subtitle engine.
      Convert the following script transcript into timed auto-captions suitable for video overlay.
      Divide the transcript into short, punchy caption blocks with exact start and end seconds.
      
      Transcript: "${transcript}"

      Provide the response in structured JSON format with the following schema:
      {
        "captions": [
          {
            "start": 0.0,
            "end": 2.5,
            "text": "Punchy subtitle chunk 1"
          },
          {
            "start": 2.5,
            "end": 5.0,
            "text": "Punchy subtitle chunk 2"
          }
        ]
      }
      Do NOT include any markdown block fences, return only raw valid JSON.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in /api/generate-captions:", error);
    res.status(500).json({ error: error.message || "Failed to generate timed captions." });
  }
});

// API endpoint to suggest prompts for image/video assets based on video theme
app.post("/api/generate-assets-prompts", async (req, res) => {
  try {
    const { theme, style } = req.body;
    if (!theme) {
      return res.status(400).json({ error: "Theme is required" });
    }

    const client = getAIClient();
    const prompt = `
      You are ClipPro AI's smart visual prompt generator. Recommend 3 distinct prompts for an AI image/video generator (like Veo or Imagen) that fit this theme:
      Theme: ${theme}
      Style: ${style || "cinematic, 4k, hyper-detailed"}

      Provide the response in structured JSON format with the following schema:
      {
        "suggestions": [
          {
            "type": "image" or "video",
            "prompt": "The detailed creative prompt",
            "description": "What this scene represents in the edit",
            "aspect": "16:9" or "9:16"
          }
        ]
      }
      Do NOT include any markdown block fences, return only raw valid JSON.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in /api/generate-assets-prompts:", error);
    res.status(500).json({ error: error.message || "Failed to generate visual prompts." });
  }
});

// Start server and handle Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ClipPro AI Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
