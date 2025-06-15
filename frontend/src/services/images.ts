import type { FirstPageType, PexelsResponse } from "../types";

const token: string = import.meta.env.VITE_PEXELS_APIKEY;

const query = "people"
const perPage = 15;

export const getRandomImage = async () => {
    const firstPage: FirstPageType = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
            "Authorization": token
        }
    }).then(res => res.json());

    const totalResults = firstPage.total_results;

    const randomIndex = Math.floor(Math.random() * totalResults);

    const page = Math.floor(randomIndex / perPage) + 1;
    const indexOnPage = randomIndex % perPage;

    const response: PexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`, {
        headers: {
            "Authorization": token
        }
    }).then(res => res.json());

    return response.photos[indexOnPage];
};
