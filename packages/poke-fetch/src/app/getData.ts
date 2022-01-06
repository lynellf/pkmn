import 'isomorphic-fetch';

type FetchResp = globalThis.Response;
type Fail = Error | null;
type Response<T> = [T, Fail];

export async function parseResponse<T>(resp: FetchResp) {
  const data = await resp.json();
  return [data, null] as [T, null | Error];
}

export function parseErr(error: Error) {
  return [null, error] as [null, Error];
}

export async function getData<T>(url: string) {
  const response = (await fetch(url)
    .then(parseResponse)
    .catch(parseErr)) as Response<T>;

  return response;
}
