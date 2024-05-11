import WebAPI_URL from "../config.js";

const URL_BASE = WebAPI_URL + "Thread/";

export default class ThreadService {
    static async getAll() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch threads");
                return [];
            }
            return await response.json();
        } catch (error){
            console.error("Error while fetching threads:", error);
            return [];
        }
    }

    // static async getAllWithoutPosts() {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {"Content-Type": "application/json"},
    //         credentials: 'include',
    //     };

    //     const response = await fetch(URL_BASE + "WithoutPosts/", requestOptions);
    // }

    static async get(id) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE + id, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch thread");
                return {};
            }
            return await response.json();
        } catch (error) {
            console.error("Error while fetching thread:", error);
            return {};
        }
    }

    static async getOnlyWithOriginalPost(id) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const response = await fetch(URL_BASE + "OnlyWithOriginalPost/" + id, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch thread");
                return {};
            }
            return await response.json();
        } catch (error) {
            console.error("Error while fetching thread:", error);
            return {};
        }
    }

    static async create(thread) {
        try {
            // Опции запроса на сервер. В body хранится объект для создания
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(thread),
                credentials: 'include',
            };

            // Вызов метода WebAPI
            const response = await fetch(URL_BASE, requestOptions);

            // Обработка ответа от WebAPI
            const data = await response.json();
            // Если ответ 200-299 и создание прошло успешно
            if (response.ok) {
                return data;
            } else {
                throw new Error("Failed to create thread");
            }
        } catch (error) {
            console.error("Error while creating thread:", error);
            throw error;
        }
    }

    static async update(thread) {
        try {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(thread),
                credentials: 'include',
            };

            const response = await fetch(URL_BASE + thread.id.toString(), requestOptions);
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw new Error("Failed to update thread");
            }
        } catch (error) {
            console.error("Error while updating thread:", error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            };
    
            const response = await fetch(URL_BASE + id.toString(), requestOptions);
            if (!response.ok) {
                console.error("Failed to delete thread");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error while deleting thread:", error);
            return false;
        }
    }

}