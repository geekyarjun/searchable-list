import React from "react";
import styled, { css } from "styled-components";
import { defaultTheme } from "./SearchableList/SearchableList";
import { StyledProps } from "styled-components";

interface TextDisplayProps {
  primaryText: string;
  secondaryText?: string;
  primaryTextStyle?: React.CSSProperties;
  secondaryTextStyle?: React.CSSProperties;
  primaryTextClassName?: string;
  secondaryTextClassName?: string;
}

// const PrimaryText = styled.div<{ customStyle?: React.CSSProperties }>`
//   ${({ customStyle }) => css`
//     ${customStyle}
//   `}
// `;

// const SecondaryText = styled.div<{ customStyle?: React.CSSProperties }>`
//   font-size: 13px;
//   color: ${({ theme }) =>
//     theme?.colors?.text?.light || defaultTheme.colors.text.light};
//   ${({ customStyle }) => css`
//     ${customStyle}
//   `}
// `;

const PrimaryText = styled.div<StyledProps>`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) =>
    theme?.colors?.text?.primary || defaultTheme.colors.text.primary};

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !["children", "as", "theme"].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

const SecondaryText = styled.div<StyledProps>`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) =>
    theme?.colors?.text?.light || defaultTheme.colors.text.light};

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !["children", "as", "theme"].includes(key))
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
      <PrimaryText
        {...primaryTextStyle}
        className={primaryTextClassName}
        // customStyle={primaryTextStyle}
      >
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
