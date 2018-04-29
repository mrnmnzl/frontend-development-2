import path from "path";

const BASE_URL = "https://ergast.com/api/f1";

export const defaults = {format: 'json', limit: 10, offset: 0};

export function resource(path, {format, limit, offset} = defaults) {
    const url = `${BASE_URL}/${path}.${format}?limit=${limit}&offset=${offset}`;
    return fetch(url)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(res => res.json())
}
