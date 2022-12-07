import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalize, denormalize } from "normalizr";
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getMessagesFiles = (pathFile) => {

  try {
    
    const inputPath = path.join(__dirname, pathFile);
    const dataFile = JSON.parse(fs.readFileSync(inputPath), 'utf-8');
    return dataFile;

  } catch (error) {
    return error
  }
}

export const getAllMessages = () => {
  const data = getMessagesFiles('../data/mensajes.json');
  return data;
}

export const normalizerData = (finalSchema) => {

  const data = getMessagesFiles('../data/mensajes.json');
  //genero un id aleatorio con uuid para relacionar el schema del mensaje con un id
  const dataNormalize = normalize(data.map(row => ({ ...row, id: uuidv4() })), finalSchema);
  const inputPath = path.join(__dirname, '../data/mensajes-normalizados.json');
  let container = JSON.stringify(dataNormalize, null, '\t');
  fs.writeFileSync(inputPath, container);

  return dataNormalize;
}

export const denormalizerData = (finalSchema) => {

  const data = getMessagesFiles('../data/mensajes-normalizados.json');
  const denormalizedData = denormalize(
    data.result,
    finalSchema,
    data.entities
  );
  return denormalizedData;
}

