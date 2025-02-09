import { CSSObject } from 'styled-components';

// Utility type to convert camelCase to kebab-case
type ConvertToKebab<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${ConvertToKebab<Rest>}`
  : '';

// Mapped type for kebab-case CSS properties
export type KebabCaseCSS = {
  [K in keyof CSSObject as ConvertToKebab<string & K>]: string | number;
};
