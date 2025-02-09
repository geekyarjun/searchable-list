import React, { useCallback, useMemo, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import DefaultAvatar from '../DefaultAvatar';
import { ChevronDown } from '../icons/ChevronDown';
import { ChevronRight } from '../icons/ChevronRight';
import { SearchIcon } from '../icons/SearchIcon';
import TextDisplay from '../TextDisplay';
import {
  AvatarWrapper,
  Container,
  ListItem,
  SearchInput,
  SearchWrapper,
  SectionHeader,
} from './SearchableList.styles';
import { Item, ItemContent, SearchableListProps } from './SearchableList.types';

// Constants for layout dimensions
const HEADER_HEIGHT = 37; // Height of the header
const ITEM_HEIGHT = 52; // Height of the list item
const SPACING = 8; // Spacing between items
const ZERO = 0; // Constant for zero
const ONE = 1; // Constant for one

// Component to render individual items in the list
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
}) => {
  const [showDefaultAvatar, setShowDefaultAvatar] = useState(false);

  return (
    <>
      <AvatarWrapper>
        {avatarUrl && !showDefaultAvatar ? (
          <img
            src={avatarUrl}
            alt={primaryText}
            onError={() => setShowDefaultAvatar(true)} // Show default avatar on error
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
};

// Main SearchableList component
const SearchableList: React.FC<SearchableListProps> = React.memo(
  ({
    data,
    renderItem,
    renderSectionHeader,
    onSearch,
    styles: {
      containerStyles = {},
      searchInputStyles = {},
      sectionHeaderStyles = {},
      listItemStyles = {},
      primaryTextStyle = {},
      secondaryTextStyle = {},
    } = {},
    classNames: {
      listItemClassName = '',
      containerClassName = '',
      primaryTextClassName = '',
      searchInputClassName = '',
      sectionHeaderClassName = '',
      secondaryTextClassName = '',
    } = {},
    listHeight = 400,
  }) => {
    const [searchValue, setSearchValue] = useState(''); // State for search input
    const [collapsedSections, setCollapsedSections] = useState<
      Record<string | number, boolean>
    >({}); // State to track collapsed sections

    // Handle search input changes
    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) onSearch(value); // Call the onSearch callback if provided
      },
      [onSearch],
    );

    // Flatten the data for rendering
    const flattenedData = useMemo(() => {
      return data.reduce<
        Array<
          {
            type: 'header' | 'item';
            sectionId?: string | number;
            title?: string;
          } & Partial<Item>
        >
      >((acc, section) => {
        const filteredItems = section.items.filter((item) =>
          item.primaryText.toLowerCase().includes(searchValue.toLowerCase()),
        );

        if (filteredItems.length) {
          acc.push({
            type: 'header',
            sectionId: section.id,
            title: section.title,
          });
          if (!collapsedSections[section.id]) {
            filteredItems.forEach((item) =>
              acc.push({ type: 'item', ...item }),
            );
          }
        }
        return acc;
      }, []);
    }, [data, searchValue, collapsedSections]);

    // Calculate the position of each item in the list
    const getItemPosition = (index: number, data: Item[]) => {
      let position = 0;
      for (let i = 0; i < index; i++) {
        const item = data[i];
        if (item.type === 'header') {
          position += HEADER_HEIGHT; // Add header height
        } else {
          position += ITEM_HEIGHT; // Add item height
          // Add spacing after header
          if (i > ZERO && data[i - ONE].type === 'header') {
            position += SPACING; // Add spacing if previous item is a header
          }
          // Add spacing before header
          if (i < data.length - ONE && data[i + ONE].type === 'header') {
            position += SPACING; // Add spacing if next item is a header
          }
        }
      }

      // Add spacing for current item if after header
      if (
        index > ZERO &&
        data[index - ONE].type === 'header' &&
        data[index].type !== 'header'
      ) {
        position += SPACING; // Add spacing if current item follows a header
      }

      return position; // Return the calculated position
    };

    // Get the size of each item based on its type
    const getItemSize = (index: number): number => {
      const item = flattenedData[index];
      if (item.type === 'header') {
        return HEADER_HEIGHT; // Return header height
      }

      const topPadding =
        index > ZERO && flattenedData[index - ONE].type === 'header'
          ? SPACING
          : ZERO; // Add top padding if previous item is a header
      const bottomPadding =
        index < flattenedData.length - ONE &&
        flattenedData[index + ONE].type === 'header'
          ? SPACING
          : ZERO; // Add bottom padding if next item is a header

      return ITEM_HEIGHT + topPadding + bottomPadding; // Return total item size
    };

    // Toggle the collapsed state of a section
    const toggleSection = (sectionId: string | number): void => {
      setCollapsedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId], // Toggle the collapsed state
      }));
    };

    // Generate a unique key for the list based on collapsed sections and search value
    const listKey = useMemo(
      () =>
        `${Object.entries(collapsedSections)
          .map(([k, v]) => `${k}-${v}`)
          .join('_')}_${searchValue}`,
      [collapsedSections, searchValue],
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

            if (item.type === 'header') {
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
                  height: ITEM_HEIGHT,
                  top: getItemPosition(index, flattenedData as Item[]),
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
  },
);

SearchableList.displayName = 'SearchableList';

export default SearchableList;
