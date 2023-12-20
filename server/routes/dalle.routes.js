o.config();
import e from "express";
import o from "dotenv";
import t from "openai";

let router = e.Router(),
  openai = new t({apiKey: process.env.OPENAI_API_KEY});

router.route("/").post(async (e, o) => {
  try {
    let {prompt: t} = e.body;
    console.log("Received prompt:", t);
    let r = await openai.images.generate({
      prompt: t,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(r);
    if (!r.data || !Array.isArray(r.data) || r.data.length === 0)
      throw new Error("No image data found in the OpenAI API response");
    let a = r.data[0].b64_json; 
    o.status(200).json({photo: a});
  } catch (n) {
    console.error(n);
    o.status(500).json({message: "Something went wrong", error: n.message});
  }
});

export default router;
