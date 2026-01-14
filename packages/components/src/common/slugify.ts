import { CountableSlugify, slugifyWithCounter } from '@sindresorhus/slugify';

import { getUnicodeId } from './getUnicodeId';

export function slugify(string: string, slugify: CountableSlugify = slugifyWithCounter()) {
    const encodedString = getUnicodeId(string);

    // if encoded title is already percent-encoded, return it as is
    // slugify doesn't support percent-encoded characters, like Chinese, Korean, etc.
    if (/%[0-9A-F]{2}/.test(encodedString)) {
        return slugify(encodedString, {
            decamelize: false,
            preserveCharacters: ['%', '_'],
            lowercase: false,
        });
    } else {
        return slugify(encodedString, { decamelize: false, preserveCharacters: ['_'] });
    }
}
