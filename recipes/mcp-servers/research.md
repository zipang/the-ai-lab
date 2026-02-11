# Local MCP Server Research

## Introduction
The Model Context Protocol (MCP) is an open standard introduced by Anthropic to connect AI models with external data and tools, solving the "static dataset" limitation. It provides a secure, scalable way for LLMs to interact with up-to-date databases, APIs, and local systems.

## Architecture
MCP follows a client-server-host model using JSON-RPC 2.0:
1. **MCP Host:** The AI application (e.g., Opencode, Claude).
2. **MCP Client:** The connector within the host.
3. **MCP Server:** The custom program exposing data and tools.

### Transports
- **Stdio:** For local tools, using standard input/output pipes.
- **SSE (HTTP):** For remote tools, using Server-Sent Events.

## Core Primitives
| Primitive | Description | Practical Example |
| :--- | :--- | :--- |
| **Tools** | Executable functions the LLM can call. | `calculate_bmi(weight, height)`, `search_docs(query)` |
| **Resources** | Data sources (files, DBs) identified by URIs. | `memo://project/readme`, `file:///logs/app.log` |
| **Prompts** | Pre-written templates for specific tasks. | `code-review-assistant`, `explain-complex-logic` |

## Use Cases
- **Data Retrieval:** Injecting real-time context from DBs or cloud storage.
- **Automation:** Executing actions like sending emails or updating CRMs.
- **Local Access:** Controlled, sandboxed access to the local filesystem.
- **API Integration:** Wrapping REST APIs for consistent LLM access.
- **Orchestration:** Enabling multi-agent collaboration.

## Advanced Features
- **Sampling:** Servers can request content generation from the AI.
- **Elicitation:** Servers can pause to request user input.

## Implementation & Best Practices
### Setup (Bun + TypeScript)
1. Initialize: `bun init -y`
2. Install: `bun add @modelcontextprotocol/sdk zod`
3. Structure: `src/index.ts` (entry) and `src/tools/` (logic).

### Best Practices
- **Atomic Servers:** Focus each server on a single responsibility.
- **Validation:** Use `zod` for rigorous input checking.
- **Safety:** Treat AI inputs as untrusted; use `require_approval` for sensitive actions.
- **Documentation:** Provide detailed tool descriptions for accurate LLM selection.
- **Observability:** Use structured logging (to `stderr` for stdio servers).

## MCP vs. OpenAI Function Calling
While OpenAI's function calling is model-specific and request-based, MCP is model-agnostic, persistent, and supports dynamic discovery and bidirectional communication.

## Resources
- [Official Docs](https://modelcontextprotocol.io/)
- [Reference Servers](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP](https://github.com/wong2/awesome-mcp-servers)
