export const transformationStyles = [
  "Ghibli Studio",
  "Renaissance",
  "Lego",
] as const;

export type StyleProps = (typeof transformationStyles)[number];
