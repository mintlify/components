const MARKER_IDS = [
  "arrowhead",
  "crosshead",
  "filled-head",
  "sequencenumber",
  "compositionStart",
  "compositionEnd",
  "aggregationStart",
  "aggregationEnd",
  "dependencyStart",
  "dependencyEnd",
  "extensionStart",
  "extensionEnd",
  "lollipopStart",
  "lollipopEnd",
  "ZERO_OR_ONE_START",
  "ZERO_OR_ONE_END",
  "ONLY_ONE_START",
  "ONLY_ONE_END",
  "ZERO_OR_MORE_START",
  "ZERO_OR_MORE_END",
  "ONE_OR_MORE_START",
  "ONE_OR_MORE_END",
  "MD_PARENT_START",
  "MD_PARENT_END",
];

const makeMarkerIdsUnique = (svg: string, prefix: string): string => {
  let result = svg;
  for (const markerId of MARKER_IDS) {
    const uniqueMarkerId = `${prefix}-${markerId}`;

    result = result.replace(
      new RegExp(`id="${markerId}"`, "g"),
      `id="${uniqueMarkerId}"`
    );

    result = result.replace(
      new RegExp(`url\\(#${markerId}\\)`, "g"),
      `url(#${uniqueMarkerId})`
    );
  }

  return result;
};

export { makeMarkerIdsUnique };
