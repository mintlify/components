import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mermaid } from "./mermaid";

const meta: Meta<typeof Mermaid> = {
  title: "Components/Mermaid",
  component: Mermaid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    chart: {
      control: "text",
      description: "The mermaid chart definition string",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the root element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Mermaid>;

const flowchartExample = `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`;

const sequenceDiagramExample = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`;

const classDiagramExample = `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }`;

const stateDiagramExample = `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`;

const entityRelationshipExample = `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`;

const ganttChartExample = `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2024-01-01, 30d
    Another task     :after a1, 20d
    section Another
    Task in sec      :2024-01-12, 12d
    another task     :24d`;

const pieChartExample = `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`;

const gitGraphExample = `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit`;

const journeyExample = `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`;

export const Default: Story = {
  args: {
    chart: flowchartExample,
  },
};

export const Flowchart: Story = {
  args: {
    chart: flowchartExample,
  },
};

export const SequenceDiagram: Story = {
  args: {
    chart: sequenceDiagramExample,
  },
};

export const ClassDiagram: Story = {
  args: {
    chart: classDiagramExample,
  },
};

export const StateDiagram: Story = {
  args: {
    chart: stateDiagramExample,
  },
};

export const EntityRelationship: Story = {
  args: {
    chart: entityRelationshipExample,
  },
};

export const GanttChart: Story = {
  args: {
    chart: ganttChartExample,
  },
};

export const PieChart: Story = {
  args: {
    chart: pieChartExample,
  },
};

export const GitGraph: Story = {
  args: {
    chart: gitGraphExample,
  },
};

export const UserJourney: Story = {
  args: {
    chart: journeyExample,
  },
};

export const ComplexFlowchart: Story = {
  args: {
    chart: `graph TB
    subgraph Frontend
        A[React App] --> B[Components]
        B --> C[State Management]
    end
    subgraph Backend
        D[API Gateway] --> E[Auth Service]
        D --> F[Data Service]
        E --> G[(Database)]
        F --> G
    end
    A --> D`,
  },
};

export const WithCustomClassName: Story = {
  args: {
    chart: flowchartExample,
    className: "border rounded-lg p-4 bg-gray-50 dark:bg-gray-800",
  },
};

export const LargeDiagram: Story = {
  render: () => (
    <div className="w-[800px] h-[600px]">
      <Mermaid
        chart={`graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
    D --> G[Work]
    E --> H[Fun]
    F --> I[Travel]
    G --> J[Success]
    H --> J
    I --> J
    J --> K{Happy?}
    K -->|Yes| L[Celebrate]
    K -->|No| M[Try Again]
    M --> B`}
      />
    </div>
  ),
};

export const AllDiagramTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Flowchart</h3>
        <Mermaid chart={flowchartExample} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Sequence Diagram</h3>
        <Mermaid chart={sequenceDiagramExample} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">State Diagram</h3>
        <Mermaid chart={stateDiagramExample} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
        <Mermaid chart={pieChartExample} />
      </div>
    </div>
  ),
};

export const InvalidSyntax: Story = {
  args: {
    chart: `graph TD
    A[Start --> B{Invalid syntax here`,
  },
};
