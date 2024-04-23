import axios from 'axios';
import { ENDPOINTS } from "../config";
import { getConfigValue } from "../lib";

require('dotenv').config()
export const API = async (path: ENDPOINTS, query?: string) => {
  try {
    const config = await getConfigValue();
    const FIGMA_FIELD_ID = config.figma.fieldId;
    const FIGMA_PERSONAL_TOKEN = process.env.FIGMA_PERSONAL_TOKEN;
    if (!FIGMA_PERSONAL_TOKEN) {
      throw new Error('FIGMA_PERSONAL_TOKEN is not set');
    }
    if (!FIGMA_FIELD_ID) {
      throw new Error('FIGMA_FIELD_ID is not set');
    }
    const url = path === ENDPOINTS.IMAGES ? `https://api.figma.com/v1${path}/${FIGMA_FIELD_ID}${query ? query : ''}`
      :
      `https://api.figma.com/v1/files/${FIGMA_FIELD_ID}${path}${query ? query : ''}`;
    const response = await axios.get(url, {
      headers: {
        'X-Figma-Token': FIGMA_PERSONAL_TOKEN
      }

    });
    return response.data
  } catch (error) {
    console.error('Error during API call', error);
    return error;
  }
}
