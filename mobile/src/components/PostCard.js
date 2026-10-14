import { View, Text, Image, StyleSheet } from 'react-native';
import HeartIcon from '../../assets/icons/heart.svg';
import SendIcon from '../../assets/icons/send-outline.svg';
import { imageUrl } from '../api/client';
import { colors, fonts, typography } from '../constants/theme';

// One post in the Home feed: author row, text, image, likes/shares row.
export default function PostCard({ post }) {
  const { author } = post;

  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <Image source={{ uri: imageUrl(author.avatar) }} style={styles.authorAvatar} />
        <View>
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.authorOccupation}>{author.occupation}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image ? (
        <Image source={{ uri: imageUrl(post.image) }} style={styles.postImage} resizeMode="cover" />
      ) : null}

      <View style={styles.footer}>
        <View style={styles.stat}>
          <HeartIcon width={36} height={36} color={colors.textSecondary} />
          <Text style={styles.statText}>{post.likesCount}</Text>
        </View>
        <View style={styles.stat}>
          <SendIcon width={36} height={36} color={colors.textSecondary} />
          <Text style={styles.statText}>{post.sharesCount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingTop: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
  },
  authorName: {
    ...typography.b1,
    color: colors.textPrimary,
  },
  authorOccupation: {
    ...typography.b2,
    color: colors.textSecondary,
  },
  content: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 19,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: colors.backgroundLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...typography.b2,
    color: colors.textSecondary,
    marginLeft: -4,
  },
});
