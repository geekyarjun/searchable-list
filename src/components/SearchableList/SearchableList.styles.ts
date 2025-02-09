import styled from 'styled-components';

import { StyledProps } from './SearchableList.types';

// Add default theme values
export const defaultTheme = {
  colors: {
    primary: '#007AFF',
    background: {
      main: '#ffffff',
      light: 'rgba(0, 0, 0, 0.02)',
      hover: 'rgba(0, 0, 0, 0.04)',
      secondaryHover: 'rgba(242, 245, 247, 1)',
      secondaryActive: 'rgba(230, 236, 239, 1)',
      element: 'rgba(255, 255, 255, 1)',
    },
    border: 'rgba(0, 0, 0, 0.1)',
    borderMedium: 'rgba(228, 229, 232, 1)',
    text: {
      primary: 'rgba(32, 55, 75, 1)',
      secondary: 'rgba(0, 0, 0, 0.4)',
      light: 'rgba(90, 109, 128, 1)',
      placeholder: 'rgba(142, 154, 165, 1)',
    },
    primary200: 'rgba(244, 241, 253, 1)',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: {
    small: '6px',
    medium: '8px',
    large: '12px',
  },
};

export const Container = styled.div<Partial<StyledProps>>`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) =>
    theme?.colors?.background?.main || defaultTheme.colors.background.main};
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.medium || defaultTheme.borderRadius.medium};
  box-shadow: 0 2px 8px ${'rgba(0, 0, 0, 0.1)'};
  font-family: 'Roboto', sans-serif;

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !['children', 'as', 'theme'].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 16px;
    width: 20px;
    height: 20px;
    color: ${({ theme }) =>
      theme?.colors?.text?.secondary || defaultTheme.colors.text.secondary};
    pointer-events: none;
    transition: color 0.2s ease;
  }

  input:focus + svg,
  input:focus ~ svg {
    color: ${({ theme }) =>
      theme?.colors?.primary || defaultTheme.colors.primary};
  }
`;

export const SearchInput = styled.input<Partial<StyledProps>>`
  width: 100%;
  height: 48px;
  padding: 14px 16px 14px 48px;
  border: 0;
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.small || defaultTheme.borderRadius.small};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  transition: all 0.2s ease;
  background: ${({ theme }) =>
    theme?.colors?.background?.main || defaultTheme.colors.background.main};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme?.colors?.text?.placeholder || defaultTheme.colors.text.placeholder};
    font-size: 14px;
    font-weight: 400;
    line-height: 20;
  }

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !['children', 'as', 'theme'].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

export const SectionHeader = styled.button<Partial<StyledProps>>`
  padding-left: ${({ theme }) =>
    `${theme?.spacing?.medium || defaultTheme.spacing.medium}`};
  padding-right: ${({ theme }) =>
    `${theme?.spacing?.small || defaultTheme.spacing.small}`};
  padding-top: 8.5px;
  padding-bottom: 8.5px;
  background: ${({ theme }) =>
    theme?.colors?.background?.light || defaultTheme.colors.background.light};
  color: ${({ theme }) =>
    theme?.colors?.text?.light || defaultTheme.colors.text.light};
  font-weight: 500;
  font-size: 14px;
  line-height: 20;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  border-top: 1px solid
    ${({ theme }) =>
      theme?.colors?.borderMedium || defaultTheme.colors.borderMedium};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme?.colors?.borderMedium || defaultTheme.colors.borderMedium};

  &:hover {
    background: ${({ theme }) =>
      theme?.colors?.background?.hover || defaultTheme.colors.background.hover};
  }

  svg {
    color: ${({ theme }) =>
      theme?.colors?.text?.secondary || defaultTheme.colors.text.secondary};
  }

  &:hover {
    background: ${({ theme }) =>
      theme?.colors?.background?.hover || defaultTheme.colors.background.hover};

    border-color: ${({ theme }) =>
      theme?.colors?.background?.hover || defaultTheme.colors.background.hover};
  }

  & > span {
    line-height: normal;
  }

  &:focus {
    background: ${({ theme }) =>
      theme?.colors?.background?.hover || defaultTheme.colors.background.hover};
    outline: 4px auto
      ${({ theme }) =>
        theme?.colors?.background?.hover ||
        defaultTheme.colors.background.hover};
  }
`;

export const AvatarWrapper = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 12px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ListItem = styled.div<Partial<StyledProps>>`
  padding: ${({ theme }) =>
    `${theme?.spacing?.small || defaultTheme.spacing.small} ${
      theme?.spacing?.small || defaultTheme.spacing.small
    }`};
  margin: 0 8px; // Keep the margin
  width: calc(100% - 16px) !important;
  left: 8px;
  color: ${({ theme }) =>
    theme?.colors?.text?.primary || defaultTheme.colors.text.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.small || defaultTheme.borderRadius.small};
  display: flex;
  align-items: center;
  position: absolute;

  &:hover {
    background: ${({ theme }) =>
      theme?.colors?.background?.secondaryHover ||
      defaultTheme.colors.background.secondaryHover};
  }
`;
