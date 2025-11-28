import { useMemo } from 'react';

import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/context/theme-context';

type Palette = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  cardBorder: string;
  cardDone: string;
  cardActive: string;
  cardActiveBorder: string;
  cardLocked: string;
  badgeBg: string;
  subtitle: string;
  option: {
    bg: string;
    border: string;
    text: string;
    description: string;
    iconBg: string;
    activeBg: string;
    activeBorder: string;
    activeText: string;
    activeIconBg: string;
  };
};

export function useThemePalette(): Palette {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  return useMemo(
    () => ({
      background: palette.background,
      textPrimary: palette.text,
      textSecondary: palette.textSecondary,
      cardBg: palette.cardBg,
      cardBorder: palette.cardBorder,
      cardDone: palette.cardDone,
      cardActive: palette.cardActive,
      cardActiveBorder: palette.cardActiveBorder,
      cardLocked: palette.cardLocked,
      badgeBg: palette.badgeBg,
      subtitle: palette.subtitle,
      option: {
        bg: palette.optionBg,
        border: palette.optionBorder,
        text: palette.optionText,
        description: palette.optionDescription,
        iconBg: palette.optionIconBg,
        activeBg: palette.optionActiveBg,
        activeBorder: palette.optionActiveBorder,
        activeText: palette.optionActiveText,
        activeIconBg: palette.optionActiveIconBg,
      },
    }),
    [palette]
  );
}
