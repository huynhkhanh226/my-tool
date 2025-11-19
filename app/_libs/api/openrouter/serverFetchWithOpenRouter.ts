
export async function serverFetchWithOpenRouter(
  path: RequestInfo,
  init: RequestInit = {},
): Promise<Response> {
  const accessToken = `${process.env.OPENROUTER_API_KEY}`;
  console.log("init", `${process.env.OPENROUTER_BASE_URL}/${path}`);
  const requestInit: RequestInit = {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  };
  
  const res = await fetch(
    `${process.env.OPENROUTER_BASE_URL}/${path}`,
    requestInit
  );
  if (!res.ok) {
    console.log("res", res)
    throw new Error("Max retries exceeded");
  }
  return res;
}
