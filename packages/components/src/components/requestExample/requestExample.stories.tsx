import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequestExample } from "./requestExample";

const meta: Meta<typeof RequestExample> = {
  title: "Components/RequestExample",
  component: RequestExample,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    dropdown: {
      control: "boolean",
      description: "Whether to show language dropdown instead of tabs",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RequestExample>;

// Sample code snippets for stories
const curlSnippet = {
  language: "bash",
  filename: "cURL",
  code: `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'`,
};

const pythonSnippet = {
  language: "python",
  filename: "Python",
  code: `import requests

response = requests.post(
    "https://api.example.com/users",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    },
    json={
        "name": "John Doe",
        "email": "john@example.com"
    }
)

print(response.json())`,
};

const javascriptSnippet = {
  language: "javascript",
  filename: "JavaScript",
  code: `const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com"
  })
});

const data = await response.json();
console.log(data);`,
};

const goSnippet = {
  language: "go",
  filename: "Go",
  code: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    data := map[string]string{
        "name":  "John Doe",
        "email": "john@example.com",
    }
    jsonData, _ := json.Marshal(data)

    req, _ := http.NewRequest("POST", "https://api.example.com/users", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`,
};

// Basic Examples
export const Default: Story = {
  args: {
    snippets: [curlSnippet],
  },
};

export const SingleSnippet: Story = {
  args: {
    snippets: [pythonSnippet],
  },
};

// Multiple Snippets
export const MultipleSnippets: Story = {
  args: {
    snippets: [curlSnippet, pythonSnippet, javascriptSnippet],
  },
};

export const AllLanguages: Story = {
  args: {
    snippets: [curlSnippet, pythonSnippet, javascriptSnippet, goSnippet],
  },
};

// Dropdown Mode
export const WithDropdown: Story = {
  args: {
    snippets: [curlSnippet, pythonSnippet, javascriptSnippet],
    dropdown: true,
  },
};

// Without Filename
export const WithoutFilename: Story = {
  args: {
    snippets: [
      {
        language: "bash",
        code: "curl -X GET https://api.example.com/health",
      },
    ],
  },
};

// GET Request Example
export const GetRequest: Story = {
  args: {
    snippets: [
      {
        language: "bash",
        filename: "cURL",
        code: `curl -X GET "https://api.example.com/users?page=1&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      },
      {
        language: "python",
        filename: "Python",
        code: `import requests

response = requests.get(
    "https://api.example.com/users",
    params={"page": 1, "limit": 10},
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)`,
      },
    ],
  },
};

// DELETE Request Example
export const DeleteRequest: Story = {
  args: {
    snippets: [
      {
        language: "bash",
        filename: "cURL",
        code: `curl -X DELETE "https://api.example.com/users/123" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      },
      {
        language: "javascript",
        filename: "JavaScript",
        code: `await fetch("https://api.example.com/users/123", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
});`,
      },
    ],
  },
};

// With Custom ClassName
export const WithCustomClassName: Story = {
  args: {
    snippets: [curlSnippet],
    className: "custom-request-example",
  },
};

// Children Composition
export const WithChildren: Story = {
  args: {
    children: (
      <div style={{ padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <p style={{ margin: 0, fontFamily: "monospace" }}>Custom content can be passed as children</p>
      </div>
    ),
  },
};

// Empty State
export const EmptySnippets: Story = {
  args: {
    snippets: [],
  },
};

// Long Code Example
export const LongCodeExample: Story = {
  args: {
    snippets: [
      {
        language: "python",
        filename: "Python",
        code: `import requests
import json

class APIClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

    def create_user(self, name: str, email: str) -> dict:
        """Create a new user in the system."""
        response = requests.post(
            f"{self.base_url}/users",
            headers=self.headers,
            json={
                "name": name,
                "email": email
            }
        )
        response.raise_for_status()
        return response.json()

    def get_user(self, user_id: str) -> dict:
        """Retrieve a user by ID."""
        response = requests.get(
            f"{self.base_url}/users/{user_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

    def update_user(self, user_id: str, **kwargs) -> dict:
        """Update a user's information."""
        response = requests.patch(
            f"{self.base_url}/users/{user_id}",
            headers=self.headers,
            json=kwargs
        )
        response.raise_for_status()
        return response.json()

# Usage example
client = APIClient("https://api.example.com", "YOUR_API_KEY")
user = client.create_user("John Doe", "john@example.com")
print(f"Created user: {user['id']}")`,
      },
    ],
  },
};
