import React, { useState, useCallback, useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import styled from "styled-components";
import { rgba } from "polished";
import { SearchIcon } from "../icons/SearchIcon";
import { DefaultAvatar } from "./DefaultAvatar";
import { ChevronRight } from "../icons/ChevronRight";
import { ChevronDown } from "../icons/ChevronDown";
import TextDisplay from "../TextDisplay";

interface StyleProps extends React.CSSProperties {
  isCollapsed?: boolean;
  focusBorderColor?: string;
  focusBoxShadow?: string;
  placeholderColor?: string;
  hoverBackground?: string;
}

interface ItemContent {
  avatarUrl?: string;
  name: string;
  email?: string;
}

interface Item extends ItemContent {
  id: string | number;
  [key: string]: any;
}

interface Section {
  id: string | number;
  title: string;
  items: Item[];
}

interface SearchableListProps {
  data: Section[];
  renderItem?: (
    item: Item,
    defaultRender: (item: ItemContent) => React.ReactNode
  ) => React.ReactNode;
  renderSectionHeader?: (section: {
    title: string;
    sectionId: string | number;
  }) => React.ReactNode;
  onSearch?: (value: string) => void;
  containerStyles?: Partial<StyleProps>;
  searchInputStyles?: Partial<StyleProps>;
  sectionHeaderStyles?: Partial<StyleProps>;
  listItemStyles?: Partial<StyleProps>;
  listHeight?: number;
  containerClassName?: string;
  searchInputClassName?: string;
  sectionHeaderClassName?: string;
  listItemClassName?: string;
  primaryTextStyle?: React.CSSProperties;
  secondaryTextStyle?: React.CSSProperties;
  primaryTextClassName?: string;
  secondaryTextClassName?: string;
}

// Add default theme values
export const defaultTheme = {
  colors: {
    primary: "#007AFF",
    background: {
      main: "#ffffff",
      light: rgba(0, 0, 0, 0.02),
      hover: rgba(0, 0, 0, 0.04),
      secondaryHover: "rgba(242, 245, 247, 1)",
      secondaryActive: "rgba(230, 236, 239, 1)",
      element: "rgba(255, 255, 255, 1)",
    },
    border: rgba(0, 0, 0, 0.1),
    borderMedium: "rgba(228, 229, 232, 1)",
    text: {
      primary: "rgba(32, 55, 75, 1)",
      secondary: rgba(0, 0, 0, 0.4),
      light: "rgba(90, 109, 128, 1)",
      placeholder: "rgba(142, 154, 165, 1)",
    },
    primary200: "rgba(244, 241, 253, 1)",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  borderRadius: {
    small: "6px",
    medium: "8px",
    large: "12px",
  },
};
// padding: ${({ theme }) => theme?.spacing?.medium || defaultTheme.spacing.medium};
const Container = styled.div<StyleProps>`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) =>
    theme?.colors?.background?.main || defaultTheme.colors.background.main};
  border-radius: ${({ theme }) =>
    theme?.borderRadius?.medium || defaultTheme.borderRadius.medium};
  box-shadow: 0 2px 8px ${rgba(0, 0, 0, 0.1)};
  font-family: "Roboto", sans-serif;

  ${(props) =>
    Object.entries(props)
      .filter(([key]) => !["children", "as", "theme"].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

const SearchWrapper = styled.div`
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

  // When input is focused, change the icon color
  input:focus + svg,
  input:focus ~ svg {
    color: ${({ theme }) =>
      theme?.colors?.primary || defaultTheme.colors.primary};
  }
`;

const SearchInput = styled.input<StyleProps>`
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
      .filter(([key]) => !["children", "as", "theme"].includes(key))
      .map(([key, value]) => `${key}: ${value};`)}
`;

const SectionHeader = styled.button<StyleProps>`
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
  font-weight: ${({ fontWeight = "500" }) => fontWeight};
  font-size: ${({ fontSize = "14px" }) => fontSize};
  line-height: ${({ lineHeight = "20" }) => lineHeight};
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

const AvatarWrapper = styled.div`
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

// Update the ListItem component
const ListItem = styled.div<StyleProps>`
  padding: ${({ theme }) =>
    `${theme?.spacing?.small || defaultTheme.spacing.small} ${
      theme?.spacing?.small || defaultTheme.spacing.small
    }`};
  margin: 0 8px; // Keep the margin
  width: calc(100% - 16px) !important;
  left: 8px;
  color: ${({ theme }) =>
    theme?.colors?.text?.primary || defaultTheme.colors.text.primary};
  font-size: ${({ fontSize = "14px" }) => fontSize};
  font-weight: ${({ fontWeight = 500 }) => fontWeight};
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

const SearchableList: React.FC<SearchableListProps> = React.memo(
  ({
    data,
    renderItem,
    renderSectionHeader,
    onSearch,
    containerStyles = {},
    searchInputStyles = {},
    sectionHeaderStyles = {},
    listItemStyles = {},
    listHeight = 400,
    containerClassName,
    searchInputClassName,
    sectionHeaderClassName,
    listItemClassName,
    primaryTextStyle,
    secondaryTextStyle,
    primaryTextClassName,
    secondaryTextClassName,
  }) => {
    const [searchValue, setSearchValue] = useState("");
    const [collapsedSections, setCollapsedSections] = useState<
      Record<string | number, boolean>
    >({});

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) onSearch(value);
      },
      [onSearch]
    );

    const flattenedData = useMemo(() => {
      return data.reduce<
        Array<
          {
            type: "header" | "item";
            sectionId?: string | number;
            title?: string;
          } & Partial<Item>
        >
      >((acc, section) => {
        const filteredItems = section.items.filter((item) =>
          item.primaryText.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filteredItems.length) {
          acc.push({
            type: "header",
            sectionId: section.id,
            title: section.title,
          });
          if (!collapsedSections[section.id]) {
            filteredItems.forEach((item) =>
              acc.push({ type: "item", ...item })
            );
          }
        }
        return acc;
      }, []);
    }, [data, searchValue, collapsedSections]);

    const getItemPosition = (index: number, data: any[]) => {
      let position = 0;
      for (let i = 0; i < index; i++) {
        const item = data[i];
        if (item.type === "header") {
          position += 37;
        } else {
          position += 52;
          // Add spacing after header
          if (i > 0 && data[i - 1].type === "header") {
            position += 8;
          }
          // Add spacing before header
          if (i < data.length - 1 && data[i + 1].type === "header") {
            position += 8;
          }
        }
      }

      // Add spacing for current item if after header
      if (
        index > 0 &&
        data[index - 1].type === "header" &&
        data[index].type !== "header"
      ) {
        position += 8;
      }

      return position;
    };

    const getItemSize = (index: number): number => {
      const item = flattenedData[index];
      // Always return 37 for headers
      if (item.type === "header") {
        return 37;
      }

      // For non-header items
      const baseHeight = 52;
      const topPadding =
        index > 0 && flattenedData[index - 1].type === "header" ? 8 : 0;
      const bottomPadding =
        index < flattenedData.length - 1 &&
        flattenedData[index + 1].type === "header"
          ? 8
          : 0;

      return baseHeight + topPadding + bottomPadding;
    };

    const toggleSection = (sectionId: string | number): void => {
      setCollapsedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    };

    // Add a default render function
    const DefaultItemRender = ({
      avatarUrl,
      primaryText,
      secondaryText,
      primaryTextStyle,
      secondaryTextStyle,
      primaryTextClassName,
      secondaryTextClassName,
    }: {
      avatarUrl?: string;
      primaryText: string;
      secondaryText?: string;
      primaryTextStyle?: React.CSSProperties;
      secondaryTextStyle?: React.CSSProperties;
      primaryTextClassName?: string;
      secondaryTextClassName?: string;
    }) => (
      <>
        <AvatarWrapper>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={primaryText}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement?.appendChild(DefaultAvatar());
              }}
            />
          ) : (
            <DefaultAvatar />
          )}
        </AvatarWrapper>
        <TextDisplay
          primaryText={primaryText}
          secondaryText={secondaryText}
          primaryTextStyle={primaryTextStyle}
          secondaryTextStyle={secondaryTextStyle}
          primaryTextClassName={primaryTextClassName}
          secondaryTextClassName={secondaryTextClassName}
        />
      </>
    );

    const listKey = useMemo(
      () =>
        `${Object.entries(collapsedSections)
          .map(([k, v]) => `${k}-${v}`)
          .join("_")}_${searchValue}`,
      [collapsedSections, searchValue]
    );

    return (
      <Container {...containerStyles} className={containerClassName}>
        <SearchWrapper>
          <SearchInput
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search"
            {...searchInputStyles}
            className={searchInputClassName}
          />
          <SearchIcon />
        </SearchWrapper>

        <List
          key={listKey}
          height={listHeight}
          itemCount={flattenedData.length}
          itemSize={getItemSize}
          width="100%"
          className="searchable-list-container"
        >
          {({ index, style }) => {
            const item = flattenedData[index];

            if (item.type === "header") {
              return (
                <SectionHeader
                  {...sectionHeaderStyles}
                  style={style}
                  onClick={() => toggleSection(item.sectionId!)}
                  isCollapsed={collapsedSections[item.sectionId!]}
                  className={sectionHeaderClassName}
                >
                  <span>
                    {renderSectionHeader
                      ? renderSectionHeader(item as any)
                      : item.title}
                  </span>
                  {collapsedSections[item.sectionId!] ? (
                    <ChevronRight />
                  ) : (
                    <ChevronDown />
                  )}
                </SectionHeader>
              );
            }

            return (
              <ListItem
                style={{
                  ...style,
                  height: 52,
                  top: getItemPosition(index, flattenedData),
                }}
                {...listItemStyles}
                className={listItemClassName}
              >
                {renderItem ? (
                  renderItem(item as Item, (itemProps) => (
                    <DefaultItemRender
                      {...itemProps}
                      primaryTextStyle={primaryTextStyle}
                      secondaryTextStyle={secondaryTextStyle}
                      primaryTextClassName={primaryTextClassName}
                      secondaryTextClassName={secondaryTextClassName}
                    />
                  ))
                ) : (
                  <DefaultItemRender
                    {...(item as ItemContent)}
                    primaryTextStyle={primaryTextStyle}
                    secondaryTextStyle={secondaryTextStyle}
                    primaryTextClassName={primaryTextClassName}
                    secondaryTextClassName={secondaryTextClassName}
                  />
                )}
              </ListItem>
            );
          }}
        </List>
      </Container>
    );
  }
);

export default SearchableList;
