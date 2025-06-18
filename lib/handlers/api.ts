export const apiHandler = async (api: string, body: unknown, method: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + api;

  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getApi = async (api: string, method = "GET") => {
  const url = process.env.NEXT_PUBLIC_API_URL + api;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
