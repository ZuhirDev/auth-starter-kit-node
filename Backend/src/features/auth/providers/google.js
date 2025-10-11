import CONFIG from "#config/config.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(CONFIG.GOOGLE_CLIENT_ID);

export const verifyOAuthGoogle = async (token) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CONFIG.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    return { email, name, avatar: picture };
}