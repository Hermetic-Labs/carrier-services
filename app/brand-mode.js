"use strict";
(() => {
  const replacements = [
    [/CARRIER/g, "HERMETIC LABS"],
    [/g, "Hermetic Labs Courier"],
    [/SEVEN MILES(?: MEDICAL LOGISTICS)?/g, "HERMETIC LABS COURIER"],
    [/Seven Miles(?: Medical Logistics)?/g, "Hermetic Labs Courier"],
  ];

  const rewriteNode = (node) => {
    let next = node.data;
    for (const [pattern, replacement] of replacements) {
      next = next.replace(pattern, replacement);
    }
    if (next !== node.data) node.data = next;
  };

  const rewriteText = (root) => {
    if (root.nodeType === Node.TEXT_NODE) {
      rewriteNode(root);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) rewriteNode(node);
  };

  document.title = "Hermetic Labs Courier";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "Secure Hermetic Labs courier operations workspace.";
  rewriteText(document.body);

  document.querySelectorAll('a[href*="comparison"]').forEach((link) => {
    link.href = "./?destination=business";
    if (!link.classList.contains("brand")) link.remove();
  });

  for (const delay of [0, 250, 1000, 3000, 7500]) {
    window.setTimeout(() => rewriteText(document.body), delay);
  }
})();
