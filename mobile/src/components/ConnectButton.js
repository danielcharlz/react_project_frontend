import { Pressable, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AddUserIcon from '../../assets/icons/add-user.svg';
import { colors, typography } from '../constants/theme';

// Three looks:
//   requested = true  -> grey outlined "Requested" (not tappable)
//   pending   = true  -> teal button with a spinner (request in progress, not tappable)
//   otherwise         -> teal "Connect" button
export default function ConnectButton({ requested, pending, onPress }) {
  if (requested) {
    return (
      <View style={[styles.button, styles.requested]} accessibilityRole="button" accessibilityState={{ disabled: true }}>
        <Text style={[styles.label, styles.requestedLabel]}>Requested</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.button, styles.connect, pressed && styles.pressed]}
      onPress={onPress}
      disabled={pending}
      accessibilityRole="button"
      accessibilityState={{ disabled: pending, busy: pending }}
    >
      {pending ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          <AddUserIcon width={36} height={36} color={colors.white} />
          <Text style={[styles.label, styles.connectLabel]}>Connect</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connect: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  requested: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  label: {
    ...typography.cta,
  },
  connectLabel: {
    color: colors.white,
    marginLeft: -2,
  },
  requestedLabel: {
    fontFamily: typography.b2.fontFamily,
    color: colors.textSecondary,
  },
});
