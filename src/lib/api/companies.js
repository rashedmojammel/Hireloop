import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}

export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user?.id);
}