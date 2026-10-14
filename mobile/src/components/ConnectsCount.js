import { View, Text, StyleSheet } from 'react-native';
import ConnectsIcon from '../../assets/icons/connects.svg';
import { colors, typography } from '../constants/theme';

// The "🔌 2 Connects" label. Used in the Home profile pill and on Discover cards.
export default function ConnectsCount({ count, style }) {
  return (
    <View style={[styles.row, style]}>
      <ConnectsIcon width={16} height={8} color={colors.primaryDark} />
      <Text style={styles.text}>{count} Connects</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    ...typography.b2,
    color: colors.textSecondary,
  },
});
