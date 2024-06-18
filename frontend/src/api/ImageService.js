import WebAPI_URL from "../config.js";
const URL_BASE = WebAPI_URL + "Image/";

export default class ImageService {
    static async upload(formData) {
        try {
            const response = await fetch(URL_BASE, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (!response.ok) {
                console.error("Failed to fetch image. Bad responce");
                return {};
            }
            return response.data;
        } catch(error) {
            console.error("Error while fetching image:", error);
        }
    }

    static async getFileByPostId(postId) {
        try {
            const response = await fetch(URL_BASE + "GetFileByPostId/" + postId.toString(),{
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                return null;
            }
            const blob = await response.blob(); // Получаем бинарные данные
            return URL.createObjectURL(blob); // Создаем объект URL для использования в <img> или других тегах
        } catch (error) {
            console.error("Error while fetching image:", error);
            return null;
        }
    }
}