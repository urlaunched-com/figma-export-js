import axios from 'axios';
import { ENDPOINTS } from "../config";

require('dotenv').config()
export const API = async (path: ENDPOINTS, query?: string) => {
  try {
    const url = path === ENDPOINTS.IMAGES ? `https://api.figma.com/v1${path}/${process.env.FIGMA_FIELD_ID}${query ? query : ''}`
      :
      `https://api.figma.com/v1/files/${process.env.FIGMA_FIELD_ID}${path}${query ? query : ''}`;
    const response = await axios.get(url, {
      headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN
      }

    });
    return response.data
  } catch (error) {
    console.error('Error during API call', error);
    return error;
  }
}
