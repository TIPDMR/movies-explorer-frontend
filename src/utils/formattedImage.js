import { MOVIES_API_URI } from "../constants/constApiUri";

export const formattedImage = (imageUrl) => `${MOVIES_API_URI}/${imageUrl}`;
