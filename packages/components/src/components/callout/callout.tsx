import { IconLibrary, IconType } from '@/models';
import Color from 'color';
import { ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { InfoIcon, WarningIcon, NoteIcon, TipIcon, CheckIcon, DangerIcon } from '@/icons';
import { cn } from '@/utils/cn';

type CalloutVariant = 'info' | 'warning' | 'note' | 'tip' | 'check' | 'danger' | 'custom';

type CalloutProps = {
  children: ReactNode;
  variant?: CalloutVariant;
  icon?: ReactNode | string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  color?: string;
  className?: string;
  ariaLabel?: string;
};

const variantConfig = {
  info: {
    icon: InfoIcon,
    defaultAriaLabel: 'Info',
    className: 'border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-white/10',
    childrenClassName: 'text-neutral-800 dark:text-neutral-300',
  },
  warning: {
    icon: WarningIcon,
    defaultAriaLabel: 'Warning',
    className:
      'border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-600/20 [&_[data-component-part="callout-icon"]]:mt-px',
    childrenClassName: 'text-yellow-800 dark:text-yellow-300',
  },
  note: {
    icon: NoteIcon,
    defaultAriaLabel: 'Note',
    className: 'border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-600/20',
    childrenClassName: 'text-blue-800 dark:text-blue-300',
  },
  tip: {
    icon: TipIcon,
    defaultAriaLabel: 'Tip',
    className:
      'border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-600/20 [&_[data-component-part="callout-icon"]]:mt-px',
    childrenClassName: 'text-green-800 dark:text-green-300',
  },
  check: {
    icon: CheckIcon,
    defaultAriaLabel: 'Check',
    className: 'border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-600/20',
    childrenClassName: 'text-green-800 dark:text-green-300',
  },
  danger: {
    icon: DangerIcon,
    defaultAriaLabel: 'Danger',
    className: 'border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-600/20',
    childrenClassName: 'text-red-800 dark:text-red-300',
  },
};

export function Callout({
  children,
  variant = 'custom',
  icon,
  iconType,
  iconLibrary,
  color,
  className,
  ariaLabel,
}: CalloutProps) {
  let finalIcon: ReactNode | string | undefined;
  let finalColor: string | undefined;
  let variantClassName = '';
  let childrenClassName = '';
  let customStyle = {};
  let customTextStyle = {};

  if (variant === 'custom') {
    finalIcon = icon;
    finalColor = color;

    if (color) {
      try {
        const baseColor = Color(color);
        const hexColor = baseColor.hex();
        const isDarkColor = baseColor.isDark();
        const lighterTextColor = baseColor.lighten(0.5);
        const darkerTextColor = baseColor.darken(0.5);

        customStyle = {
          '--callout-border-color-light': `${hexColor}33`,
          '--callout-bg-color-light': `${hexColor}1a`,
          '--callout-border-color-dark': `${hexColor}${isDarkColor ? '66' : '4d'}`,
          '--callout-bg-color-dark': `${hexColor}${isDarkColor ? '4d' : '1a'}`,
        };

        customTextStyle = {
          '--callout-text-color': `${darkerTextColor.hex()}`,
          '--dark-callout-text-color': `${lighterTextColor.hex()}`,
        };

        variantClassName = 'border border-[var(--callout-border-color-light,#71717a33)] bg-[var(--callout-bg-color-light,#71717a1a)] dark:border-[var(--callout-border-color-dark,#71717a4d)] dark:bg-[var(--callout-bg-color-dark,#71717a1a)]';
        childrenClassName = 'mt-1 text-[var(--callout-text-color)] dark:text-[var(--dark-callout-text-color)]';
      } catch {
        finalColor = undefined;
        variantClassName = 'border border-zinc-500/20 bg-zinc-50/50 dark:border-zinc-500/30 dark:bg-zinc-500/10';
        childrenClassName = 'text-zinc-900 dark:text-zinc-200';
      }
    } else {
      variantClassName = 'border border-zinc-500/20 bg-zinc-50/50 dark:border-zinc-500/30 dark:bg-zinc-500/10';
      childrenClassName = 'text-zinc-900 dark:text-zinc-200';
    }
  } else {
    const config = variantConfig[variant];
    const IconComponent = config.icon;
    finalIcon = <IconComponent ariaLabel={ariaLabel || config.defaultAriaLabel} />;
    variantClassName = config.className;
    childrenClassName = config.childrenClassName;
  }

  const IconElement =
    typeof finalIcon === 'string' ? (
      <ComponentIcon
        icon={finalIcon}
        iconType={iconType}
        iconLibrary={iconLibrary}
        color={finalColor}
        className="h-4 w-4 !m-0 shrink-0"
      />
    ) : (
      finalIcon
    );

  return (
    <div
      className={cn(
        Classes.Callout,
        'my-4 px-5 py-4 overflow-hidden rounded-2xl flex gap-3',
        variantClassName,
        className
      )}
      style={{ ...customStyle, ...customTextStyle }}
      data-callout-type={variant}
    >
      {!!IconElement && (
        <div
          className="mt-0.5 w-4"
          data-component-part="callout-icon"
          {...(variant === 'custom' && ariaLabel && { 'aria-label': ariaLabel })}
        >
          {IconElement}
        </div>
      )}
      <div
        className={cn(
          'text-sm prose dark:prose-invert min-w-0 w-full [&_kbd]:bg-zinc-100 dark:[&_kbd]:bg-zinc-800 [&_code]:!text-current [&_kbd]:!text-current [&_a]:!text-current [&_a]:border-current',
          childrenClassName
        )}
        style={customTextStyle}
        data-component-part="callout-content"
      >
        {children}
      </div>
    </div>
  );
}

// Backward compatibility exports
type BackwardCompatibleCalloutProps = Omit<CalloutProps, 'variant'>;

export function Info(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="info" />;
}

export function Warning(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="warning" />;
}

export function Note(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="note" />;
}

export function Tip(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="tip" />;
}

export function Check(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="check" />;
}

export function Danger(props: BackwardCompatibleCalloutProps) {
  return <Callout {...props} variant="danger" />;
}
