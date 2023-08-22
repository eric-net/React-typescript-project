import { apiConfig } from "../authConfig";

/**
 * Attaches a given access token to an API call. Returns information about the user
 */
export async function fetchApi(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    try {
        const response = await fetch(apiConfig.userListApi, options)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

