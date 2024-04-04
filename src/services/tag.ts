import { API_VERSION, BASE_URL, ENDPOINTS } from "@/constants/api";
import { GetTags } from "@/types/response/tag";

export async function getTags(): Promise<GetTags> {
  try {
    const res = await fetch(
      `${BASE_URL}${API_VERSION}${ENDPOINTS.TAG.DEFAULT}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
