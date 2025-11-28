import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

type ThemePreference = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: 'light' | 'dark'
  preference: ThemePreference
  setPreference: (value: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useRNColorScheme() ?? 'light'
  const [preference, setPreference] = useState<ThemePreference>('system')

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      theme: preference === 'system' ? systemTheme : preference,
      setPreference,
    }),
    [preference, systemTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }

  return ctx
}
