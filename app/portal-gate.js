"use strict";
if (sessionStorage.getItem("carrier.portal.authorized") !== "1" || !sessionStorage.getItem("carrier.api.access-token")) {
  const destination = location.pathname.split("/").filter(Boolean).at(-1) || "business";
  location.replace(`../?destination=${encodeURIComponent(destination)}`);
}
