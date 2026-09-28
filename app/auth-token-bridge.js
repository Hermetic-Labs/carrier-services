"use strict";
(() => {
  const tokenKey = "carrier.api.access-token";
  const apiBase = "https://hermetic-labs-gateway.azure-api.net/carrier/";
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    try {
      const target = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (target.startsWith(apiBase)) {
        const headers = new Headers(input instanceof Request ? input.headers : undefined);
        new Headers(init && init.headers ? init.headers : undefined).forEach((value, name) => headers.set(name, value));
        const authorization = headers.get("authorization") || "";
        if (/^Bearer\s+\S+$/i.test(authorization)) {
          sessionStorage.setItem(tokenKey, authorization.replace(/^Bearer\s+/i, ""));
        }
      }
    } catch {}
    return nativeFetch(input, init);
  };
})();
