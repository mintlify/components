import { useCallback, useEffect, useRef, useState } from 'react';

const USER_TOGGLED_EXPANDABLES_KEY = 'user_toggled_expandables';

const getManuallyToggledExpandables = (): Record<string, boolean> => {
    try {
        const manuallyToggledExpandables = sessionStorage.getItem(USER_TOGGLED_EXPANDABLES_KEY);
        return manuallyToggledExpandables ? JSON.parse(manuallyToggledExpandables) : {};
    } catch {
        return {};
    }
};

const saveManuallyToggledState = (id: string, isExpanded: boolean) => {
    try {
        const current = getManuallyToggledExpandables();
        const updated = { ...current, [id]: isExpanded };
        sessionStorage.setItem(USER_TOGGLED_EXPANDABLES_KEY, JSON.stringify(updated));
    } catch {
        // silently fail if setItem() fails
    }
};

export const useExpandableMemory = (id: string | undefined, defaultExpanded = false) => {
    const ref = useRef<HTMLElement>(null);

    // track if user manually clicked the expandable
    const [manuallyChanged, setManuallyChanged] = useState(false);

    // track if the expandable state exists in session storage
    const [isInSessionStorage, setIsInSessionStorage] = useState(false);

    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    useEffect(() => {
        if (!id) return;

        const manuallyToggledExpandables = getManuallyToggledExpandables();
        if (id in manuallyToggledExpandables) {
            setIsExpanded(!!manuallyToggledExpandables[id]);
            setManuallyChanged(true);
            setIsInSessionStorage(true);
        }
    }, [id]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]) {
                    // Only auto-expand if the user hasn't manually clicked the expandable
                    // Don't update visibility state constantly during scroll
                    if (entries[0].isIntersecting && !manuallyChanged && defaultExpanded) {
                        setIsExpanded((prev) => (!prev ? true : prev));
                    }
                }
            },
            {
                rootMargin: '100px',
                threshold: 0,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [manuallyChanged, defaultExpanded]);

    const onManualToggle = useCallback(
        (expanded: boolean) => {
            setIsExpanded(expanded);
            setManuallyChanged(true);
            setIsInSessionStorage(true);

            if (id) {
                saveManuallyToggledState(id, expanded);
            }
        },
        [id]
    );

    return { ref, isExpanded, onManualToggle, isInSessionStorage };
};
