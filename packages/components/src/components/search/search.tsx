import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronRightIcon,
  Loader2Icon,
  SearchIcon,
  SearchXIcon,
} from "lucide-react";
import {
  Fragment,
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";

type SearchResult = {
  id: string;
  header: string;
  content: string;
  link: string;
  icon?: ReactNode;
  metadata?: {
    breadcrumbs?: string[];
    [key: string]: unknown;
  };
};

type SearchProps = {
  onSearch: (query: string) => void;
  results: SearchResult[];
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  placeholder?: string;
  recentSearches?: SearchResult[];
  onSelectResult?: (result: SearchResult, query: string) => void;
  className?: string;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  position?: "top" | "center";
  paddingTop?: string;
};

type SearchHitProps = {
  isActive: boolean;
  header: string;
  description: string;
  icon?: ReactNode;
  metadata?: SearchResult["metadata"];
  className?: string;
};

const SearchHit = ({
  isActive,
  header,
  description,
  icon,
  metadata,
  className,
}: SearchHitProps) => {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-start gap-2 rounded-xl border border-transparent bg-transparent px-3 py-2 text-stone-500 transition-colors focus:ring-0 focus:ring-offset-0",
        isActive && "bg-stone-100 dark:bg-white/5",
        className
      )}
    >
      {icon && (
        <div className="shrink-0 self-center text-stone-700 dark:text-stone-300">
          {icon}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        {metadata?.breadcrumbs && metadata.breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1 truncate text-stone-500 text-xs dark:text-stone-400">
            {metadata.breadcrumbs.map((crumb, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Breadcrumbs are positional and may contain duplicates
              <Fragment key={idx}>
                {idx > 0 && <span className="text-stone-400"> &gt; </span>}
                <span className="truncate">{crumb}</span>
              </Fragment>
            ))}
          </div>
        )}
        <div className="truncate font-medium text-sm text-stone-900 dark:text-white">
          {header}
        </div>
        {description && (
          <div className="line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
            {description}
          </div>
        )}
      </div>
      {isActive && (
        <ChevronRightIcon className="size-5 shrink-0 self-center text-stone-400 dark:text-stone-500" />
      )}
    </div>
  );
};

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      onSearch,
      results,
      isOpen,
      onClose,
      isLoading = false,
      placeholder = "Search...",
      recentSearches = [],
      onSelectResult,
      className,
      emptyState,
      loadingState,
      position = "top",
      paddingTop = "64px",
    },
    ref
  ) => {
    const [query, setQuery] = useState("");
    const [isContentScrolled, setIsContentScrolled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // biome-ignore lint/style/noNonNullAssertion: Ref is guaranteed to exist when accessed
    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
      if (!isOpen) {
        setQuery("");
        setIsContentScrolled(false);
      }
    }, [isOpen]);

    const handleQueryChange = useCallback(
      (value: string) => {
        setQuery(value);
        onSearch(value);
      },
      [onSearch]
    );

    const handleSelectOption = useCallback(
      (result: SearchResult) => {
        if (!result) {
          return;
        }
        onSelectResult?.(result, query);
        onClose();
      },
      [onSelectResult, query, onClose]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle Escape key
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
          return;
        }

        // Handle Tab key to prevent default behavior when results exist
        if (
          e.key === "Tab" &&
          (results.length > 0 || recentSearches.length > 0)
        ) {
          e.preventDefault();
          // Reset cursor position to end of input
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          );
        }

        // Handle Enter + Cmd/Ctrl to select first result
        if (
          e.key === "Enter" &&
          (e.metaKey || e.ctrlKey) &&
          query &&
          results.length > 0 &&
          !isLoading
        ) {
          const firstResult = results[0];
          if (firstResult) {
            handleSelectOption(firstResult);
          }
        }
      },
      [results, recentSearches, handleSelectOption, onClose, query, isLoading]
    );

    const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
      setIsContentScrolled(e.currentTarget.scrollTop > 0);
    }, []);

    const showRecentSearches = useMemo(
      () => !query && recentSearches.length > 0 && results.length === 0,
      [query, recentSearches.length, results.length]
    );

    const showResults = useMemo(
      () => query && results.length > 0 && !isLoading,
      [query, results.length, isLoading]
    );

    const showEmptyState = useMemo(
      () => query && !isLoading && results.length === 0,
      [query, isLoading, results.length]
    );

    const searchContent = (
      <Combobox<SearchResult | null>
        onChange={(value) => {
          if (value) {
            handleSelectOption(value);
          }
        }}
        value={null}
      >
        <div
          className={cn(
            "relative z-10 h-14 border-transparent border-b p-1.5 transition",
            isContentScrolled && "border-stone-200 dark:border-white/10"
          )}
        >
          <ComboboxInput
            autoComplete="off"
            autoFocus
            className={cn(
              "peer h-full w-full rounded-xl bg-white pr-14 pl-11 text-stone-950 tracking-tight shadow-sm outline-none ring ring-black/5 transition placeholder:text-stone-400 focus:ring-black/90 dark:bg-stone-900 dark:text-white dark:focus:ring-white placeholder:dark:text-white/50",
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
              !isContentScrolled && query && "shadow-lg"
            )}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            type="search"
            value={query}
          />
          <SearchIcon
            className="absolute top-1/2 left-5 -translate-y-1/2 text-stone-950 opacity-50 peer-focus:opacity-100 dark:text-white"
            size={18}
          />
          {query && (
            <div className="absolute top-1/2 right-6 flex -translate-y-1/2 items-center justify-center gap-1 rounded-md bg-stone-950/5 px-1.5 py-1.5 font-medium text-xs text-zinc-950/70 leading-[9px] dark:bg-white/5 dark:text-white/70">
              ESC
            </div>
          )}
        </div>

        <ComboboxOptions
          className="mx-1.5 max-h-[calc(100vh-10rem)] overflow-y-auto"
          onScroll={handleScroll}
          static
        >
          {showRecentSearches && (
            <>
              <div className="flex items-center justify-between px-2.5 py-2">
                <span className="truncate text-sm text-stone-500">
                  Recent searches
                </span>
              </div>
              {recentSearches.map((result) => (
                <ComboboxOption
                  className="last:mb-2"
                  key={result.id}
                  value={result}
                >
                  {({ focus }) => (
                    <SearchHit
                      description={result.content}
                      header={result.header}
                      icon={result.icon}
                      isActive={focus}
                      metadata={result.metadata}
                    />
                  )}
                </ComboboxOption>
              ))}
            </>
          )}

          {showResults &&
            results.map((result) => (
              <ComboboxOption
                className="last:mb-2"
                key={result.id}
                value={result}
              >
                {({ focus }) => (
                  <SearchHit
                    description={result.content}
                    header={result.header}
                    icon={result.icon}
                    isActive={focus}
                    metadata={result.metadata}
                  />
                )}
              </ComboboxOption>
            ))}

          {isLoading && query && (
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              {loadingState || (
                <>
                  <Loader2Icon className="size-6 animate-spin text-stone-400 dark:text-stone-500" />
                  <div className="text-center">
                    <p className="font-medium text-sm text-stone-700 dark:text-stone-300">
                      Searching...
                    </p>
                    <p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
                      Finding results for "{query}"
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {showEmptyState && (
            <div className="flex flex-col items-center justify-center gap-3 px-2.5 py-12">
              {emptyState || (
                <>
                  <SearchXIcon className="size-6 text-stone-300 dark:text-stone-600" />
                  <div className="text-center">
                    <p className="font-medium text-sm text-stone-700 dark:text-stone-300">
                      No results found
                    </p>
                    <p className="mt-1 text-stone-500 text-xs dark:text-stone-400">
                      Try searching with different keywords
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </ComboboxOptions>
      </Combobox>
    );

    return (
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className={cn("relative z-50", className)}
          onClose={onClose}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity dark:bg-black/40" />
          </TransitionChild>

          <div
            className={cn(
              "fixed inset-0 z-10 flex justify-center p-4",
              position === "top" ? "items-start" : "items-center"
            )}
            style={position === "top" ? { paddingTop } : undefined}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-white/10 dark:bg-stone-900">
                {searchContent}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

Search.displayName = "Search";

export type { SearchResult, SearchProps };
export { Search, SearchHit };
