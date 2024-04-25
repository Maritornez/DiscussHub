//const WebAPI_URL = "http://localhost:5000/api/";
const WebAPI_URL = "https://localhost:44343/api/";
const URL_BASE = WebAPI_URL + "Post/";

export default class PostService {
    static async getAll() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch(URL_BASE, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch posts");
                return [];
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error while fetching posts:", error);
            return [];
        }
    }

    // static async getPage(limit = 10, page = 1) {
    //     try {
    //         const requestOptions = {
    //             method: "GET",
    //             headers: {"Content-Type": "application/json"},
    //         };

    //         const response = await fetch(URL_BASE + `?limit=${limit}&page=${page}`, requestOptions);
    //         if (!response.ok) {
    //             console.error("Failed to fetch posts");
    //             return [];
    //         }
    //         return await response.json();
    //     }
    //     catch (error) {
    //         console.error(`Error while fetching posts on page ${page}:`, error);
    //         return [];
    //     }
    // }
    
}