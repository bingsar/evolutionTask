import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/context/theme-context';

export default function TabLayout() {
  const { theme } = useThemeContext();
  const backgroundColor = Colors[theme].background;

  return (
    <NativeTabs
      backgroundColor={backgroundColor}
      shadowColor="transparent"
      disableTransparentOnScrollEdge
    >
      <NativeTabs.Trigger name="index">
        <Icon
          sf="list.bullet.rectangle.fill"
          androidSrc={<VectorIcon family={Ionicons} name="list" />}
        />
        <Label>Модули</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon
          sf="gear"
          androidSrc={<VectorIcon family={Ionicons} name="settings-sharp" />}
        />
        <Label>Настройки</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
