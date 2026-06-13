import { serverFetch } from "../core/server";

export const getPlanById = async (planId) => {
    return await serverFetch(`/api/plans?plan_id=${planId}`);
}