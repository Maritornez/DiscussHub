import WebAPI_URL from "../config.js";

const URL_BASE = WebAPI_URL + "Post/";

export default class PostService {
    static async getAll() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch posts");
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error("Error while fetching posts:", error);
            return [];
        }
    }

    static async get(id) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE + id, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch post");
                return {};
            }
            return await response.json();
        } catch (error) {
            console.error("Error while fetching post:", error);
            return {};
        }
    }

    static async getByThreadId(id) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE + "WithThreadId/" + id, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch posts");
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error("Error while fetching posts:", error);
            return [];
        }

    }

    // static async getPage(limit = 10, page = 1) {
    //     try {
    //         const requestOptions = {
    //             method: "GET",
    //             headers: {"Content-Type": "application/json"},
    //             credentials: 'include'
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
    
    static async create(post) {
        try {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post),
                credentials: 'include'
            };

            // Вызов метода WebAPI
            const response = await fetch(URL_BASE, requestOptions);
            // Обработка ответа от WebAPI
            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.error("Error while creating post:", error);
            throw error;
        }
    }

    static async update(post) {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post),
                credentials: 'include'
            };

            const response = await fetch(URL_BASE + post.id.toString(), requestOptions);
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw new Error("Failed to update post");
            }
        } catch (error) {
            console.error("Error while updating post:", error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };
            
            const response = await fetch(URL_BASE + id, requestOptions);
            if (!response.ok) {
                console.error("Failed to delete post");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error while deleting post:", error);
            return false;
        }
    }
}