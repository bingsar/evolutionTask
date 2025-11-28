import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo } from 'react'
import { Alert, ColorValue, FlatList, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useThemePalette } from '@/hooks/use-theme-palette'

type LessonStatus = 'done' | 'active' | 'locked'

type Lesson = {
  id: number
  title: string
  status: LessonStatus
}

const lessons: Lesson[] = [
  { id: 1, title: 'Welcome Journey', status: 'done' },
  { id: 2, title: 'Переключение на себя', status: 'active' },
  { id: 3, title: 'Источник вдохновения', status: 'locked' },
  { id: 4, title: 'Пространство идей', status: 'locked' },
  { id: 5, title: 'Финальный тест', status: 'locked' },
]

const statusMeta: Record<
  LessonStatus,
  { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  done: { label: 'Пройден', color: '#16a34a', icon: 'checkmark-circle' },
  active: { label: 'Готов к старту', color: '#2563eb', icon: 'play-circle' },
  locked: { label: 'Закрыт', color: '#9ca3af', icon: 'lock-closed' },
}

export default function HomeScreen() {
  const palette = useThemePalette()
  const insets = useSafeAreaInsets()
  const fadeColors = useMemo<[ColorValue, ColorValue]>(() => {
    const bg = palette.background

    if (bg.startsWith('#')) {
      let hex = bg.slice(1)

      if (hex.length === 3) {
        hex = hex
          .split('')
          .map((c) => c + c)
          .join('')
      }

      if (hex.length === 6) {
        return [`#${hex}`, `#${hex}00`]
      }
    }

    return [bg, 'transparent']
  }, [palette.background])

  const handlePress = (lesson: Lesson) => {
    if (lesson.status === 'locked') {
      Alert.alert('Урок закрыт', 'Пройдите текущий модуль, чтобы открыть следующий.')
      return
    }

    if (lesson.status === 'active') {
      console.log('Start lesson')
      return
    }

    console.log('Lesson already completed')
  }

  const renderLesson = ({ item }: { item: Lesson }) => {
    const meta = statusMeta[item.status]
    const isLocked = item.status === 'locked'
    let touchStartY = 0

    return (
      <Pressable
        onPressIn={(e) => {
          touchStartY = e.nativeEvent.pageY
        }}
        onPressOut={(e) => {
          const delta = Math.abs(e.nativeEvent.pageY - touchStartY)
          if (delta < 8) {
            handlePress(item)
          }
        }}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: palette.cardBg,
            borderColor: palette.cardBorder,
          },
          item.status === 'done' ? { backgroundColor: palette.cardDone } : undefined,
          item.status === 'active'
            ? { backgroundColor: palette.cardActive, borderColor: palette.cardActiveBorder }
            : undefined,
          item.status === 'locked' ? { backgroundColor: palette.cardLocked } : undefined,
          pressed && !isLocked ? styles.cardPressed : undefined,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.statusDot, { backgroundColor: meta.color }]} />
          <ThemedText type="subtitle" style={[styles.cardTitle, { color: palette.textPrimary }]}>
            {item.title}
          </ThemedText>
        </View>
        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: palette.badgeBg }]}>
            <Ionicons name={meta.icon} size={18} color={meta.color} />
            <ThemedText style={[styles.badgeText, { color: meta.color }]}>{meta.label}</ThemedText>
          </View>
          {item.status === 'active' ? (
            <View style={styles.cta}>
              <Ionicons name="play" size={14} color="#0b1b2b" />
              <ThemedText style={styles.ctaText}>Начать</ThemedText>
            </View>
          ) : null}
          {item.status === 'locked' ? (
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          ) : null}
        </View>
      </Pressable>
    )
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: palette.background }]}>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }} edges={['top', 'left', 'right']}>
        <ThemedView style={styles.wrapper}>
          <View style={styles.header}>
            <ThemedText type="title" style={[styles.title, { color: palette.textPrimary }]}>
              Модули обучения
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: palette.textSecondary }]}>
              Уроки открываются по порядку. Завершите активный шаг, чтобы открыть следующий.
            </ThemedText>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={lessons}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderLesson}
              contentContainerStyle={[
                styles.list,
                {
                  paddingHorizontal: 20,
                  paddingBottom: 100,
                  paddingTop: 30,
                },
              ]}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />

            <LinearGradient pointerEvents="none" colors={fadeColors} style={styles.topFade} />
          </View>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2751',
  },
  wrapper: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    color: '#FFF',
    marginBottom: 22,
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 22,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#12283c',
  },
  cardDone: {
    backgroundColor: '#0f2a30',
  },
  cardActive: {
    backgroundColor: '#0f172a',
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  cardLocked: {
    backgroundColor: '#0d1521',
    opacity: 0.85,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  cardTitle: {
    flex: 1,
    color: '#e2e8f0',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  badgeText: {
    fontWeight: '600',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#fbbf24',
  },
  ctaText: {
    color: '#0b1b2b',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
})
