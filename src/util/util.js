export const isObject = obj => {
    return obj !== null && obj && typeof obj == 'object' && !Array.isArray(obj);
}