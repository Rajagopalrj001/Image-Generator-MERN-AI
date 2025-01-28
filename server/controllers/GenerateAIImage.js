// import * as dotenv from "dotenv";
// import {createError} from "../error.js";
// import {Configuration, OpenAIApi} from "openai";

// dotenv.config();

// //Setup openAI api key
// const  configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// //Controller to generate Image

// export const generateImage = async(req,res,next) =>{
//   try{
//     const {prompt} = req.body;

//     const response = await openai.createImage({
//       prompt,
//       n:1,
//       size:"1024x1024",
//       response_format:"b64_json",
//     });

//     const generatedImage = response.data.data[0].b64_json;
//     return res.status(200).json({photo:generateImage});

//   }catch(error){
//     next(
//       createError(  
//         error.status,
//         error?.response?.data?.error?.message || error?.message)
//     )
//   }
// }


import axios from "axios";
import {createError} from "../error.js";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required to generate an image"));
    }

    // Cloudflare API Endpoint and Configuration
    const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/accounts/3bc67ed694f3e27e7421452275e0623b/ai/run/@cf/black-forest-labs/flux-1-schnell`;

    const response = await axios.post(
      CLOUDFLARE_API_URL,
      {
        prompt, // Cloudflare API expects this input
      },
      {
        headers: {
          Authorization: `Bearer F2raT4mn7yOftzqwA9Taeoh4yOtq5edc3blyyB5_`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      const generatedImage = response.data.result.image.trim(); // Ensure no spaces
      return res.status(200).json({ photo: `data:image/jpeg;base64,${generatedImage}` });
    } else {
      console.error("Cloudflare API Error Response:", response.data);
      return next(createError(500, "Failed to generate image using Cloudflare API"));
    }
  } catch (error) {
    console.error("Error during image generation:", error.message || error.response?.data);
    next(createError(500, error.response?.data?.errors || error.message || "Failed to generate image"));
  }
};

