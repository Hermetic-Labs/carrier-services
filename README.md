# Hermetic Labs Carrier Services site

Public static site for `https://7hermeticlabscarrier.services`.

## Boundary

- This repository contains only public marketing, status, contact, privacy, and terms content.
- It does not contain the private operating dashboard, client portal, credentials, protected data, lender documents, driver records, or patient information.
- Launch-preparation language must remain explicit until the corresponding operating gate has been verified.

## Hosting

The site is intended for GitHub Pages from the repository root. `CNAME.pending` records the approved canonical custom domain without activating it prematurely. After the domain's DNS points to GitHub Pages and resolves publicly, rename that file to `CNAME`, remove the temporary `noindex` directive from the home page, and verify HTTPS before retiring the predecessor page.

## Logo handoff

The first release intentionally uses a text wordmark. Add the founder-approved logo as a separate reviewed change without altering the service-readiness language.
