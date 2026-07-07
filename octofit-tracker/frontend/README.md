# OctoFit Frontend

React 19 presentation tier powered by Vite and react-router-dom.

## Environment variable

Define `VITE_CODESPACE_NAME` for Codespaces API routing.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the app calls:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`

This prevents invalid URLs such as `https://undefined-8000.app.github.dev/...`.
