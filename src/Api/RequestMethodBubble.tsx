import { clsx } from 'clsx';
import React from 'react';

import { getMethodBgColor } from '../utils/apiPlaygroundColors';
import { RequestMethods } from './types';

export const RequestMethodBubble = ({ method }: { method: RequestMethods }) => (
  <span
    className={clsx(
      'inline-block text-white font-bold px-1.5 rounded-md text-[0.95rem]',
      getMethodBgColor(method)
    )}
  >
    {method}
  </span>
);
