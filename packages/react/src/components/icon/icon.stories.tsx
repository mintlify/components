import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon, IconType, IconLibrary } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => {
    return (
      <Container>
        <Icon {...args} />
      </Container>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex items-center justify-center gap-4 bg-background-light dark:bg-background-dark px-6 py-8">
    {children}
  </div>
);

const IconItem = ({
  icon,
  iconType,
  iconLibrary,
  size = 32,
  color,
  label,
  labelSize = "sm",
}: {
  icon: string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  size?: number;
  color?: string;
  label: string;
  labelSize?: "xs" | "sm";
}) => (
  <div className="flex flex-col items-center gap-2">
    <Icon
      icon={icon}
      iconType={iconType}
      iconLibrary={iconLibrary}
      size={size}
      color={color}
    />
    <span className={`text-${labelSize} text-text-secondary`}>{label}</span>
  </div>
);

export const Basic: Story = {
  args: {
    icon: "rocket",
    size: 24,
  },
};

export const AllIconTypes: Story = {
  render: () => (
    <Container>
      <div className="grid grid-cols-4 gap-6 max-w-4xl">
        <IconItem icon="heart" iconType="regular" label="Regular" />
        <IconItem icon="heart" iconType="solid" label="Solid" />
        <IconItem icon="heart" iconType="light" label="Light" />
        <IconItem icon="heart" iconType="thin" label="Thin" />
        <IconItem icon="heart" iconType="duotone" label="Duotone" />
        <IconItem icon="heart" iconType="sharp-solid" label="Sharp Solid" />
        <IconItem icon="heart" iconType="sharp-regular" label="Sharp Regular" />
        <IconItem icon="heart" iconType="sharp-light" label="Sharp Light" />
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container>
      <div className="flex items-center gap-6">
        <IconItem icon="rocket" iconType="solid" size={16} label="16px" />
        <IconItem icon="rocket" iconType="solid" size={20} label="20px" />
        <IconItem icon="rocket" iconType="solid" size={24} label="24px" />
        <IconItem icon="rocket" iconType="solid" size={32} label="32px" />
        <IconItem icon="rocket" iconType="solid" size={48} label="48px" />
        <IconItem icon="rocket" iconType="solid" size={64} label="64px" />
      </div>
    </Container>
  ),
};

export const Colors: Story = {
  render: () => (
    <Container>
      <div className="flex items-center gap-6">
        <IconItem icon="heart" iconType="solid" color="#ef4444" label="Red" />
        <IconItem icon="heart" iconType="solid" color="#3b82f6" label="Blue" />
        <IconItem icon="heart" iconType="solid" color="#10b981" label="Green" />
        <IconItem
          icon="heart"
          iconType="solid"
          color="#f59e0b"
          label="Orange"
        />
        <IconItem
          icon="heart"
          iconType="solid"
          color="#8b5cf6"
          label="Purple"
        />
        <IconItem
          icon="heart"
          iconType="solid"
          color="#6366f1"
          label="Indigo"
        />
      </div>
    </Container>
  ),
};

export const BrandIcons: Story = {
  render: () => (
    <Container>
      <div className="grid grid-cols-6 gap-6 max-w-4xl">
        <IconItem
          icon="github"
          iconType="brands"
          label="GitHub"
          labelSize="xs"
        />
        <IconItem
          icon="twitter"
          iconType="brands"
          label="Twitter"
          labelSize="xs"
        />
        <IconItem
          icon="linkedin"
          iconType="brands"
          label="LinkedIn"
          labelSize="xs"
        />
        <IconItem
          icon="facebook"
          iconType="brands"
          label="Facebook"
          labelSize="xs"
        />
        <IconItem
          icon="instagram"
          iconType="brands"
          label="Instagram"
          labelSize="xs"
        />
        <IconItem
          icon="youtube"
          iconType="brands"
          label="YouTube"
          labelSize="xs"
        />
        <IconItem
          icon="discord"
          iconType="brands"
          label="Discord"
          labelSize="xs"
        />
        <IconItem icon="slack" iconType="brands" label="Slack" labelSize="xs" />
        <IconItem icon="figma" iconType="brands" label="Figma" labelSize="xs" />
        <IconItem icon="react" iconType="brands" label="React" labelSize="xs" />
        <IconItem icon="npm" iconType="brands" label="NPM" labelSize="xs" />
        <IconItem
          icon="docker"
          iconType="brands"
          label="Docker"
          labelSize="xs"
        />
      </div>
    </Container>
  ),
};

export const LucideIcons: Story = {
  render: () => (
    <Container>
      <div className="grid grid-cols-6 gap-6 max-w-4xl">
        <IconItem
          icon="heart"
          iconLibrary="lucide"
          label="Heart"
          labelSize="xs"
        />
        <IconItem
          icon="star"
          iconLibrary="lucide"
          label="Star"
          labelSize="xs"
        />
        <IconItem
          icon="check"
          iconLibrary="lucide"
          label="Check"
          labelSize="xs"
        />
        <IconItem icon="x" iconLibrary="lucide" label="X" labelSize="xs" />
        <IconItem
          icon="settings"
          iconLibrary="lucide"
          label="Settings"
          labelSize="xs"
        />
        <IconItem
          icon="search"
          iconLibrary="lucide"
          label="Search"
          labelSize="xs"
        />
      </div>
    </Container>
  ),
};

export const CustomURL: Story = {
  render: () => (
    <Container>
      <IconItem
        icon="https://mintcdn.com/mintlify/e0-N9JebsJpsinlD/logo/light.svg?fit=max&auto=format&n=e0-N9JebsJpsinlD&q=85&s=b0900d78fd30c5583e438ce3f2591f94"
        size={48}
        label="CDN URL (with mask)"
        labelSize="xs"
      />
    </Container>
  ),
};

export const InlineInText: Story = {
  render: () => (
    <Container>
      <div className="max-w-2xl space-y-4">
        <p className="text-text-primary">
          Icons can be used inline with text{" "}
          <Icon
            icon="heart"
            iconType="solid"
            size={16}
            color="#ef4444"
            className="inline align-middle"
          />{" "}
          to add visual interest and improve readability.
        </p>
        <p className="text-text-primary">
          You can use icons for actions like{" "}
          <Icon
            icon="download"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          download,{" "}
          <Icon
            icon="share"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          share, or{" "}
          <Icon
            icon="bookmark"
            iconType="solid"
            size={16}
            className="inline align-middle"
          />{" "}
          save.
        </p>
        <p className="text-text-primary">
          Status indicators work well too:{" "}
          <Icon
            icon="circle-check"
            iconType="solid"
            size={16}
            color="#10b981"
            className="inline align-middle"
          />{" "}
          Success,{" "}
          <Icon
            icon="circle-exclamation"
            iconType="solid"
            size={16}
            color="#f59e0b"
            className="inline align-middle"
          />{" "}
          Warning,{" "}
          <Icon
            icon="circle-xmark"
            iconType="solid"
            size={16}
            color="#ef4444"
            className="inline align-middle"
          />{" "}
          Error.
        </p>
      </div>
    </Container>
  ),
};

export const WithCurrentColor: Story = {
  render: () => (
    <Container>
      <div className="space-y-6">
        <div className="text-blue-500 flex items-center gap-2">
          <Icon icon="info-circle" iconType="solid" size={20} />
          <span>Icons inherit text color by default</span>
        </div>
        <div className="text-green-600 flex items-center gap-2">
          <Icon icon="check-circle" iconType="solid" size={20} />
          <span>Success message with icon</span>
        </div>
        <div className="text-red-600 flex items-center gap-2">
          <Icon icon="exclamation-triangle" iconType="solid" size={20} />
          <span>Error message with icon</span>
        </div>
        <div className="text-orange-500 flex items-center gap-2">
          <Icon icon="lightbulb" iconType="solid" size={20} />
          <span>Tip with icon</span>
        </div>
      </div>
    </Container>
  ),
};
