import './App.css';
import SearchableList from '@/components/SearchableList/SearchableList';
import { sampleData } from '@/components/SearchableList/sampleData';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@/hooks/useTheme';

import { Item } from './components/SearchableList/SearchableList.types';

const App: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (key: string) => {
    console.log('Searching for:', key);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <button onClick={toggleTheme}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>

        <div style={{ width: '400px' }}>
          <SearchableList
            data={sampleData}
            onSearch={handleSearch}
            renderItem={(item: Item) => {
              console.log('item@@@', item);
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: '10px',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                    }}
                  >
                    <img
                      src={item.avatarUrl}
                      alt=""
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                      }}
                    />
                  </span>
                  <span>{item.primaryText}</span>
                </div>
              );
            }}
            renderSectionHeader={(section: any) => {
              console.log('section@@@', section);
              return <div>{section.title}</div>;
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
