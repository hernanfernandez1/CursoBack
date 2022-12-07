import { getAllMessages, normalizerData, denormalizerData } from "../models/messages.js";
import { schema } from "normalizr";

const author = new schema.Entity("author", {});

const msg = new schema.Entity("message", { author: author });

const finalSchema = new schema.Array(msg);

export const getMessages = async (req, res) => {
  try {

    const messages = await getAllMessages();

    if (!messages) {
      return res.status(404).json({
        mensaje: "No hay mensajes para mostrar",
      });
    }

    return res.status(200).json({
      data: messages,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getNormalizedMessages = async (req, res) => {
  try {
    let normalizedMessages = normalizerData(finalSchema);

    if (!normalizedMessages) {
      return res.status(404).json({
        mensaje: "No hay mensajes normalizados para mostrar",
      });
    }

    return res.status(200).json({
      data: normalizedMessages,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getDenormalizedMessages = async (req, res) => {
  try {
    const denormalizedData = await denormalizerData(finalSchema);
    
    if (!denormalizedData) {
      return res.status(404).json({
        mensaje: "No hay mensajes desnormalizados para mostrar",
      });
    }

    return res.status(200).json({
      data: denormalizedData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
