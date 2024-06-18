import WebAPI_URL from "../config.js";

const URL_BASE = WebAPI_URL + "Rating/";

export default class RatingService {
    static async getPositivesCountByThreadId(threadId) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const fetchString = URL_BASE + "CountPositive/" + threadId.toString();
            const response = await fetch(fetchString, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch rating");
                return -1;
            }
            const textResponse = await response.text();
            return parseInt(textResponse, 10); // Преобразование строки в число с основанием 10
        } catch (error) {
            console.error("Error while fetching rating:", error);
            return -1;
        }
    }

    static async getNegativesCountByThreadId(threadId) {
        try {
            const requestOptions = {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
            };

            const fetchString = URL_BASE + "CountNegative/" + threadId.toString();
            const response = await fetch(fetchString, requestOptions);
            if (!response.ok) {
                console.error("Failed to fetch rating");
                return -1;
            }
            const textResponse = await response.text();
            return parseInt(textResponse, 10); // Преобразование строки в число с основанием 10
        } catch (error) {
            console.error("Error while fetching rating:", error);
            return -1;
        }
    }

    static async addRating(threadId, userId, isPositive) {
        try {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    threadId: threadId,
                    userId: userId,
                    isPositive: isPositive
                }),
                credentials: 'include',
            };

            const response = await fetch(URL_BASE, requestOptions);
            if (!response.ok) {
                console.error("Failed to add rating");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error while adding rating:", error);
            return false;   
        }
    }
}
