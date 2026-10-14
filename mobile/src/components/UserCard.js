import { View, Text, Image, StyleSheet } from 'react-native';
import ConnectsCount from './ConnectsCount';
import ConnectButton from './ConnectButton';
import { imageUrl } from '../api/client';
import { colors, typography } from '../constants/theme';

// One person on the Discover grid.
export default function UserCard({ user, pending, onConnect }) {
  return (
    <View style={styles.card}>
      <ConnectsCount count={user.connectionsCount} style={styles.connectsStrip} />

      <View style={styles.body}>
        <Image source={{ uri: imageUrl(user.avatar) }} style={styles.avatar} />
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.occupation} numberOfLines={1}>
          {user.occupation}
        </Text>

        <View style={styles.buttonWrapper}>
          <ConnectButton requested={user.requested} pending={pending} onPress={() => onConnect(user._id)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  connectsStrip: {
    height: 26,
    backgroundColor: colors.primaryLight,
  },
  body: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 12,
  },
  occupation: {
    fontFamily: typography.b2.fontFamily,
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  buttonWrapper: {
    alignSelf: 'stretch',
    marginTop: 12,
  },
});
