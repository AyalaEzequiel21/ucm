
export const colorTokens = {
    grey: {
        100: "#f0f0f3",
        300: "#b3b6c2",
        500: "#6b6d74",
        700: "#242427"
      },
      primary: {
        100: "#3D4B59",
        300: "#2c3e50",
        500: "#29323C",
        700: "#262D34"
      },
      secondary: {
        100: "#5686A6",
        300: "#246A99",
        500: "#2E536B",
        700: "#2E414E"
      },
      tertiary: {
        100: "#CDC2B0",
        300: "#BFA67B",
        500: "#AD8C54",
        700: "#806E51"
      },    
      background: {
        light: "#ecf0f1",
        main: "#2d2d34",
        dark: "#1f2026"
      }
}

// MUI THEME SETTINGS
export const themeSettings = {
    palette: {
        primary: {
            ...colorTokens.primary,
            light: colorTokens.primary[100],
            main: colorTokens.primary[300],
            dark: colorTokens.primary[500],
        },

        secondary: {
            ...colorTokens.secondary,
            light: colorTokens.secondary[100],
            main: colorTokens.secondary[300],
            dark: colorTokens.secondary[500],
        },

        tertiary: {
            ...colorTokens.tertiary,
            light: colorTokens.tertiary[100],
            main: colorTokens.tertiary[300],
            dark: colorTokens.tertiary[500],
        },

        grey: {
            ...colorTokens.grey,
            light: colorTokens.grey[100],
            main: colorTokens.grey[300],
            dark: colorTokens.grey[700],
        }, 
        background: {
            default: colorTokens.background.main,
            light: colorTokens.background.light,
          }
    },
    typography: {
        fontFamily: ["JetBrains Mono", "monospace"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 32,
        },
        h2: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 24,
        },
        h3: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 20,
          fontWeight: 800,
        },
        h4: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 14,
          fontWeight: 600,
        },
        h5: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 12,
          fontWeight: 400,
        },
        h6: {
          fontFamily: ["JetBrains Mono", "monospace"].join(","),
          fontSize: 10,
        },
      },
}