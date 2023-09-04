import { ReactNode } from 'react';

export type StepProps = {
  indicator?: ReactNode;
  title: string | ReactNode;
  description?: string | ReactNode;
  children?: string | ReactNode;
  variant?: 'subtle' | 'outline';
};

const Step = ({ indicator, title, description, children, variant }: StepProps) => {
  return (
    <div role="listitem" className="flex items-start gap-8">
      <div className="absolute w-[26px] h-[26px] border-4 border-white bg-slate-100 dark:border-slate-900 dark:bg-slate-800 rounded-lg text-neutral-400 text-base font-normal flex items-center justify-center text-center ml-[-38px]">
        {indicator}
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
