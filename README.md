
<img width="403" alt="Screenshot 2025-02-08 at 2 38 00 PM" src="https://github.com/user-attachments/assets/09e8a991-9652-42af-a038-f5e5b3215973" />


https://github.com/user-attachments/assets/d2ffb566-8053-4256-89fa-8333fca180c1


# SearchableList Component

The `SearchableList` component is a flexible and interactive list component that allows users to search through items, expand/collapse sections, and customize styles. It is built using React and styled-components, making it easy to integrate into any React application.

## Features

- **Search Functionality**: Users can search for items in the list, filtering results in real-time.
- **Collapsible Sections**: Sections can be expanded or collapsed to show or hide items.
- **Customizable Styles**: Easily customize the appearance of the list, including text styles and container styles.
- **Responsive Design**: The component is designed to be responsive and works well on various screen sizes.

## Installation

To use the `SearchableList` component, ensure you have the necessary dependencies installed:

```bash
npm install searchable-list
```

## Usage

To use the `SearchableList` component, import it into your React component and provide the required props.

### Example

```tsx
import React from 'react';
import SearchableList from './components/SearchableList/SearchableList';
import { sampleData } from '../sampleData'; // Adjust the import path as necessary

const App = () => {
  return (
    <div style={{ width: '400px' }}>
      <SearchableList
        data={sampleData}
        onSearch={(value) => console.log(value)}
        listHeight={400}
        primaryTextStyle={{ fontWeight: 'bold' }}
        secondaryTextStyle={{ color: 'gray' }}
        containerStyles={{ maxWidth: '600px' }}
        searchInputStyles={{ padding: '14px 16px' }}
      />
    </div>
  );
};
export default App;
```


## Props

| Prop                     | Type                          | Description                                                                                     |
|--------------------------|-------------------------------|-------------------------------------------------------------------------------------------------|
| `data`                   | `Section[]`                  | An array of sections containing items to display.                                             |
| `renderItem`             | `(item: Item, defaultRender: (item: ItemContent) => React.ReactNode) => React.ReactNode` | A function to render each item in the list.                                                   |
| `renderSectionHeader`    | `(section: { title: string; sectionId: string | number; }) => React.ReactNode` | A function to render the section header.                                                      |
| `onSearch`               | `(value: string) => void`    | Callback function triggered when the search input changes.                                    |
| `containerStyles`        | `Partial<StyleProps>`        | Styles to apply to the container of the list.                                                 |
| `searchInputStyles`      | `Partial<StyleProps>`        | Styles to apply to the search input.                                                           |
| `sectionHeaderStyles`    | `Partial<StyleProps>`        | Styles to apply to the section headers.                                                        |
| `listItemStyles`         | `Partial<StyleProps>`        | Styles to apply to the list items.                                                             |
| `listHeight`             | `number`                     | The height of the list.                                                                         |
| `primaryTextStyle`       | `React.CSSProperties`        | Styles for the primary text in the list items.                                                |
| `secondaryTextStyle`     | `React.CSSProperties`        | Styles for the secondary text in the list items.                                              |
| `primaryTextClassName`   | `string`                     | Class name for the primary text in the list items.                                            |
| `secondaryTextClassName` | `string`                     | Class name for the secondary text in the list items.                                          |

## Customization

You can customize the appearance of the `SearchableList` component by passing in styles through the `containerStyles`, `searchInputStyles`, `sectionHeaderStyles`, and `listItemStyles` props. You can also customize the text styles using `primaryTextStyle` and `secondaryTextStyle`.

### Example of Customization

```tsx
<SearchableList
  data={sampleData}
  onSearch={(value) => console.log(value)}
  listHeight={400}
  primaryTextStyle={{ fontWeight: 'bold', color: 'blue' }}
  secondaryTextStyle={{ color: 'gray' }}
  containerStyles={{ maxWidth: '600px', backgroundColor: '#f9f9f9' }}
  searchInputStyles={{ padding: '14px 16px', border: '1px solid #ccc' }}
/>
```

## Conclusion

The `SearchableList` component is a powerful tool for displaying and searching through lists of items in a user-friendly manner. With its customizable styles and interactive features, it can be easily integrated into any React application.

For further questions or contributions, feel free to reach out or submit a pull request!
