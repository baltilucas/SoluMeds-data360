import express from "express";
import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";

const router = express.Router();
const textract = new TextractClient({ region: "us-east-1" });

router.post("/extract-text", async (req, res) => {
  try {
    const { imageBase64 } = req.body; // Recibe la imagen en base64

    if (!imageBase64) {
      return res.status(400).json({ message: "Falta la imagen en base64" });
    }

    const documentBytes = Buffer.from(imageBase64, "base64");

    const command = new DetectDocumentTextCommand({
      Document: { Bytes: documentBytes },
    });

    const response = await textract.send(command);

    return res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error extrayendo texto" });
  }
});

export default router;
