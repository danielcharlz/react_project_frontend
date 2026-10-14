import { View, Text, Image, StyleSheet } from 'react-native';
import ConnectsCount from './ConnectsCount';
import { imageUrl } from '../api/client';
import { colors, typography } from '../constants/theme';

// Current user's profile at the top of the Home feed.
export default function ProfileHeader({ user }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl(user.avatar) }} style={styles.avatar} />

      <ConnectsCount count={user.connectionsCount} style={styles.pill} />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.occupation}>{user.occupation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 20,
    backgroundColor: colors.backgroundLight,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
  },
  pill: {
    marginTop: 16,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D5EEEE',
    backgroundColor: colors.primaryLight,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 12,
  },
  occupation: {
    fontFamily: typography.b2.fontFamily,
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
