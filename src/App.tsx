import "./App.css";
import SearchableList from "./components/SearchableList/SearchableList";
import { sampleData } from "../sampleData";
import { renderCustomSectionHeader, renderCustomItem } from "./CustomRenderers";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import { Theme } from "./theme/theme";

// Add theme type support for styled-components
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const App: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <button onClick={toggleTheme}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>

        <div style={{ width: "400px" }}>
          <SearchableList
            stickyHeaders
            data={sampleData}
            // onSearch={handleSearch}
            listHeight={400}
            // renderSectionHeader={renderCustomSectionHeader}
            // renderItem={renderCustomItem}
            containerStyles={{
              "max-width": "100%",
            }}
            searchInputStyles={{
              padding: "14px 16px 14px 44px",
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
