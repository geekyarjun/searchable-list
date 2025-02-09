import React from 'react';
import styled, { CSSObject } from 'styled-components';

import { defaultTheme } from './SearchableList/SearchableList.styles';

type ConvertToKebab<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${ConvertToKebab<Rest>}`
  : '';

type KebabCaseCSS = {
  [K in keyof CSSObject as ConvertToKebab<string & K>]: string | number;
};

interface StyledProps extends KebabCaseCSS {}

interface TextDisplayProps {
  primaryText: string;
  secondaryText?: string;
  primaryTextStyle?: React.CSSProperties;
  secondaryTextStyle?: React.CSSProperties;
  primaryTextClassName?: string;
  secondaryTextClassName?: string;
}

const PrimaryText = styled.div<Partial<StyledProps>>`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) =>
    theme?.colors?.text?.primary || defaultTheme.colors.text.primary};

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !['children', 'as', 'theme'].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

const SecondaryText = styled.div<Partial<StyledProps>>`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) =>
    theme?.colors?.text?.light || defaultTheme.colors.text.light};

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !['children', 'as', 'theme'].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

const TextDisplay: React.FC<TextDisplayProps> = ({
  primaryText,
  secondaryText,
  primaryTextStyle,
  secondaryTextStyle,
  primaryTextClassName,
  secondaryTextClassName,
}) => {
  return (
    <div>
      <PrimaryText {...primaryTextStyle} className={primaryTextClassName}>
        {primaryText}
      </PrimaryText>
      {secondaryText && (
        <SecondaryText
          {...secondaryTextStyle}
          className={secondaryTextClassName}
        >
          {secondaryText}
        </SecondaryText>
      )}
    </div>
  );
};

export default TextDisplay;
