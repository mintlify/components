import React from 'react';
import { ComponentIcon } from '@/ui/Icon';
import { cn } from '@/utils/cn';
import { IconLibrary, IconType } from '@/models';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';
export type BadgeColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'white'
  | 'surface'
  | 'white-destructive'
  | 'surface-destructive';

const sizeVariants: Record<BadgeSize, string> = {
  lg: 'gap-1 py-1 pl-2.5 pr-2.5 [&_svg]:size-3.5 text-sm tracking-[-0.1px] data-[shape="rounded"]:rounded-[8px]',
  md: 'gap-1 py-0.5 pl-2 pr-2 [&_svg]:size-3.5 text-sm tracking-[-0.1px] data-[shape="rounded"]:rounded-[8px]',
  sm: 'gap-[3px] py-0.5 pl-1.5 pr-1.5 [&_svg]:size-3 text-xs data-[shape="rounded"]:rounded-[6px]',
  xs: 'gap-0.5 py-0 pl-1 pr-1 [&_svg]:size-2.5 text-xs data-[shape="rounded"]:rounded-[4px]',
};

const colorVariants: Record<BadgeColor, string> = {
  gray: '[--color-bg:#F5F5F5] dark:[--color-bg:#262727] [--color-text:#78787A] dark:[--color-text:#D7D7D7] [--color-bg-disabled:#F5F5F5] dark:[--color-bg-disabled:#262727] [--color-text-disabled:#E9E9EA] dark:[--color-text-disabled:#3C3C3D]',
  blue: '[--color-bg:#E3EAFD] dark:[--color-bg:#07296A] [--color-text:#133A9A] dark:[--color-text:#7196F4] [--color-bg-disabled:#F0F4FE] dark:[--color-bg-disabled:#03153A] [--color-text-disabled:rgba(51,104,240,0.50)] dark:[--color-text-disabled:rgba(51,104,240,0.30)]',
  green:
    '[--color-bg:#D1FAE4] dark:[--color-bg:#0F4C2C] [--color-text:#166E3F] dark:[--color-text:#6AE1A1] [--color-bg-disabled:#EDFDF4] dark:[--color-bg-disabled:#072213] [--color-text-disabled:rgba(38,189,108,0.50)] dark:[--color-text-disabled:rgba(38,189,108,0.30)]',
  yellow:
    '[--color-bg:#FEF9C3] dark:[--color-bg:#713F12] [--color-text:#A16207] dark:[--color-text:#FDE047] [--color-bg-disabled:#FEFCE8] dark:[--color-bg-disabled:#422006] [--color-text-disabled:#FEF08A] dark:[--color-text-disabled:#854D0E]',
  orange:
    '[--color-bg:#FDEAD8] dark:[--color-bg:#613105] [--color-text:#AE590A] dark:[--color-text:#F8B577] [--color-bg-disabled:#FEF4EC] dark:[--color-bg-disabled:#301903] [--color-text-disabled:rgba(244,142,47,0.50)] dark:[--color-text-disabled:rgba(244,142,47,0.30)]',
  red: '[--color-bg:#FCE5E4] dark:[--color-bg:#64120D] [--color-text:#9A1C13] dark:[--color-text:#F08B85] [--color-bg-disabled:#FDF2F1] dark:[--color-bg-disabled:#360A07] [--color-text-disabled:rgba(230,72,61,0.50)] dark:[--color-text-disabled:rgba(230,72,61,0.30)]',
  purple:
    '[--color-bg:#ECDFFB] dark:[--color-bg:#3A0F71] [--color-text:#5314A3] dark:[--color-text:#B78AF0] [--color-bg-disabled:#ECDFFB] dark:[--color-bg-disabled:#3A0F71] [--color-text-disabled:rgba(135,61,230,0.50)] dark:[--color-text-disabled:rgba(135,61,230,0.30)]',
  white:
    '[--color-bg:rgba(255,255,255,0.95)] dark:[--color-bg:rgba(255,255,255,0.95)] [--color-text:rgba(11,12,14,0.60)] dark:[--color-text:rgba(11,12,14,0.60)] [--color-bg-disabled:rgba(255,255,255,0.08)] dark:[--color-bg-disabled:rgba(255,255,255,0.24)] [--color-text-disabled:#E9E9EA] dark:[--color-text-disabled:#3C3C3D]',
  surface:
    '[--color-bg:rgba(255,255,255,0.95)] dark:[--color-bg:#262727] [--color-text:#78787A] dark:[--color-text:#D7D7D7] [--color-bg-disabled:rgba(255,255,255,0.95)] dark:[--color-bg-disabled:#262727] [--color-text-disabled:#E9E9EA] dark:[--color-text-disabled:#3C3C3D]',
  'white-destructive':
    '[--color-bg:rgba(255,255,255,0.95)] dark:[--color-bg:rgba(255,255,255,0.95)] [--color-text:#E6483D] dark:[--color-text:#E6483D] [--color-bg-disabled:rgba(255,255,255,0.08)] dark:[--color-bg-disabled:rgba(255,255,255,0.24)] [--color-text-disabled:rgba(230,72,61,0.30)] dark:[--color-text-disabled:rgba(230,72,61,0.40)]',
  'surface-destructive':
    '[--color-bg:rgba(255,255,255,0.95)] dark:[--color-bg:#262727] [--color-text:#E6483D] dark:[--color-text:#E6483D] [--color-bg-disabled:rgba(255,255,255,0.95)] dark:[--color-bg-disabled:#262727] [--color-text-disabled:rgba(230,72,61,0.30)] dark:[--color-text-disabled:rgba(230,72,61,0.40)]',
};

export type BadgeProps = {
  children: React.ReactNode;
  color?: BadgeColor;
  shape?: BadgeShape;
  size?: BadgeSize;
  stroke?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
};

const Badge = ({
  children,
  className,
  color = 'gray',
  shape = 'rounded',
  stroke = false,
  disabled = false,
  size = 'md',
  icon,
  iconType,
  iconLibrary = 'fontawesome',
}: BadgeProps) => {
  const isStringIcon = typeof icon === 'string';
  const Icon = isStringIcon ? (
    <ComponentIcon
      icon={icon}
      iconType={iconType}
      iconLibrary={iconLibrary}
      className="shrink-0 bg-[--color-text] data-[disabled='true']:bg-[--color-text-disabled]"
      overrideColor
    />
  ) : (
    icon
  );

  return (
    <span
      data-shape={shape}
      data-stroke={stroke}
      data-disabled={disabled}
      className={cn(
        'inline-flex items-center w-fit font-medium relative data-[disabled="true"]:cursor-not-allowed',
        "data-[shape='pill']:rounded-full",
        "data-[stroke='true']:outline data-[stroke='true']:outline-1 data-[stroke='true']:-outline-offset-[1px] data-[stroke='true']:outline-[rgba(11,12,14,0.08)] dark:data-[stroke='true']:outline-[rgba(255,255,255,0.14)]",
        'bg-[--color-bg] text-[--color-text] data-[disabled="true"]:bg-[--color-bg-disabled] data-[disabled="true"]:text-[--color-text-disabled]',
        isStringIcon && '[&_svg]:bg-[--color-text] [&_svg]:data-[disabled="true"]:bg-[--color-text-disabled]',
        !isStringIcon && '[&_svg]:fill-current',
        sizeVariants[size],
        colorVariants[color],
        className
      )}
    >
      {!!Icon && Icon}
      {children}
    </span>
  );
};

export { Badge };
