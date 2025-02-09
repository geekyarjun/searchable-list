/// <reference types="vite/client" />

import { Theme } from './theme/theme';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
