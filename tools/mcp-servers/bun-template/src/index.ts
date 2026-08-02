import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * Local Task Manager MCP Server Template
 * 
 * This example demonstrates a cohesive workflow where:
 * 1. A Prompt helps the user brainstorm and format a task.
 * 2. A Tool allows the LLM to actually save that task.
 * 3. A Resource provides the LLM with the current list of tasks as context.
 */

const server = new McpServer({
  name: "local-task-manager",
  version: "1.0.0",
});

// In-memory task store for this example
const tasks = [
  { id: 1, title: "Initialize MCP project", priority: "high", status: "completed" },
  { id: 2, title: "Configure Bun transport", priority: "medium", status: "in-progress" },
];

// --- 1. TOOLS (Actions) ---
// The actual action to modify the state
server.tool(
  "add_task",
  "Add a new task to the local manager",
  {
    title: z.string().describe("Brief title of the task"),
    description: z.string().describe("Detailed explanation of what needs to be done"),
    priority: z.enum(["low", "medium", "high"]).describe("Urgency level"),
  },
  async ({ title, description, priority }) => {
    const newTask = { id: tasks.length + 1, title, priority, status: "pending" };
    tasks.push(newTask);
    return {
      content: [{ 
        type: "text", 
        text: `Task added successfully: [${priority.toUpperCase()}] ${title}. Description: ${description}` 
      }],
    };
  }
);

// --- 2. RESOURCES (Data) ---
// Providing the LLM with read-only access to the task list
server.resource(
  "current-tasks",
  "tasks://all",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify(tasks, null, 2),
      mimeType: "application/json"
    }]
  })
);

// --- 3. PROMPTS (Workflow Assistants) ---
// Helping the user gather information for the 'add_task' tool
server.prompt(
  "plan-new-task",
  { topic: z.string().describe("The general subject of the task") },
  ({ topic }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `I want to create a new task about "${topic}". 
               Please help me define a clear title, a detailed description, 
               and suggest an appropriate priority (low, medium, or high). 
               Once we agree, you can use the 'add_task' tool to save it.`
      }
    }]
  })
);

// --- START SERVER ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Local Task Manager MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
