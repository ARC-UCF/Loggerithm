import { getRequest } from "../Requests";

export async function getRecentConctacts() {
    try {
        const packet = await getRequest("/recent-contacts");

        if (!packet.ok) {
            throw new Error("Request failed");
        }

        if (packet.status !== 200) {
            throw new Error("An error occurred while trying to get recent contacts");
        }

        console.log(packet);

        return packet.data;
    } catch (err: any) {
        throw new Error(`Error: ${err}`);
    }
}