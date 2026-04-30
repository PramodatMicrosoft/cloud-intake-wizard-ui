# Cloud Intake Wizard UI

React + Vite + TypeScript frontend matching the JDCP Cloud Intake Wizard screenshots.

This project replaces the Chainlit UI shipped with `gpt-rag-ui`. It is intended to live
in your fork of `gpt-rag-ui` (`PramodatMicrosoft/cloud-intake-wizard-ui`), replacing the
existing `app.py` / Chainlit assets with a static SPA served by a slim FastAPI backend.

## Layout

- Header: JDCP / PCID branding, user menu, EN/FR toggle.
- Tabs: `Chat` (default) and `My requests`.
- Left column: "How to fill the intake form", Helpful links, FAQ accordion.
- Right column: Intake Assistant chat panel (Text / Voice toggle, quick-start chips, message input).
- Footer: "For official use - Government of Canada / Department of National Defence".

## Backend contract

POST  /api/chat                  - send a user message; SSE stream of assistant chunks
GET   /api/requests              - list current user's intake requests (admin sees all)
GET   /api/requests/:id          - request detail
GET   /api/faq?lang=en           - FAQ entries (from AI Search via orchestrator pass-through)
GET   /api/me                    - current user info (Entra ID)

All endpoints require a bearer token from Entra ID. Standard users only see requests
where `userId == me.userId`; admin users (group claim `JDCP-Admins`) see all.

## Local dev

    npm install
    npm run dev

## Build

    npm run build
    # outputs static assets to ./dist
