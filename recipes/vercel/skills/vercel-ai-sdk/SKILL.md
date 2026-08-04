---
name: vercel-ai-sdk
description: Use when building AI features with the Vercel AI SDK: AI chat, streaming responses, useChat and useCompletion, tool calling, agents, structured output, model routing. Load before writing AI integration code.
---

# Vercel AI SDK

The Vercel AI SDK is a framework for building AI-powered applications. It
works with JavaScript and TypeScript. It gives one interface to many model
providers.

## Install

Install the core package and the framework and provider packages you need:

```bash
bun add ai @ai-sdk/react @ai-sdk/openai
```

Common packages:

| Package | Purpose |
|---------|---------|
| `ai` | Core SDK |
| `@ai-sdk/react` | React hooks |
| `@ai-sdk/vue` | Vue helpers |
| `@ai-sdk/svelte` | Svelte helpers |
| `@ai-sdk/next` | Next.js helpers |
| `@ai-sdk/openai` | OpenAI provider |
| `@ai-sdk/anthropic` | Anthropic provider |
| `@ai-sdk/google` | Google provider |

## Core concepts

| Concept | Purpose |
|---------|---------|
| Provider | A client for one model service |
| Model | A concrete model on a provider |
| `generateText` | Generate text for one prompt |
| `streamText` | Stream text from a model |
| `generateObject` | Generate a structured object |
| `useChat` | React hook for a chat UI |
| `useCompletion` | React hook for a completion UI |
| Tool | A function the model can call |
| Agent | A multi-step workflow the model drives |

## Build a chat app

1. Set the provider on the server.
2. Stream the answer with `streamText`.
3. Bind the stream to the client with `useChat`.

Keep the provider key on the server. Never put an API key in the browser.

## Call a tool

1. Define the tool with `tool` and a schema for its arguments.
2. Pass the tool to the model call.
3. Validate the tool arguments before you execute the tool.

Validate tool input against the schema. This stops prompt injection.

## Use agents

Use the agent APIs for multi-step tasks. The model calls tools and uses the
results. Set the max steps to bound the work.

## Security rules

- Keep API keys in environment variables on the server.
- Never expose a key to the client.
- Validate all tool input.
- Treat model output as untrusted data.

## Reference

Prefer the local mirror (see the `vercel-docs` skill) before you fetch the web.
Fallback pages:

- https://ai-sdk.dev
- https://ai-sdk.dev/docs
