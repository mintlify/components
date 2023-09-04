import cn from 'clsx';
import { ReactNode } from 'react';

export type StepProps = {
  indicator?: ReactNode;
  title: string | ReactNode;
  description?: string | ReactNode;
  children?: string | ReactNode;
  variant?: 'subtle' | 'outline';
};

const Step = ({ indicator, title, description, children, variant = 'subtle' }: StepProps) => {
  return (
    <div role="listitem" className="flex items-start gap-8 first:pt-0 pt-4">
      <div className="absolute ml-[-38px] p-1 rounded-[6px] bg-white dark:bg-zinc-900">
        <div
          className={cn(
            'w-5 h-5 shrink-0 border rounded-[4px] text-sm flex items-center justify-center text-center font-mono',
            {
              'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-transparent': variant === 'subtle',
              'text-zinc-500 border-zinc-200': variant === 'outline',
            }
          )}
        >
          {indicator}
        </div>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Step;
