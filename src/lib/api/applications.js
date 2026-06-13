import { serverFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
    return await serverFetch(`/api/applications?applicantId=${applicantId}`);
}