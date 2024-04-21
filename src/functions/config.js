export const env = (name) => {
    name = `VITE_${name}`.toUpperCase();
    if (import.meta.env[name] === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return import.meta.env[name];
}

export const API_URL = env('API_URL');