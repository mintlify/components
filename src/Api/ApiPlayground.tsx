import clsx from "clsx";
import set from "lodash.set";
import { ReactNode, useState } from "react";
import {
  getMethodBgColor,
  getMethodTextColor,
  getMethodBorderColor,
  getMethodBgHoverColor,
} from "../utils/apiPlaygroundColors";
import { ApiInput } from "./inputs/ApiInput";
import { ApiInputValue, ParamGroup, RequestMethods } from "./types";

export function ApiPlayground({
  method,
  paramGroups,
  paramValues,
  isSendingRequest,
  onChangeParamValues,
  onSendRequest,
  header,
  response,
}: {
  /** Request method. */
  method: RequestMethods;

  /** Array of param groups to show as tabs for input. */
  paramGroups: ParamGroup[];

  /** Values to show in the ApiInputs. Key is the param group name. */
  paramValues: Record<string, Record<string, any>>;

  /** Whether you are currently sending a request.
   *  The Send Request button is disabled and the response is hidden while this is true. */
  isSendingRequest: boolean;

  /** Callback when the user changes a parameter's value. */
  onChangeParamValues: (
    paramValues: Record<string, Record<string, any>>
  ) => void;

  /** Callback when the user clicks the Send Request button. */
  onSendRequest: () => void;

  /** Header to show above parameter inputs. */
  header?: ReactNode;

  /** Response to show underneath the playground.
   *  This component does not automatically syntax highlight code. */
  response?: ReactNode;
}) {
  const [currentActiveParamGroup, setCurrentActiveParamGroup] =
    useState<ParamGroup>(paramGroups[0]);

  const setParamInObject = (
    paramGroupName: string,
    parentInputs: string[],
    paramName: string,
    value: ApiInputValue
  ) => {
    const newParamGroup = {
      ...paramValues[paramGroupName],
      ...set(paramValues[paramGroupName], [...parentInputs, paramName], value),
    };
    onChangeParamValues({ ...paramValues, [paramGroupName]: newParamGroup });
  };

  return (
    <div className="mt-4 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 rounded-md truncate">
      <div className="px-3.5 pt-3.5 pb-4">
        {header}
        <div className="text-sm">
          <div className="block">
            <div className="border-b border-slate-200 dark:border-slate-600">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {paramGroups.map((paramGroup: ParamGroup) => (
                  <button
                    key={paramGroup.name}
                    className={clsx(
                      currentActiveParamGroup?.name === paramGroup.name
                        ? `${getMethodTextColor(method)} ${getMethodBorderColor(
                            method
                          )}`
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200",
                      "whitespace-nowrap py-2 border-b-2 font-medium text-[0.84rem]"
                    )}
                    onClick={() => setCurrentActiveParamGroup(paramGroup)}
                  >
                    {paramGroup.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {currentActiveParamGroup?.params.map((param, i) => (
              <ApiInput
                key={`${param.name}${i}`}
                param={param}
                value={
                  paramValues[currentActiveParamGroup.name][param.name] ?? ""
                }
                onChangeParam={(
                  parentInputs: string[],
                  paramName: string,
                  paramValue: ApiInputValue
                ) =>
                  setParamInObject(
                    currentActiveParamGroup.name,
                    parentInputs,
                    paramName,
                    paramValue
                  )
                }
              />
            ))}
          </div>
          <button
            className={clsx(
              "flex items-center py-1.5 px-3 rounded text-white font-medium space-x-2",
              getMethodBgColor(method),
              getMethodBgHoverColor(method),
              currentActiveParamGroup && "mt-4"
            )}
            disabled={isSendingRequest}
            onClick={onSendRequest}
          >
            <svg
              className="fill-white h-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
            </svg>
            <div>{!isSendingRequest ? "Send Request" : "Sending..."}</div>
          </button>
        </div>
      </div>
      {!isSendingRequest ? response : null}
    </div>
  );
}
