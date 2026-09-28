# Hermetic Labs Carrier Services site

Public static site for `https://7hermeticlabscarrier.services`.

## Boundary

- The repository root contains the public GitHub Pages site, the static Microsoft Entra sign-in shell, and compiled browser assets for the role-gated business and client workspaces.
- Application source is maintained separately in the private `carrier-services-source` repository. This public repository contains no server source, credentials, tokens, patient information, lender documents, driver records, or protected operating data.
- Launch-preparation language must remain explicit until the corresponding operating gate has been verified.

## Hosting

The site is published from the repository root to `https://7hermeticlabscarrier.services` with HTTPS enforced. Compiled application shells are generated from the private source repository and copied here as release artifacts.

## Logo handoff

The first release intentionally uses a text wordmark. Add the founder-approved logo as a separate reviewed change without altering the service-readiness language.
