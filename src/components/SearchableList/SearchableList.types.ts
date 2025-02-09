import { KebabCaseCSS } from '@/types';

// Styled props interface
export interface StyledProps extends KebabCaseCSS {
  isCollapsed?: boolean;
  focusBorderColor?: string;
  focusBoxShadow?: string;
  placeholderColor?: string;
  hoverBackground?: string;
}

export interface ItemContent {
  avatarUrl?: string;
  primaryText: string;
  secondaryText?: string;
}

export interface Item extends ItemContent {
  id: string | number;
  [key: string]: any;
}

export interface Section {
  id: string | number;
  title: string;
  items: Item[];
}

interface Styles {
  containerStyles: Partial<StyledProps>;
  searchInputStyles: Partial<StyledProps>;
  sectionHeaderStyles: Partial<StyledProps>;
  listItemStyles: Partial<StyledProps>;
  primaryTextStyle?: React.CSSProperties;
  secondaryTextStyle?: React.CSSProperties;
}

interface ClassNames {
  containerClassName: string;
  searchInputClassName: string;
  sectionHeaderClassName: string;
  listItemClassName: string;
  primaryTextClassName: string;
  secondaryTextClassName: string;
}

export interface SearchableListProps {
  data: Section[];
  renderItem?: (
    item: Item,
    defaultRender: (item: ItemContent) => React.ReactNode,
  ) => React.ReactNode;
  renderSectionHeader?: (section: {
    title: string;
    sectionId: string | number;
  }) => React.ReactNode;
  /** Button label text */
  onSearch?: (value: string) => void;
  listHeight?: number;
  styles?: Partial<Styles>;
  classNames?: Partial<ClassNames>;
}
