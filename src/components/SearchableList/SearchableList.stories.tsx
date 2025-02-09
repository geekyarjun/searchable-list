import type { Meta, StoryObj } from '@storybook/react';

import SearchableList from './SearchableList';
import { sampleData } from './sampleData'; // Adjust the import path as necessary

const meta: Meta<typeof SearchableList> = {
  title: 'Components/SearchableList',
  component: SearchableList,
  args: {
    styles: {
      containerStyles: {},
      searchInputStyles: {},
      sectionHeaderStyles: {},
      listItemStyles: {},
    },
  },
  decorators: [
    /* ... */
  ],
  parameters: {
    /* ... */
  },
};

type Story = StoryObj<typeof SearchableList>;

export const Basic: Story = {
  args: {
    data: sampleData,
  },
};

export const WithProps: Story = {
  argTypes: {
    onSearch: {
      description: 'Search callback',
    },
    listHeight: {
      description: 'Height of the list item container',
    },
    classNames: {
      description:
        'Give class name to parts of the component for more customized styling',
    },
  },
  args: {
    listHeight: 400,
    data: sampleData,
    onSearch: (search: string) => {
      console.log(search);
    },
    styles: {
      containerStyles: {
        'max-width': '600px',
        background: '#f0f0f0', // Custom background color
        border: '1px solid #ccc', // Custom border
      },
      searchInputStyles: {
        border: '2px solid #007AFF', // Custom border for search input
        'border-radius': '4px', // Custom border radius
      },
      sectionHeaderStyles: {
        background: '#e0e0e0', // Custom background for section headers
        color: '#333', // Custom text color for section headers
      },
      listItemStyles: {
        padding: '12px', // Custom padding for list items
        margin: '4px 0', // Custom margin for list items
      },
    },
    classNames: {
      listItemClassName: '',
      containerClassName: '',
      primaryTextClassName: '',
      searchInputClassName: '',
      sectionHeaderClassName: '',
      secondaryTextClassName: '',
    },
  },
};

export const CustomRenderFunctions: Story = {
  argTypes: {
    onSearch: {
      description: 'Search callback',
    },
    renderItem: {
      description: 'Custom item render function',
    },
    renderSectionHeader: {
      description: 'Custom section header render function',
    },
  },
  args: {
    data: sampleData,
    onSearch: (search: string) => {
      console.log(search);
    },
    renderItem: (item: any) => {
      return <div>{item.primaryText}</div>;
    },
    renderSectionHeader: (section: any) => {
      return <div>{section.title}</div>;
    },
  },
};

export default meta;
