export const formatErrors = (error: string) => {
  const result = error.split(":");
  return result[result.length - 1];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
