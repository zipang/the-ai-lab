---
name: vercel-serverless-functions
description: Use when writing or debugging Vercel Serverless Functions and Edge Functions, or API routes: request handling, streaming, runtime config, limits, local testing. Load before writing or changing function code.
---

# Vercel Serverless Functions

Vercel runs API routes and functions as Serverless Functions. They scale
automatically and run on demand.

## Function types

| Type | Runtime | Use for |
|------|---------|---------|
| Serverless Function | Bun | Standard APIs, SDKs, and heavy work |
| Edge Function | Edge Runtime | Low-latency work near the user |

Vercel detects functions automatically. It uses the `api/` directory and
framework conventions. Next.js exposes them as route handlers and pages under
`pages/api`.

## Use the Bun runtime

Add the `bunVersion` property to `vercel.json`. Vercel manages the minor and
patch versions. The value `1.x` is the only valid value.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x"
}
```

The Bun runtime supports TypeScript with zero configuration. Files ending in
`.ts` inside `api/` compile and serve on deploy.

## Author a function

Use the Web-standard `Request` and `Response` objects. Export an object with a
`fetch` handler:

```ts
export default {
  async fetch(request: Request) {
    return Response.json({ ok: true });
  },
};
```

## Configure a function

Set the function options with the `functions` property in `vercel.json`:

```json
{
  "functions": {
    "api/hello.ts": {
      "maxDuration": 60,
      "regions": ["fra1"]
    }
  }
}
```

Common options:

| Option | Purpose |
|--------|---------|
| `maxDuration` | Max execution time in seconds |
| `regions` | The regions where the function runs |
| `memory` | The memory limit |

## Stream a response

Return a `ReadableStream` for streaming output. Edge Functions handle
streaming well.

## Limits and cold starts

- Functions have a max duration. Check the current limit in the docs.
- Functions have a max request body size.
- Cold starts add latency on the first call. Keep functions small.

## Test locally

Run `vercel dev` to test functions with the local environment.

## Debug

Check the logs of a deployment:

```bash
vercel logs [url]
vercel inspect [url] --logs
```

## Reference

Fetch the docs for details:

- https://vercel.com/docs/functions
- https://vercel.com/docs/functions/runtimes/bun
