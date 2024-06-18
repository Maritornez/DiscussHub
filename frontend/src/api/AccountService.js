import WebAPI_URL from "../config.js";
const URL_BASE = WebAPI_URL + "account/";

export default class AccountService {

    static async editEmail(email) {
        try {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(email),
                credentials: 'include'
            };

            const response = await fetch(URL_BASE + "EditEmail/", requestOptions);
            if (!response.ok) {
                return null;
            }
            return response.data;
        } catch (error) {
            console.error("Error while fetching image:", error);
            return null;
        }
    }

    static async editPassword(password) {
        try {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(password),
                credentials: 'include'
            };

            const response = await fetch(URL_BASE + "EditPassword/", requestOptions);

            if (!response.ok) {
                return null;
            }
            return response.data;   
        } catch (error) {   
            console.error("Error while fetching image:", error);
            return null;
        }
    }
}
