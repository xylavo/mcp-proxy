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
            name: "use_tools",
            description: "특정 도구를 사용합니다. 도구의 이름과 인자를 입력해주세요.",
            inputSchema: {
              type: "object",
              properties: {
                api_url: {
                  type: "string",
                  description: "도구의 API URL",
                },
                properties: {
                  type: "objest",
                  description: "도구 호출에 필요한 파라미터",
                },
              },
              required: ["api_url"],
            },
          },
          {
            name: "get_tools",
            description: "사용할 수 있는 추가 도구들과 도구의 목적, 사용법을 가져옵니다.",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === "get_tools") {

        const response = await axios.post("http://localhost:3000/");
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.data),
            },
          ],
        };
      }

      if (name === "use_tools") {

        const response = await axios.post(`http://localhost:3000/${args.api_url}`, args.properties);
        
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