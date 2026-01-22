import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tile } from "./tile";

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Link URL",
    },
    title: {
      control: "text",
      description: "Title text displayed below the tile",
    },
    description: {
      control: "text",
      description: "Description text displayed below the title",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tile>;

const AccordionPreviewLight = () => (
  <svg
    aria-hidden="true"
    className="block dark:hidden"
    fill="none"
    height="100"
    viewBox="0 0 184 100"
    width="184"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_light)">
      <path
        d="M2 9C2 4.58172 5.58172 1 10 1H174C178.418 1 182 4.58172 182 9V20.3813C182 24.7996 178.418 28.3813 174 28.3813H10C5.58172 28.3813 2 24.7996 2 20.3813V9Z"
        fill="white"
        shapeRendering="crispEdges"
      />
      <path
        d="M10 1.5H174C178.142 1.5 181.5 4.85786 181.5 9V20.3809C181.5 24.523 178.142 27.8809 174 27.8809H10C5.85786 27.8809 2.5 24.523 2.5 20.3809V9C2.5 4.85786 5.85786 1.5 10 1.5Z"
        shapeRendering="crispEdges"
        stroke="#0B0C0E"
      />
      <path
        d="M10 13C10 10.7909 11.7909 9 14 9H125.866C128.076 9 129.866 10.7909 129.866 13V16.3813C129.866 18.5904 128.076 20.3813 125.866 20.3813H14C11.7909 20.3813 10 18.5904 10 16.3813V13Z"
        fill="#0B0C0E"
      />
      <path
        d="M165.528 16.0791L169 12.6069L172.472 16.0791"
        stroke="#0B0C0E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </g>
    <path
      d="M2 41.3809C2 36.9626 5.58172 33.3809 10 33.3809H174C178.418 33.3809 182 36.9626 182 41.3809V91.5247C182 95.943 178.418 99.5247 174 99.5247H10C5.58172 99.5247 2 95.943 2 91.5247V41.3809Z"
      fill="white"
    />
    <path
      d="M10 45.3809C10 43.1717 11.7909 41.3809 14 41.3809H170C172.209 41.3809 174 43.1717 174 45.3809V48.7621C174 50.9713 172.209 52.7621 170 52.7621H14C11.7909 52.7621 10 50.9713 10 48.7621V45.3809Z"
      fill="#F5F5F5"
    />
    <path
      d="M10 64.7617C10 62.5526 11.7909 60.7617 14 60.7617H170C172.209 60.7617 174 62.5526 174 64.7617V68.143C174 70.3521 172.209 72.143 170 72.143H14C11.7909 72.143 10 70.3521 10 68.143V64.7617Z"
      fill="#F5F5F5"
    />
    <path
      d="M10 84.1436C10 81.9344 11.7909 80.1436 14 80.1436H103.43C105.639 80.1436 107.43 81.9344 107.43 84.1436V87.5248C107.43 89.734 105.639 91.5248 103.43 91.5248H14C11.7909 91.5248 10 89.734 10 87.5248V84.1436Z"
      fill="#F5F5F5"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="31.3809"
        id="filter0_d_light"
        width="184"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0784314 0 0 0 0 0.0823529 0 0 0 0 0.101961 0 0 0 0.05 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const AccordionPreviewDark = () => (
  <svg
    aria-hidden="true"
    className="hidden dark:block"
    fill="none"
    height="100"
    viewBox="0 0 184 100"
    width="184"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_dark)">
      <path
        d="M2 9C2 4.58172 5.58172 1 10 1H174C178.418 1 182 4.58172 182 9V20.3813C182 24.7996 178.418 28.3813 174 28.3813H10C5.58172 28.3813 2 24.7996 2 20.3813V9Z"
        fill="#0B0C0E"
        shapeRendering="crispEdges"
      />
      <path
        d="M10 1.5H174C178.142 1.5 181.5 4.85786 181.5 9V20.3809C181.5 24.523 178.142 27.8809 174 27.8809H10C5.85786 27.8809 2.5 24.523 2.5 20.3809V9C2.5 4.85786 5.85786 1.5 10 1.5Z"
        shapeRendering="crispEdges"
        stroke="white"
        strokeOpacity="0.95"
      />
      <path
        d="M10 13C10 10.7909 11.7909 9 14 9H125.866C128.076 9 129.866 10.7909 129.866 13V16.3813C129.866 18.5904 128.076 20.3813 125.866 20.3813H14C11.7909 20.3813 10 18.5904 10 16.3813V13Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M165.528 16.0791L169 12.6069L172.472 16.0791"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.95"
        strokeWidth="1.5"
      />
    </g>
    <path
      d="M2 41.3809C2 36.9626 5.58172 33.3809 10 33.3809H174C178.418 33.3809 182 36.9626 182 41.3809V91.5247C182 95.943 178.418 99.5247 174 99.5247H10C5.58172 99.5247 2 95.943 2 91.5247V41.3809Z"
      fill="#0B0C0E"
    />
    <path
      d="M10 45.3809C10 43.1717 11.7909 41.3809 14 41.3809H170C172.209 41.3809 174 43.1717 174 45.3809V48.7621C174 50.9713 172.209 52.7621 170 52.7621H14C11.7909 52.7621 10 50.9713 10 48.7621V45.3809Z"
      fill="#262727"
    />
    <path
      d="M10 64.7617C10 62.5526 11.7909 60.7617 14 60.7617H170C172.209 60.7617 174 62.5526 174 64.7617V68.143C174 70.3521 172.209 72.143 170 72.143H14C11.7909 72.143 10 70.3521 10 68.143V64.7617Z"
      fill="#262727"
    />
    <path
      d="M10 84.1436C10 81.9344 11.7909 80.1436 14 80.1436H103.43C105.639 80.1436 107.43 81.9344 107.43 84.1436V87.5248C107.43 89.734 105.639 91.5248 103.43 91.5248H14C11.7909 91.5248 10 89.734 10 87.5248V84.1436Z"
      fill="#262727"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="31.3809"
        id="filter0_d_dark"
        width="184"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0784314 0 0 0 0 0.0823529 0 0 0 0 0.101961 0 0 0 0.05 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const TileChildren = () => (
  <>
    <AccordionPreviewLight />
    <AccordionPreviewDark />
  </>
);

export const Default: Story = {
  args: {
    href: "/components/accordion",
    title: "Accordion",
    description: "Two variants",
  },
  render: (args) => (
    <Tile {...args}>
      <TileChildren />
    </Tile>
  ),
};

export const TitleOnly: Story = {
  args: {
    href: "/components/accordion",
    title: "Accordion",
  },
  render: (args) => (
    <Tile {...args}>
      <TileChildren />
    </Tile>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    href: "/components/accordion",
    description: "Interactive collapsible sections",
  },
  render: (args) => (
    <Tile {...args}>
      <TileChildren />
    </Tile>
  ),
};

export const NoText: Story = {
  args: {
    href: "/components/accordion",
  },
  render: (args) => (
    <Tile {...args}>
      <TileChildren />
    </Tile>
  ),
};
