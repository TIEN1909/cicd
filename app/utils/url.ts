const buildEndpoint = (path: string) => {
  const BASE = process.env.NEXT_PUBLIC_API_ENDPOINT;

  return `${BASE}${path}`;
};

export default buildEndpoint;
