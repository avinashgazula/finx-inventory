export const layoutTester = async (searchParams: Record<string, string>) => {
  const params = await searchParams;

  if (typeof params.loading !== "undefined") {
    console.log("loading");

    const loading = parseInt(params.loading || "2000");
    await new Promise((resolve) => setTimeout(resolve, loading));
  }

  if (typeof params.error !== "undefined") {
    const error = params.error || "Something went wrong!";
    await new Promise((_resolve, reject) => reject(error));
  }
};

export async function simulateAsyncCall(delay = 1500) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const data = { message: "Database information loaded!" };
  return data;
}
