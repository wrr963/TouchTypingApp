"use client";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "lime",
  defaultRadius: "md",
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  fontFamilyMonospace:
    "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
  headings: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: "700",
  },
  colors: {
    lime: [
      "#f5ffe5",
      "#e7ffbd",
      "#d7ff92",
      "#c7ff69",
      "#b8ff47",
      "#afff31",
      "#a9ff24",
      "#92e313",
      "#7fc900",
      "#68ad00",
    ],
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
