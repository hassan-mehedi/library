import axios from "axios";

async function getNewAccessToken() {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";

    const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refreshToken);
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);

    try {
        const response = await axios.post(tokenEndpoint, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to obtain access token:", response.status, response.data);
            return null;
        }
    } catch (error) {
        console.error("Error while getting the access token:", error);
        return null;
    }
}

export { getNewAccessToken };
