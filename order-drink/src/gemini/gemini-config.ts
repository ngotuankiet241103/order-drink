import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai" ;
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { Buffer } from "buffer";



  const apiKey = "AIzaSyBs9pLzRpspLtJ7Q3Qtl5uYOyYmUpCdGwc";
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  /**
   * Uploads the given file to Gemini.
   *
   * See https://ai.google.dev/gemini-api/docs/prompting_with_media
   */
  async function uploadToGemini(path: string  , mimeType: string) {
    console.log(path);
    
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: "demo.jpg",
    });
    console.log(uploadResult);
    
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export async function run(path: string) {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini(path, "image/jpeg"),
    ];
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("chuyển sang json ");
    console.log(result.response.text());
  }
  
