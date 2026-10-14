const { GoogleGenAI } = require("@google/genai");
const Blog = require("../models/Blog");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAI = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Write a short blog about: ${prompt}`,
    });

    const generatedBlog = response.text;
const savedBlog = await Blog.create({
  userID: req.user.id,
  name: prompt,
  photo: "",
  message: generatedBlog
});
    res.status(200).json({
      message: "AI blog generated successfully",
      prompt,
      blog: generatedBlog,
      savedBlog: savedBlog
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { generateAI };