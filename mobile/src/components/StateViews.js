import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/theme';

// Small full-screen views for the three non-happy states of a screen.

export function LoadingState({ message = 'Loading...' }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.retryButton} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.retryText}>Try again</Text>
      </Pressable>
    </View>
  );
}

export function EmptyState({ message }) {
  return (
    <View style={styles.center}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  message: {
    ...typography.b2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  retryText: {
    ...typography.cta,
    color: colors.white,
  },
});
