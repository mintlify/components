import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Search, type SearchProps } from "./search";

export interface SearchContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export interface SearchProviderProps {
  children: ReactNode;
  /** Keyboard shortcut key (default: 'k') */
  shortcutKey?: string;
  /** Require Cmd/Ctrl modifier (default: true) */
  requireModifier?: boolean;
  /** Search component props */
  searchProps: Omit<SearchProps, "isOpen" | "onClose">;
}

export function SearchProvider({
  children,
  shortcutKey = "k",
  requireModifier = true,
  searchProps,
}: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const modifierPressed = e.metaKey || e.ctrlKey;
      const shouldTrigger = requireModifier
        ? modifierPressed && e.key.toLowerCase() === shortcutKey.toLowerCase()
        : e.key.toLowerCase() === shortcutKey.toLowerCase();

      if (shouldTrigger) {
        // Skip if user is typing in an editable element and no modifier is pressed
        if (!modifierPressed) {
          const target = e.target as HTMLElement;
          const isEditable =
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable;

          if (isEditable) {
            return;
          }
        }

        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutKey, requireModifier, toggle]);

  return (
    <SearchContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      <Search {...searchProps} isOpen={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
