import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Icon } from "../icon";
import {
  Search,
  SearchButton,
  SearchProvider,
  type SearchResult,
} from "./index";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: false,
      description: "Control modal visibility",
    },
    onClose: {
      control: false,
      description: "Called when modal closes",
    },
    onSearch: {
      control: false,
      description: "Called when user types in search",
    },
    results: {
      control: false,
      description: "Array of search results",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder text",
    },
    position: {
      control: "select",
      options: ["top", "center"],
      description: "Modal position",
    },
    isLoading: {
      control: false,
      description: "Show loading state",
    },
    recentSearches: {
      control: false,
      description: "Recent search results to display",
    },
    onSelectResult: {
      control: false,
      description: "Called when result is selected",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    paddingTop: {
      control: "text",
      description: "Distance from top of viewport when position is 'top'",
    },
    panelClassName: {
      control: "text",
      description: "Custom className for the modal panel",
    },
    inputClassName: {
      control: "text",
      description: "Custom className for the search input",
    },
    resultClassName: {
      control: "text",
      description: "Custom className for each search result item",
    },
    emptyState: {
      control: false,
      description: "Custom empty state component",
    },
    loadingState: {
      control: false,
      description: "Custom loading state component",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

// Mock search data
const mockResults = [
  {
    id: "1",
    header: "Getting Started",
    content:
      "Learn how to set up and use the components library in your project.",
    link: "/docs/getting-started",
    metadata: {
      breadcrumbs: ["Documentation", "Introduction"],
    },
    icon: <Icon color="gray" icon="hash" iconLibrary="lucide" size={18} />,
  },
  {
    id: "2",
    header: "Installation",
    content: "Install the package using npm, yarn, or pnpm.",
    link: "/docs/installation",
    metadata: {
      breadcrumbs: ["Documentation", "Setup"],
    },
    icon: <Icon color="gray" icon="hash" iconLibrary="lucide" size={18} />,
  },
  {
    id: "3",
    header: "Search Component",
    content: "A fully-featured search modal with keyboard navigation.",
    link: "/docs/components/search",
    metadata: {
      breadcrumbs: ["Components", "Search"],
    },
    icon: <Icon color="gray" icon="hash" iconLibrary="lucide" size={18} />,
  },
  {
    id: "4",
    header: "Theming",
    content: "Customize the appearance of components with Tailwind CSS.",
    link: "/docs/theming",
    metadata: {
      breadcrumbs: ["Documentation", "Customization"],
    },
    icon: <Icon color="gray" icon="hash" iconLibrary="lucide" size={18} />,
  },
  {
    id: "5",
    header: "Dark Mode",
    content: "Enable dark mode support for your documentation.",
    link: "/docs/dark-mode",
    metadata: {
      breadcrumbs: ["Documentation", "Customization"],
    },
    icon: <Icon color="gray" icon="hash" iconLibrary="lucide" size={18} />,
  },
];

export const Default: Story = {
  args: {
    placeholder: "Search...",
    position: "top",
    className: "",
    paddingTop: "64px",
    panelClassName: "",
    inputClassName: "",
    resultClassName: "",
  },
  parameters: {
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: {
            args: {
              placeholder?: string;
              position?: string;
              className?: string;
              paddingTop?: string;
              panelClassName?: string;
              inputClassName?: string;
              resultClassName?: string;
            };
          }
        ) => {
          const placeholder = storyContext.args.placeholder || "Search...";
          const position = storyContext.args.position || "top";
          const className = storyContext.args.className || "";
          const paddingTop = storyContext.args.paddingTop || "4rem";
          const panelClassName = storyContext.args.panelClassName || "";
          const inputClassName = storyContext.args.inputClassName || "";
          const resultClassName = storyContext.args.resultClassName || "";

          const classNameProps = [
            className && `        className="${className}"`,
            paddingTop !== "64px" && `        paddingTop="${paddingTop}"`,
            panelClassName && `        panelClassName="${panelClassName}"`,
            inputClassName && `        inputClassName="${inputClassName}"`,
            resultClassName && `        resultClassName="${resultClassName}"`,
          ]
            .filter(Boolean)
            .join("\n");

          return `import { useState } from 'react';
import { Search, SearchButton, SearchResult } from '@mintlify/components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results);
        setIsLoading(false);
      });
  };

  const handleSelectResult = (result: SearchResult, query: string) => {
    console.log('Selected:', result);

    // Add to recent searches (avoid duplicates and limit to 5)
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.id !== result.id);
      return [result, ...filtered].slice(0, 5);
    });
  };

  return (
    <>
      <SearchButton onClick={() => setIsOpen(true)}>
        ${placeholder}
      </SearchButton>
      <Search
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setResults([]);
        }}
        onSearch={handleSearch}
        results={results}
        isLoading={isLoading}
        placeholder="${placeholder}"
        position="${position}"
        onSelectResult={handleSelectResult}
        recentSearches={recentSearches}${classNameProps ? `\n${classNameProps}` : ""}
      />
    </>
  );
}`;
        },
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

    const handleSearch = (query: string) => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.header.toLowerCase().includes(query.toLowerCase()) ||
            result.content.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    };

    const handleSelectResult = (result: SearchResult, query: string) => {
      console.log("Selected:", result, "Query:", query);

      // Add to recent searches (avoid duplicates and limit to 5)
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.id !== result.id);
        return [result, ...filtered].slice(0, 5);
      });
    };

    return (
      <div className="w-[400px] p-6">
        <SearchButton onClick={() => setIsOpen(true)} showShortcut={true}>
          {args.placeholder}
        </SearchButton>
        <Search
          className={args.className}
          inputClassName={args.inputClassName}
          isLoading={isLoading}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setResults([]);
          }}
          onSearch={handleSearch}
          onSelectResult={handleSelectResult}
          paddingTop={args.paddingTop}
          panelClassName={args.panelClassName}
          placeholder={args.placeholder}
          position={args.position}
          recentSearches={recentSearches}
          resultClassName={args.resultClassName}
          results={results}
        />
      </div>
    );
  },
};

export const Custom: Story = {
  args: {
    placeholder: "Search with custom states...",
    position: "top",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.header.toLowerCase().includes(query.toLowerCase()) ||
            result.content.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);
    };

    return (
      <div className="w-[400px] p-6">
        <SearchButton onClick={() => setIsOpen(true)} showShortcut={false}>
          {args.placeholder}
        </SearchButton>
        <Search
          emptyState={
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              <div className="text-4xl">🔍</div>
              <div className="text-center">
                <p className="font-semibold text-sm text-stone-900 dark:text-white">
                  No matches found
                </p>
                <p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
                  Try different keywords or check your spelling
                </p>
              </div>
            </div>
          }
          isLoading={isLoading}
          isOpen={isOpen}
          loadingState={
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent border-solid" />
              <div className="text-center">
                <p className="font-semibold text-blue-600 text-sm">
                  Searching...
                </p>
                <p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
                  Finding the best results for you
                </p>
              </div>
            </div>
          }
          onClose={() => setIsOpen(false)}
          onSearch={handleSearch}
          placeholder={args.placeholder}
          position={args.position}
          results={results}
        />
      </div>
    );
  },
};

export const WithProvider: Story = {
  args: {
    placeholder: "Search...",
  },
  render: (args) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.header.toLowerCase().includes(query.toLowerCase()) ||
            result.content.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    };

    const shortcutKey = "k";
    const requireModifier = true;
    const showShortcut = true;
    const shortcutText = "⌘K";

    return (
      <SearchProvider
        requireModifier={requireModifier}
        searchProps={{
          onSearch: handleSearch,
          results,
          isLoading,
          placeholder: args.placeholder,
        }}
        shortcutKey={shortcutKey}
      >
        <div className="w-[400px] space-y-4 p-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-blue-900 text-sm dark:text-blue-100">
              Press{" "}
              <kbd className="rounded border border-blue-300 bg-white px-2 py-1 font-sans text-xs dark:border-blue-700 dark:bg-blue-950">
                {shortcutText}
              </kbd>
              {requireModifier && (
                <>
                  {" "}
                  or{" "}
                  <kbd className="rounded border border-blue-300 bg-white px-2 py-1 font-sans text-xs dark:border-blue-700 dark:bg-blue-950">
                    Ctrl+{shortcutKey.toUpperCase()}
                  </kbd>
                </>
              )}{" "}
              to open search
            </p>
          </div>
          <SearchButton
            shortcutText={shortcutText}
            showShortcut={showShortcut}
          />
        </div>
      </SearchProvider>
    );
  },
};
