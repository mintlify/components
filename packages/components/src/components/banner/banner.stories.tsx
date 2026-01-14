import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner } from './banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'info', 'warning', 'danger', 'success'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: 'This is a banner message.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col">
      <Banner variant="primary">Primary banner - Used for general announcements</Banner>
      <Banner variant="info">Info banner - Used for informational messages</Banner>
      <Banner variant="warning">Warning banner - Used for important warnings</Banner>
      <Banner variant="danger">Danger banner - Used for critical alerts</Banner>
      <Banner variant="success">Success banner - Used for positive confirmations</Banner>
    </div>
  ),
};

export const WithLink: Story = {
  render: () => (
    <div className="flex flex-col">
      <Banner variant="primary">
        Check out our <a href="#">new features</a> in the latest release.
      </Banner>
      <Banner variant="info">
        Read our <a href="#">documentation</a> for more details.
      </Banner>
      <Banner variant="warning">
        Your subscription expires soon. <a href="#">Renew now</a>.
      </Banner>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <div className="p-4 text-center">
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Show Banner
          </button>
        </div>
      );
    }

    return (
      <Banner
        variant="info"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        This banner can be dismissed. Click the X button to hide it.
      </Banner>
    );
  },
};

export const DismissibleVariants: Story = {
  render: function DismissibleVariantsStory() {
    const [visibleBanners, setVisibleBanners] = useState({
      primary: true,
      info: true,
      warning: true,
      danger: true,
      success: true,
    });

    const hideBanner = (key: keyof typeof visibleBanners) => {
      setVisibleBanners((prev) => ({ ...prev, [key]: false }));
    };

    const resetAll = () => {
      setVisibleBanners({
        primary: true,
        info: true,
        warning: true,
        danger: true,
        success: true,
      });
    };

    const allHidden = !Object.values(visibleBanners).some(Boolean);

    return (
      <div className="flex flex-col">
        {visibleBanners.primary && (
          <Banner
            variant="primary"
            dismissible
            onDismiss={() => hideBanner('primary')}
          >
            Primary dismissible banner
          </Banner>
        )}
        {visibleBanners.info && (
          <Banner
            variant="info"
            dismissible
            onDismiss={() => hideBanner('info')}
          >
            Info dismissible banner
          </Banner>
        )}
        {visibleBanners.warning && (
          <Banner
            variant="warning"
            dismissible
            onDismiss={() => hideBanner('warning')}
          >
            Warning dismissible banner
          </Banner>
        )}
        {visibleBanners.danger && (
          <Banner
            variant="danger"
            dismissible
            onDismiss={() => hideBanner('danger')}
          >
            Danger dismissible banner
          </Banner>
        )}
        {visibleBanners.success && (
          <Banner
            variant="success"
            dismissible
            onDismiss={() => hideBanner('success')}
          >
            Success dismissible banner
          </Banner>
        )}
        {allHidden && (
          <div className="p-4 text-center">
            <button
              type="button"
              onClick={resetAll}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Reset All Banners
            </button>
          </div>
        )}
      </div>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <Banner variant="info">
      This is a banner with longer content to demonstrate how text wrapping and overflow handling
      works. The banner should properly contain the text without breaking the layout, even when the
      content is quite lengthy and spans multiple lines on smaller screens.
    </Banner>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-4">
      <Banner className="rounded-lg mx-4">
        Banner with rounded corners and margins
      </Banner>
      <Banner variant="info" className="shadow-lg">
        Banner with shadow
      </Banner>
      <Banner variant="success" className="py-4 text-base">
        Banner with more padding and larger text
      </Banner>
    </div>
  ),
};
