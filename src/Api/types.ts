export type RequestMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "COPY" // "COPY" and everything below has a grey color
  | "HEAD"
  | "OPTIONS"
  | "LINK"
  | "UNLINK"
  | "PURGE"
  | "LOCK"
  | "UNLOCK"
  | "PROPFIND"
  | "VIEW";

export type ParamGroup = {
  name: string;
  params: Param[];
};

export type Param = {
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  enum?: string[];
  format?: string;
  group?: string;
  properties?: Param[];
};

export type ApiInputValue =
  | string
  | number
  | boolean
  | File
  | string[]
  | number[]
  | boolean[]
  | File[];
