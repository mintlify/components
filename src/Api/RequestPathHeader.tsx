import { BaseUrlDropdown } from "./BaseUrlDropdown";
import { RequestMethodBubble } from "./RequestMethodBubble";
import { RequestMethods } from "./types";

export const RequestPathHeader = ({
  method,
  path,
  baseUrls,
  defaultBaseUrl,
  onBaseUrlChange,
}: {
  /** Request method. */
  method: RequestMethods;

  /** Path text to show beside the request method bubble. */
  path: string;

  /** Array of baseUrls to select from. Dropdown is hidden when there are zero or one options. */
  baseUrls: string[];

  /** What value of baseUrl the dropdown should show as selected before the user has changed the selection. */
  defaultBaseUrl?: string;

  /** Callback when the user changes the baseUrl in the dropdown. */
  onBaseUrlChange: (baseUrl: string) => void;
}) => (
  <div className="text-sm md:text-base flex items-center space-x-2 mb-2">
    <RequestMethodBubble method={method} />
    <BaseUrlDropdown
      baseUrls={baseUrls}
      defaultValue={defaultBaseUrl}
      onChange={onBaseUrlChange}
    />
    <div className="font-mono text-[0.95rem] overflow-auto">
      <p className="inline-block text-slate-700 dark:text-slate-100 font-semibold">
        {path}
      </p>
    </div>
  </div>
);
