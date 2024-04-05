import { cookies } from "next/headers";

export async function POST() {
  const cookiesStore = cookies();
  cookiesStore.delete("token");

  return Response.json(
    {
      code: 201,
      success: true,
      message: "Success Signout",
      data: null,
    },
    {
      status: 201,
    }
  );
}
