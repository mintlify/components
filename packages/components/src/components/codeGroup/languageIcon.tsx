
import { cn } from '@/utils/cn';
import { getLanguageIconUrl } from '@/utils/iconUtils';

export const LanguageIcon = ({ language, className }: { language: string; className?: string }) => {
    const url = getLanguageIconUrl(language);

    if (!url) {
        return null;
    }

    return (
        <svg
            className={cn('size-3.5 shrink-0', className)}
            style={{
                WebkitMaskImage: `url(${url})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${url})`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: '100%',
                backgroundColor: 'currentColor',
            }}
        ></svg>
    );
};
