export const getMethodBgColor = (method?: string) => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'bg-green-600';
    case 'POST':
      return 'bg-blue-600';
    case 'PUT':
      return 'bg-yellow-600';
    case 'DELETE':
      return 'bg-red-600';
    case 'PATCH':
      return 'bg-orange-600';
    default:
      return 'bg-slate-600';
  }
};

export const getMethodBgHoverColor = (method?: string) => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'hover:bg-green-800 disabled:bg-green-700';
    case 'POST':
      return 'hover:bg-blue-800 disabled:bg-blue-700';
    case 'PUT':
      return 'hover:bg-yellow-800 disabled:bg-yellow-700';
    case 'DELETE':
      return 'hover:bg-red-800 disabled:bg-red-700';
    case 'PATCH':
      return 'hover:bg-orange-800 disabled:bg-orange-700';
    default:
      return 'hover:bg-slate-800 disabled:bg-slate-700';
  }
};

export const getMethodTextColor = (method?: string) => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'text-green-600 dark:text-green-500';
    case 'POST':
      return 'text-blue-600 dark:text-blue-500';
    case 'PUT':
      return 'text-yellow-600 dark:text-yellow-500';
    case 'DELETE':
      return 'text-red-600 dark:text-red-500';
    case 'PATCH':
      return 'text-orange-600 dark:text-orange-500';
    default:
      return 'text-slate-600 dark:text-slate-500';
  }
};

export const getMethodBorderColor = (method?: string) => {
  switch (method?.toUpperCase()) {
    case 'GET':
      return 'border-green-600 dark:border-green-500';
    case 'POST':
      return 'border-blue-600 dark:border-blue-500';
    case 'PUT':
      return 'border-yellow-600 dark:border-yellow-500';
    case 'DELETE':
      return 'border-red-600 dark:border-red-500';
    case 'PATCH':
      return 'border-orange-600 dark:border-orange-500';
    default:
      return 'border-slate-600 dark:border-slate-500';
  }
};
