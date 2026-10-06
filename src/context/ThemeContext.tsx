import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'gu';
  setLanguage: (lang: 'en' | 'gu') => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
  language: 'gu',
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'gu'>('gu');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'gu' : 'en'));

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#4f46e5', // Deep Indigo
          light: '#6366f1',
          dark: '#3730a3',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#8b5cf6',
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        background: {
          default: mode === 'dark' ? '#0b1329' : '#f8fafc',
          paper: mode === 'dark' ? '#0f172a' : '#ffffff',
        },
        text: {
          primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
          secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
        },
        divider: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
      },
      typography: {
        fontFamily: '"Plus Jakarta Sans", Inter, Mukta, "Hind Vadodara", "Noto Sans Gujarati", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 13,
        h4: {
          fontSize: '1.35rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        },
        h5: {
          fontSize: '1.2rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        },
        h6: {
          fontSize: '1.02rem',
          fontWeight: 800,
          letterSpacing: '-0.01em',
        },
        subtitle1: {
          fontSize: '0.9rem',
          fontWeight: 700,
        },
        subtitle2: {
          fontSize: '0.82rem',
          fontWeight: 700,
        },
        body1: {
          fontSize: '0.85rem',
        },
        body2: {
          fontSize: '0.78rem',
        },
        caption: {
          fontSize: '0.7rem',
        },
        button: {
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'none',
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '10px',
              fontWeight: 700,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            },
            containedPrimary: {
              backgroundColor: '#4f46e5',
              '&:hover': {
                backgroundColor: '#4338ca',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '14px',
              border: '1px solid',
              borderColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
              boxShadow: mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.03)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '14px',
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 700,
              borderRadius: '8px',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: mode === 'dark' ? '#94a3b8' : '#64748b',
              backgroundColor: mode === 'dark' ? '#0f172a' : '#f8fafc',
            },
            body: {
              fontSize: '0.85rem',
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, language, setLanguage, toggleLanguage }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
