"use strict";
(() => {
  const launch = document.querySelector("#open-command");
  if (!launch) return;
  const parameters = new URLSearchParams(location.search);
  const requested = parameters.get("destination");
  const destination = ["business", "client"].includes(requested) ? requested : "business";
  const target = `./${destination}/`;
  const labels = { business: "Open courier launch control", client: "Open client portal" };
  launch.href = target;
  launch.textContent = labels[destination];
  const enter = () => sessionStorage.setItem("carrier.portal.authorized", "1");
  launch.addEventListener("click", enter);
  const continueToTarget = () => {
    if (document.body.dataset.authState !== "authorized" || !requested) return;
    enter();
    location.replace(target);
  };
  new MutationObserver(continueToTarget).observe(document.body, { attributes: true, attributeFilter: ["data-auth-state"] });
  continueToTarget();
})();
