export interface Theme {
  colors: {
    primary: string;
    primary200: string;
    background: {
      main: string;
      light: string;
      hover: string;
      secondaryHover: string;
      secondaryActive: string;
      element: string;
    };
    border: string;
    borderMedium: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
      placeholder: string;
    };
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    primary200: 'rgba(244, 241, 253, 1)',
    background: {
      main: '#ffffff',
      light: 'rgba(0, 0, 0, 0.02)',
      hover: 'rgba(0, 0, 0, 0.04)',
      secondaryHover: 'rgba(242, 245, 247, 1)',
      secondaryActive: 'rgba(230, 236, 239, 1)',
      element: 'rgba(255, 255, 255, 1)',
    },
    border: 'rgba(0, 0, 0, 0.1)',
    borderMedium: 'rgba(228, 229, 232, 1)',
    text: {
      primary: 'rgba(32, 55, 75, 1)',
      secondary: 'rgba(0, 0, 0, 0.4)',
      light: 'rgba(90, 109, 128, 1)',
      placeholder: 'rgba(142, 154, 165, 1)',
    },
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: {
    small: '6px',
    medium: '8px',
    large: '12px',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#0A84FF',
    primary200: 'rgba(244, 241, 253, 1)',
    background: {
      main: '#1C1C1E',
      light: 'rgba(255, 255, 255, 0.05)',
      hover: 'rgba(255, 255, 255, 0.1)',
      secondaryHover: 'rgba(242, 245, 247, 1)',
      secondaryActive: 'rgba(230, 236, 239, 1)',
      element: 'rgba(255, 255, 255, 1)',
    },
    border: 'rgba(255, 255, 255, 0.1)',
    borderMedium: 'rgba(228, 229, 232, 1)',
    text: {
      primary: 'rgba(32, 55, 75, 1)',
      secondary: 'rgba(255, 255, 255, 0.6)',
      light: 'rgba(90, 109, 128, 1)',
      placeholder: 'rgba(142, 154, 165, 1)',
    },
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: {
    small: '6px',
    medium: '8px',
    large: '12px',
  },
};
