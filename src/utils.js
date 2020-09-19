export const pause = (time = 1000) =>
    new Promise((res) => setTimeout(res, time));

export const bool = (x) => (x ? 1 : 0);
