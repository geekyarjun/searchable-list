import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchableList from "./SearchableList";
import { sampleData } from "../../../sampleData"; // Adjust the import path as necessary

export default {
  title: "Components/SearchableList",
  component: SearchableList,
} as ComponentMeta<typeof SearchableList>;

const Template: ComponentStory<typeof SearchableList> = (args) => (
  <div style={{ width: "400px" }}>
    <SearchableList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  onSearch: (value) => console.log(value),
  listHeight: 400,
  primaryTextStyle: { fontWeight: "bold" },
  secondaryTextStyle: { color: "gray" },
  containerStyles: { "max-width": "100%" },
  //   searchInputStyles: { padding: "14px 16px" },
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  data: sampleData,
  onSearch: (value) => console.log(value),
  listHeight: 400,
  primaryTextStyle: { fontWeight: "bold" },
  secondaryTextStyle: { color: "gray" },
  containerStyles: { maxWidth: "600px" },
  searchInputStyles: { padding: "14px 16px" },
};

// Add a story to demonstrate the search functionality
export const SearchFunctionality = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div style={{ maxWidth: "600px" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ padding: "14px 16px", width: "100%", marginBottom: "16px" }}
      />
      <SearchableList
        data={sampleData}
        onSearch={setSearchValue}
        listHeight={400}
        primaryTextStyle={{ fontWeight: "bold" }}
        secondaryTextStyle={{ color: "gray" }}
        containerStyles={{ maxWidth: "600px" }}
      />
    </div>
  );
};

export const CollapsibleSections = () => {
  return (
    <div style={{ maxWidth: "600px" }}>
      <SearchableList
        data={sampleData}
        onSearch={() => {}}
        listHeight={400}
        primaryTextStyle={{ fontWeight: "bold" }}
        secondaryTextStyle={{ color: "gray" }}
        containerStyles={{ maxWidth: "600px" }}
      />
    </div>
  );
};
