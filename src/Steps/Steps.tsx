import Step, { type StepProps } from './Step';

type StepsProps = {
  children: React.ReactElement<StepProps>[];
};

const Steps = ({ children }: StepsProps) => {
  return (
    <div className="ml-4 mb-12 border-l border-gray-200 pl-6">
      {Array.isArray(children)
        ? children.map(({ props }, index) => (
            <Step key={props.title + index} {...props} indicator={props.indicator ?? index + 1} />
          ))
        : children}
    </div>
  );
};

export default Steps;
