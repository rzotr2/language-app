import {createClient, type ErrorResponse, type PhotosWithTotalResults} from 'pexels';

const token = import.meta.env.VITE_PEXELS_APIKEY;

const client = createClient(token);
const query = "people"
const perPage = 15;

export const getRandomImage = async () => {
    const firstPage = await client.photos.search({ query, per_page: 1, page: 1 });

    if ((firstPage as ErrorResponse).error) {
        throw (new Error("ERROR IMAGE"));
    } else {
        const totalResults = (firstPage as PhotosWithTotalResults).total_results;

        const randomIndex = Math.floor(Math.random() * totalResults);

        const page = Math.floor(randomIndex / perPage) + 1;
        const indexOnPage = randomIndex % perPage;

        return (await client.photos.search({query, per_page: perPage, page}) as PhotosWithTotalResults).photos[indexOnPage];
    }
};
