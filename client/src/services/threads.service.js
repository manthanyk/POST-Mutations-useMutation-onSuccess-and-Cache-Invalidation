import apiClient from "../lib/apiClient";

/**
 * Fetch all threads (used by ThreadList via useQuery)
 * GET /api/threads
 */
export function fetchThreads(params = {}) {
  return apiClient
    .get("/api/threads", { params })
    .then((res) => res.data);
}

/**
 * Create a new thread (used by CreateThreadForm via useMutation)
 * POST /api/threads
 * @param {{ title: string, body: string }} newThread
 */
export function createThread(newThread) {
  return apiClient
    .post("/api/threads", newThread)
    .then((res) => res.data);
}
