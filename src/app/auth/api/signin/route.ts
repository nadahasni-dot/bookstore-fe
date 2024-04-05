import { API_VERSION, BASE_URL, ENDPOINTS } from "@/constants/api";
import { SignInResponse } from "@/types/response/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const response = await fetch(
    `${BASE_URL}${API_VERSION}${ENDPOINTS.AUTH.SIGNIN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const signInResponse: SignInResponse = await response.json();

  const cookiesStore = cookies();
  cookiesStore.set("token", signInResponse.data.token || "");

  return Response.json(signInResponse, {
    status: 201,
  });
}
