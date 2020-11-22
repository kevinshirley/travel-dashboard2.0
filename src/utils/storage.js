const storage = storageObj => key =>
  typeof window !== "undefined" && storageObj
    ? {
        set: item => {
          storageObj.setItem(key, JSON.stringify(item));
          return item;
        },
        get: () => {
          const val = storageObj.getItem(key);
          return JSON.parse(val);
        },
      }
    : { set: () => {}, get: () => {} };

export const sessionStore = storage(process.env.CLIENT ? window.sessionStorage : {});
export const localStore = storage(typeof window !== "undefined" ? window.localStorage : {});
