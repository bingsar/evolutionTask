import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/theme-context';
import { useThemePalette } from '@/hooks/use-theme-palette';

type Option = {
  value: 'light' | 'dark' | 'system';
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const themeOptions: Option[] = [
  { value: 'light', title: 'Светлая', description: 'Классический светлый интерфейс', icon: 'sunny' },
  { value: 'dark', title: 'Темная', description: 'Минимум бликов и максимум контраста', icon: 'moon' },
  { value: 'system', title: 'Как в системе', description: 'Следовать настройке устройства', icon: 'phone-portrait' },
];

export default function SettingsScreen() {
  const { preference, theme, setPreference } = useThemeContext();
  const palette = useThemePalette();
  const insets = useSafeAreaInsets();

  const subtitle = useMemo(() => {
    if (preference === 'system') {
      return `Следуем системе: сейчас ${theme === 'dark' ? 'темная' : 'светлая'} тема`;
    }

    return preference === 'dark' ? 'Темная тема включена' : 'Светлая тема включена';
  }, [preference, theme]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <ThemedText type="title" style={[styles.title, { color: palette.textPrimary }]}>
              Настройки
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: palette.textSecondary }]}>{subtitle}</ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: palette.cardBg, borderColor: palette.cardBorder }]}>
            <ThemedText type="subtitle" style={[styles.cardTitle, { color: palette.textPrimary }]}>
              Тема приложения
            </ThemedText>
            <ThemedText style={[styles.cardDescription, { color: palette.textSecondary }]}>
              Выберите подходящий вариант или оставьте системную настройку.
            </ThemedText>

            <View style={styles.options}>
              {themeOptions.map((option) => {
                const isActive = preference === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setPreference(option.value)}
                    style={({ pressed }) => [
                      styles.option,
                      {
                        backgroundColor: isActive ? palette.option.activeBg : palette.option.bg,
                        borderColor: isActive ? palette.option.activeBorder : palette.option.border,
                      },
                      pressed ? styles.optionPressed : undefined,
                    ]}>
                    <View style={styles.optionLeft}>
                      <View
                        style={[
                          styles.iconWrap,
                          { backgroundColor: palette.option.iconBg },
                          isActive ? { backgroundColor: palette.option.activeIconBg } : undefined,
                        ]}>
                        <Ionicons
                          name={option.icon}
                          size={18}
                          color={isActive ? palette.option.activeText : palette.option.text}
                        />
                      </View>
                      <View style={styles.optionText}>
                        <ThemedText
                          type="defaultSemiBold"
                          style={[
                            styles.optionTitle,
                            { color: isActive ? palette.option.activeText : palette.option.text },
                          ]}>
                          {option.title}
                        </ThemedText>
                        <ThemedText
                          style={[
                            styles.optionDescription,
                            { color: isActive ? palette.option.activeText : palette.option.description },
                          ]}>
                          {option.description}
                        </ThemedText>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#e2e8f0',
    marginBottom: 22,
  },
  subtitle: {
    color: '#94a3b8',
  },
  card: {
    borderRadius: 18,
    padding: 16,
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardTitle: {
    color: '#e2e8f0',
  },
  cardDescription: {
    color: '#94a3b8',
  },
  options: {
    gap: 10,
  },
  option: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionPressed: {
    opacity: 0.9,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionText: {
    flex: 1,
    flexShrink: 1,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937',
  },
  optionTitle: {
    color: '#e2e8f0',
  },
  optionDescription: {
    color: '#94a3b8',
  },
});
