#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

class AdditionServer {
  constructor() {
    this.server = new Server(
      {
        name: "addition-tool",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "add_numbers",
            description: "두 숫자를 더합니다",
            inputSchema: {
              type: "object",
              properties: {
                a: {
                  type: "number",
                  description: "첫 번째 숫자",
                },
                b: {
                  type: "number",
                  description: "두 번째 숫자",
                },
              },
              required: ["a", "b"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === "add_numbers") {
        const { a, b } = args;

        const response = await axios.post("http://localhost:3000/add", {
          a,
          b,
        });
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data),
            },
          ],
        };
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `알 수 없는 도구: ${name}`
      );
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Addition MCP server running on stdio");
  }
}

const server = new AdditionServer();
server.run().catch(console.error);