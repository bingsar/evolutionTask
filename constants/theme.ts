/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native'

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#475569',
    background: '#ffffff',
    cardBg: '#f1f5f9',
    cardBorder: '#e2e8f0',
    cardDone: '#ecfdf3',
    cardActive: '#e8f1ff',
    cardActiveBorder: '#bfdbfe',
    cardLocked: '#f8fafc',
    badgeBg: '#eef2ff',
    subtitle: '#64748b',
    optionBg: '#ffffff',
    optionBorder: '#e2e8f0',
    optionText: '#11181C',
    optionDescription: '#475569',
    optionIconBg: '#e2e8f0',
    optionActiveBg: '#facc15',
    optionActiveBorder: '#eab308',
    optionActiveText: '#0f172a',
    optionActiveIconBg: '#f1f5f9',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#cbd5e1',
    background: '#151718',
    cardBg: '#12283c',
    cardBorder: 'rgba(255,255,255,0.06)',
    cardDone: '#0f2a30',
    cardActive: '#0f172a',
    cardActiveBorder: 'rgba(37, 99, 235, 0.4)',
    cardLocked: '#0d1521',
    badgeBg: 'rgba(255,255,255,0.04)',
    subtitle: '#94a3b8',
    optionBg: 'rgba(255,255,255,0.03)',
    optionBorder: 'rgba(255,255,255,0.08)',
    optionText: '#ECEDEE',
    optionDescription: '#cbd5e1',
    optionIconBg: '#1f2937',
    optionActiveBg: '#fbbf24',
    optionActiveBorder: '#f59e0b',
    optionActiveText: '#0b1b2b',
    optionActiveIconBg: '#e2e8f0',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
} as const

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
