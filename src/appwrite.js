import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

//creating appwrite client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)

//creating database instance
const database = new Databases(client);
export const updateSearchCount = async (searchTerm, movie) => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
    // 1. use appwrite sdk to check if the searchTerm exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)])

        if (result.documents.length > 0) {
            // If it exists, increment the count by 1
            const doc = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                doc.$id,
                {
                    count: doc.count + 1,
                })
        }
        else {
            // If it does not exist, create a new document with count 1
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                })
        }
    }
    catch (error) {
        console.error('Error updating search count:', error);
    }
    // 2. if it exists, increment the count by 1
    // 3. if it does not exist, create a new document with count 1
}

export const getPopularMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc('count')]);
        if (result.documents.length > 0) {
            return result.documents;
        }
    }
    catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}