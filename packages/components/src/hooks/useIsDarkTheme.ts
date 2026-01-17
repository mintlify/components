import { useEffect, useState } from "react";

const getIsDarkTheme = () => document.documentElement.classList.contains('dark');


const useIsDarkTheme = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);


    useEffect(() => {
        setIsDarkTheme(getIsDarkTheme());

        const mutationObserver = new MutationObserver(() => {
            setIsDarkTheme(getIsDarkTheme());
        });

        mutationObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            mutationObserver.disconnect();
        };
    }, []);

    return { isDarkTheme };
};

export { useIsDarkTheme };