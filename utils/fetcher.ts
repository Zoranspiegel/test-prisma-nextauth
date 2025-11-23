export async function fetcher(input: string | URL | Request) {
  const response = await fetch(input);

  return response.json();
}
