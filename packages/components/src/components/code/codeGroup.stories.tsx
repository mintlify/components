import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { BaseCodeBlock } from './baseCodeBlock';
import { CodeBlockPropsBase } from './codeBlock';
import { CodeGroup } from './codeGroup';

const meta: Meta<typeof CodeGroup> = {
  title: 'Components/CodeGroup',
  component: CodeGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    codeBlockTheme: {
      control: 'select',
      options: ['system', 'dark'],
      description: 'Theme for the code blocks',
    },
    isSmallText: {
      control: 'boolean',
      description: 'Use smaller text size',
    },
    dropdown: {
      control: 'boolean',
      description: 'Use dropdown mode instead of tabs',
    },
    noMargins: {
      control: 'boolean',
      description: 'Remove default margins',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeGroup>;

// Simple CodeBlock wrapper for stories
function CodeBlock({
  children,
  ...props
}: CodeBlockPropsBase & { children?: React.ReactNode }) {
  return <BaseCodeBlock {...props}>{children}</BaseCodeBlock>;
}

// Code samples for testing
const shortCode = `console.log('Hello, World!');`;

const multiLineJS = `function greet(name) {
  console.log("Hello, " + name + "!");
  return true;
}`;

const multiLinePython = `def greet(name):
    print(f"Hello, {name}!")
    return True`;

const multiLineJava = `class HelloWorld {
    private String message;

    public HelloWorld(String message) {
        this.message = message;
    }

    public void greet() {
        System.out.println("Hello, World!");
        System.out.println(this.message);
    }

    public static void main(String[] args) {
        HelloWorld hw = new HelloWorld("Welcome to Java!");
        hw.greet();
    }
}`;

const longExpandableCode = `from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    isbn: str
    checked_out: bool = False
    due_date: Optional[datetime] = None

class Library:
    def __init__(self):
        self.books: Dict[str, Book] = {}
        self.checkouts: Dict[str, List[str]] = {}

    def add_book(self, book: Book) -> None:
        if book.isbn in self.books:
            raise ValueError(f"Book with ISBN {book.isbn} already exists")
        self.books[book.isbn] = book

    def checkout_book(self, isbn: str, patron: str, days: int = 14) -> None:
        if patron not in self.checkouts:
            self.checkouts[patron] = []

        book = self.books.get(isbn)
        if not book:
            raise ValueError("Book not found")

        if book.checked_out:
            raise ValueError("Book is already checked out")

        if len(self.checkouts[patron]) >= 3:
            raise ValueError("Patron has reached checkout limit")

        book.checked_out = True
        book.due_date = datetime.now() + timedelta(days=days)
        self.checkouts[patron].append(isbn)

    def return_book(self, isbn: str) -> float:
        book = self.books.get(isbn)
        if not book or not book.checked_out:
            raise ValueError("Book not found or not checked out")

        late_fee = 0.0
        if datetime.now() > book.due_date:
            days_late = (datetime.now() - book.due_date).days
            late_fee = days_late * 0.50

        book.checked_out = False
        book.due_date = None

        for patron, books in self.checkouts.items():
            if isbn in books:
                books.remove(isbn)
                break

        return late_fee`;

const longSingleLineCode = `To denote a \`word\` or \`phrase\` as code, enclose it in backticks (\`). The backtick \` is a typographical mark used mainly in computing. It is also known as backquote, grave, or grave accent. This line is intentionally very long to test wrapping behavior and horizontal scrolling.`;

// ===== BASIC STORIES =====
export const Default: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="JavaScript">
        {shortCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python">
        {`print("Hello, World!")`}
      </CodeBlock>
      <CodeBlock language="java" filename="Java">
        {`System.out.println("Hello, World!");`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSmallText: Story = {
  render: () => (
    <CodeGroup isSmallText={true}>
      <CodeBlock language="javascript" filename="JavaScript">
        {shortCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Python">
        {`print("Hello, World!")`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const SingleTab: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="Single tab">
        {shortCode}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== THEME VARIATIONS =====
export const SystemTheme: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system">
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup codeBlockTheme="dark">
        <CodeBlock language="javascript" filename="JavaScript" icon="js">
          {multiLineJS}
        </CodeBlock>
        <CodeBlock language="python" filename="Python" icon="python">
          {multiLinePython}
        </CodeBlock>
        <CodeBlock language="java" filename="Java" icon="java">
          {multiLineJava}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

// ===== FILENAME & ICON STORIES =====
export const WithFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="app.js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="main.py">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="HelloWorld.java">
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {multiLineJava}
      </CodeBlock>
      <CodeBlock language="typescript" filename="TypeScript" icon="typescript">
        {`function greet(name: string): boolean {\n  console.log(\`Hello, \${name}!\`);\n  return true;\n}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithSpacesInFilenames: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="My App File.js" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Main Python Script.py" icon="python">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="Hello World Class.java" icon="java">
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== LINE NUMBERS =====
export const WithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="app.js" icon="js" lines={true}>
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="main.py" icon="python" lines={true}>
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="HelloWorld.java" icon="java" lines={true}>
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const LineNumbersSystemMode: Story = {
  render: () => (
    <CodeGroup codeBlockTheme="system">
      <CodeBlock language="javascript" filename="JavaScript" lines={true}>
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" lines={true}>
        {multiLinePython}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const LineNumbersDarkMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup codeBlockTheme="dark">
        <CodeBlock language="javascript" filename="JavaScript" lines={true}>
          {multiLineJS}
        </CodeBlock>
        <CodeBlock language="python" filename="Python" lines={true}>
          {multiLinePython}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

// ===== WRAP =====
export const WithWrap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="Long Line JS" wrap={true}>
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Long Line Python" wrap={true}>
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="Long Line JS" wrap={true} lines={true}>
        {longSingleLineCode}
      </CodeBlock>
      <CodeBlock language="python" filename="Long Line Python" wrap={true} lines={true}>
        {`# ${longSingleLineCode}`}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WrapMultiLine: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="java" filename="HelloWorld.java" wrap={true} lines={true} icon="java">
        {multiLineJava}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" wrap={true} lines={true} icon="js">
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== HIGHLIGHT =====
export const WithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([3, 5, 7])}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([2, 3])}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 5])}
        lines={true}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 4])}
        lines={true}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightRange: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([2, 3, 4, 5, 6])}
        lines={true}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1, 2, 3, 4])}
        lines={true}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== FOCUS =====
export const WithFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="java" filename="HelloWorld.java" focus={JSON.stringify([2, 4, 6])} icon="java">
        {multiLineJava}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" focus={JSON.stringify([2, 3])} icon="js">
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const FocusWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        lines={true}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        focus={JSON.stringify([1, 2])}
        lines={true}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== HIGHLIGHT + FOCUS COMBINATIONS =====
export const HighlightAndFocus: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([1, 3, 5])}
        focus={JSON.stringify([7, 8, 9, 10, 11])}
        lines={true}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([1])}
        focus={JSON.stringify([3, 4])}
        lines={true}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const HighlightFocusOverlap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="java"
        filename="HelloWorld.java"
        highlight={JSON.stringify([3, 4, 5, 6])}
        focus={JSON.stringify([5, 6, 7, 8])}
        lines={true}
        icon="java"
      >
        {multiLineJava}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        highlight={JSON.stringify([2, 3])}
        focus={JSON.stringify([3, 4])}
        lines={true}
        icon="js"
      >
        {multiLineJS}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== EXPANDABLE =====
export const Expandable: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="python" filename="library.py" expandable={true} icon="python">
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" expandable={true} icon="js">
        {multiLineJS.repeat(5)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithLineNumbers: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="python"
        filename="library.py"
        expandable={true}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock language="javascript" filename="app.js" expandable={true} lines={true} icon="js">
        {multiLineJS.repeat(5)}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const ExpandableWithHighlight: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="python"
        filename="library.py"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 25])}
        lines={true}
        icon="python"
      >
        {longExpandableCode}
      </CodeBlock>
      <CodeBlock
        language="javascript"
        filename="app.js"
        expandable={true}
        highlight={JSON.stringify([1, 2, 3, 10, 11, 12])}
        lines={true}
        icon="js"
      >
        {multiLineJS.repeat(5)}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== CONTROLLED STATE =====
export const ControlledState: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>External controls:</p>
          <button
            onClick={() => setSelectedIndex(0)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: selectedIndex === 0 ? '#0066cc' : '#e0e0e0',
              color: selectedIndex === 0 ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            JavaScript
          </button>
          <button
            onClick={() => setSelectedIndex(1)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: selectedIndex === 1 ? '#0066cc' : '#e0e0e0',
              color: selectedIndex === 1 ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Python
          </button>
          <button
            onClick={() => setSelectedIndex(2)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedIndex === 2 ? '#0066cc' : '#e0e0e0',
              color: selectedIndex === 2 ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Java
          </button>
        </div>

        <CodeGroup
          selectedIndex={selectedIndex}
          onChange={(index) => {
            if (typeof index === 'number') {
              setSelectedIndex(index);
            }
          }}
        >
          <CodeBlock language="javascript" filename="app.js" icon="js" lines={true}>
            {multiLineJS}
          </CodeBlock>
          <CodeBlock language="python" filename="main.py" icon="python" lines={true}>
            {multiLinePython}
          </CodeBlock>
          <CodeBlock language="java" filename="HelloWorld.java" icon="java" lines={true}>
            {multiLineJava}
          </CodeBlock>
        </CodeGroup>
      </div>
    );
  },
};

export const UncontrolledWithDefaultIndex: Story = {
  render: () => (
    <CodeGroup defaultSelectedIndex={1}>
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python (Default)" icon="python">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== EDGE CASES =====
export const EmptyCode: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock filename="empty.txt" lines={true}>
        {''}
      </CodeBlock>
      <CodeBlock filename="empty.js" language="javascript" lines={true} icon="js">
        {''}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const VeryLongSingleLine: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="long-line.js" lines={true} icon="js">
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock language="python" filename="long-line.py" lines={true} icon="python">
        {
          'very_long_variable_name_that_exceeds_normal_line_length_and_should_test_horizontal_scrolling_behavior_in_code_blocks_when_wrap_is_disabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width"'
        }
      </CodeBlock>
    </CodeGroup>
  ),
};

export const VeryLongSingleLineWithWrap: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock
        language="javascript"
        filename="long-line-wrapped.js"
        wrap={true}
        lines={true}
        icon="js"
      >
        {
          'const veryLongVariableNameThatExceedsNormalLineLengthAndShouldTestHorizontalScrollingBehaviorInCodeBlocksWhenWrapIsDisabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width";'
        }
      </CodeBlock>
      <CodeBlock
        language="python"
        filename="long-line-wrapped.py"
        wrap={true}
        lines={true}
        icon="python"
      >
        {
          'very_long_variable_name_that_exceeds_normal_line_length_and_should_test_horizontal_scrolling_behavior_in_code_blocks_when_wrap_is_disabled = "This is a very long string that should also test the horizontal scrolling behavior of code blocks when wrap is disabled and the content exceeds the container width"'
        }
      </CodeBlock>
    </CodeGroup>
  ),
};

export const SpecialCharacters: Story = {
  render: () => (
    <CodeGroup>
      <CodeBlock language="javascript" filename="special-chars.js" lines={true} icon="js">
        {`// Special characters test
const symbols = "!@#$%^&*()_+-=[]{}|;':",.<>?";
const unicode = "Hello 世界 🌍 café naïve résumé";
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;`}
      </CodeBlock>
      <CodeBlock language="python" filename="special-chars.py" lines={true} icon="python">
        {`# Special characters test
symbols = "!@#$%^&*()_+-=[]{}|;':",.<>?"
unicode = "Hello 世界 🌍 café naïve résumé"
import re
regex = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')`}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== CUSTOM COLORS =====
export const WithCustomColors: Story = {
  render: () => (
    <CodeGroup
      primary="220 38 38" // red-600
      primaryLight="248 113 113" // red-400
      primaryDark="185 28 28" // red-700
    >
      <CodeBlock language="javascript" filename="JavaScript" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python">
        {multiLinePython}
      </CodeBlock>
      <CodeBlock language="java" filename="Java" icon="java">
        {multiLineJava}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithCustomColorsGreen: Story = {
  render: () => (
    <CodeGroup
      primary="21 128 61" // green-700
      primaryLight="74 222 128" // green-400
      primaryDark="20 83 45" // green-800
    >
      <CodeBlock language="javascript" filename="JavaScript" icon="js" lines={true}>
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="Python" icon="python" lines={true}>
        {multiLinePython}
      </CodeBlock>
    </CodeGroup>
  ),
};

export const WithCustomColorsDark: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup
        codeBlockTheme="dark"
        primary="251 146 60" // orange-400
        primaryLight="253 186 116" // orange-300
        primaryDark="249 115 22" // orange-500
      >
        <CodeBlock language="javascript" filename="JavaScript" icon="js" lines={true}>
          {multiLineJS}
        </CodeBlock>
        <CodeBlock language="python" filename="Python" icon="python" lines={true}>
          {multiLinePython}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

// ===== RENDER PROPS =====
export const WithCustomActionButtons: Story = {
  render: () => (
    <CodeGroup
      renderActionButtons={({ code }) => (
        <button
          onClick={() => console.log('Code:', code)}
          style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Log Code
        </button>
      )}
    >
      <CodeBlock language="javascript" filename="app.js" icon="js">
        {multiLineJS}
      </CodeBlock>
      <CodeBlock language="python" filename="main.py" icon="python">
        {multiLinePython}
      </CodeBlock>
    </CodeGroup>
  ),
};

// ===== DARK MODE COMPREHENSIVE =====
export const DarkModeWithAllFeatures: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup codeBlockTheme="dark">
        <CodeBlock
          language="java"
          filename="HelloWorld.java"
          lines={true}
          highlight={JSON.stringify([3, 4, 5])}
          focus={JSON.stringify([7, 8, 9])}
          icon="java"
        >
          {multiLineJava}
        </CodeBlock>
        <CodeBlock
          language="javascript"
          filename="app.js"
          lines={true}
          highlight={JSON.stringify([1, 2])}
          focus={JSON.stringify([3, 4])}
          icon="js"
        >
          {multiLineJS}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

export const DarkModeExpandable: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup codeBlockTheme="dark">
        <CodeBlock
          language="python"
          filename="library.py"
          expandable={true}
          lines={true}
          highlight={JSON.stringify([1, 2, 3, 20, 21, 22])}
          icon="python"
        >
          {longExpandableCode}
        </CodeBlock>
        <CodeBlock
          language="javascript"
          filename="app.js"
          expandable={true}
          lines={true}
          highlight={JSON.stringify([1, 2, 3, 8, 9, 10])}
          icon="js"
        >
          {multiLineJS.repeat(5)}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};

export const DarkModeWrapWithFeatures: Story = {
  render: () => (
    <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '8px' }}>
      <CodeGroup codeBlockTheme="dark">
        <CodeBlock filename="long-line.txt" wrap={true} lines={true} highlight={JSON.stringify([1])}>
          {longSingleLineCode}
        </CodeBlock>
        <CodeBlock
          language="javascript"
          filename="long-line.js"
          wrap={true}
          lines={true}
          highlight={JSON.stringify([1])}
          icon="js"
        >
          {longSingleLineCode}
        </CodeBlock>
      </CodeGroup>
    </div>
  ),
};
