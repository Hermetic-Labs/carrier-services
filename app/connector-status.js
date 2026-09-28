"use strict";
(() => {
  const panel = document.querySelector("#connector-panel");
  const list = document.querySelector("#connector-list");
  const status = document.querySelector("#connector-status");
  const role = document.querySelector("#member-role");
  if (!panel || !list || !status || !role) return;

  const providerLabels = { onfleet: "Onfleet", bringg: "Bringg", detrack: "Detrack V2" };
  let loading = false;
  let loaded = false;

  const stateLabel = (profiles) => {
    if (!profiles.length) return { label: "Adapter ready · credentials pending", tone: "pending" };
    if (profiles.some((profile) => profile.state === "unavailable" || profile.state === "degraded")) {
      return { label: "Attention required", tone: "warning" };
    }
    if (profiles.some((profile) => profile.state === "healthy")) {
      return { label: "Connected", tone: "connected" };
    }
    return { label: "Profile configured", tone: "pending" };
  };

  const renderProvider = (capability, profiles) => {
    const item = document.createElement("li");
    item.className = "connector-card";

    const heading = document.createElement("div");
    heading.className = "connector-card__heading";
    const name = document.createElement("strong");
    name.textContent = providerLabels[capability.provider] || capability.provider;
    const readiness = stateLabel(profiles);
    const badge = document.createElement("span");
    badge.className = `connector-state connector-state--${readiness.tone}`;
    badge.textContent = readiness.label;
    heading.append(name, badge);

    const operations = capability.operations || [];
    const supported = operations.filter((operation) => operation.support === "supported").length;
    const conditional = operations.filter((operation) => operation.support === "conditional").length;
    const facts = document.createElement("div");
    facts.className = "connector-card__facts";
    for (const fact of [
      `${supported} supported operation${supported === 1 ? "" : "s"}`,
      `${conditional} explicit provider boundar${conditional === 1 ? "y" : "ies"}`,
      capability.webhook && capability.webhook.supported ? "Verified webhook ingress" : "No webhook ingress",
    ]) {
      const value = document.createElement("span");
      value.textContent = fact;
      facts.append(value);
    }

    const detail = document.createElement("p");
    if (profiles.length) {
      const backlog = profiles.reduce((sum, profile) => sum + profile.inboxBacklog + profile.outboxBacklog, 0);
      const deadLetters = profiles.reduce((sum, profile) => sum + profile.deadLetterCount, 0);
      detail.textContent = `${profiles.length} active profile${profiles.length === 1 ? "" : "s"} · ${backlog} queued · ${deadLetters} requiring review`;
    } else {
      const firstBoundary = operations.find((operation) => operation.support === "conditional")?.conditions?.[0];
      detail.textContent = firstBoundary || "The adapter is locally verified and waiting for a provider-controlled credentialed run.";
    }

    item.append(heading, facts, detail);
    return item;
  };

  const load = async () => {
    if (document.body.dataset.authState !== "authorized" || loading || loaded) return;
    if (!/^(dispatcher|administrator)$/.test(role.textContent.trim())) return;
    panel.hidden = false;
    const token = sessionStorage.getItem("carrier.api.access-token");
    if (!token) {
      status.textContent = "Waiting for the authenticated API session…";
      return;
    }

    loading = true;
    status.textContent = "Loading governed connector capabilities…";
    try {
      const apiBase = panel.dataset.apiBase.replace(/\/$/, "");
      const organizationId = panel.dataset.organizationId;
      const response = await fetch(
        `${apiBase}/organizations/${organizationId}/capabilities/carrier.integrations.status`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
            "x-ms-client-request-id": crypto.randomUUID(),
            "x-carrier-organization-id": organizationId,
          },
          body: "{}",
        },
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error?.message || `Connector status returned ${response.status}.`);

      const result = payload && payload.result;
      if (!result || !Array.isArray(result.providerCapabilities) || !Array.isArray(result.connectors)) {
        throw new Error("The connector capability response was incomplete.");
      }
      list.replaceChildren(...result.providerCapabilities.map((capability) => renderProvider(
        capability,
        result.connectors.filter((profile) => profile.provider === capability.provider && profile.profileStatus === "active"),
      )));
      status.textContent = `Server-governed contract · refreshed ${new Date(result.generatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
      loaded = true;
    } catch (error) {
      status.textContent = error instanceof Error
        ? `Connector status is temporarily unavailable: ${error.message}`
        : "Connector status is temporarily unavailable.";
    } finally {
      loading = false;
    }
  };

  new MutationObserver(() => void load()).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-auth-state"],
  });
  void load();
})();
