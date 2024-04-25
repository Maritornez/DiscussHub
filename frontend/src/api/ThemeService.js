//const WebAPI_URL = "http://localhost:5000/api/";
const WebAPI_URL = "https://localhost:44343/api/";
const URL_BASE = WebAPI_URL + "Theme/";


export default class ThemeService {
    static async getAll() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch(URL_BASE, requestOptions);
            if (!response.ok) { // HTTP-коды 200-299
                console.error("Failed to fetch themes");
                return [];
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error while fetching themes:", error);
            return [];
        }
    }

    static async getAllWithoutThreads() {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch(URL_BASE + "WithoutThreads/", requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch themes");
                return [];
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error while fetching themes:", error);
            return [];
        }
    }

    static async get(id) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch(URL_BASE + id.toString(), requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch theme");
                return [];
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error while fetching themes:", error);
            return [];
        }
    }

    static async getByName(name) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            };

            const response = await fetch(URL_BASE + name, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch theme");
                return [];
            }
            return await response.json();
        }
        catch (error) {
            console.error("Error while fetching theme:", error);
            return [];
        }
    }

    static async create(theme) {
        try {
            // Опции запроса на сервер. В body хранится объект для создания
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(theme),
            };

            // Вызов метода API
            const response = await fetch(URL_BASE, requestOptions);

            // Обработка ответа от API
            const data = await response.json();
            // Если ответ 200-299 и создание прошло успешно
            if (response.ok) {
                return data;
            } else {
                throw new Error("Failed to create theme");
            }
        } catch (error) {
            console.error("Error while creating theme:", error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            };
    
            const response = await fetch(URL_BASE + id.toString(), requestOptions);
            if (!response.ok) {
                console.error("Failed to delete theme");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error while deleting theme:", error);
            return false;
        }
    }
}