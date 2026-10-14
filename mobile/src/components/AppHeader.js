import { View, Text, Pressable, StyleSheet } from 'react-native';
import PlusIcon from '../../assets/icons/plus.svg';
import { colors, fonts } from '../constants/theme';

// Top bar of the Home screen: "DocConnect" logo + "+" button.
// The + button is visual only (creating posts is not part of this task).
export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.logoDoc}>Doc</Text>
        <Text style={styles.logoConnect}>Connect</Text>
      </Text>

      <Pressable style={styles.plusButton} accessibilityLabel="Create post">
        <PlusIcon width={36} height={36} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    fontFamily: fonts.medium,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  logoDoc: {
    color: colors.textPrimary,
  },
  logoConnect: {
    color: colors.primaryDark,
  },
  plusButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
