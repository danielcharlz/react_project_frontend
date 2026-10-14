import { useCallback, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews';
import { getPosts, getUsers } from '../api/client';
import { colors } from '../constants/theme';

export default function HomeScreen() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // first load: full-screen spinner
  const [refreshing, setRefreshing] = useState(false); // pull-to-refresh spinner
  const [error, setError] = useState(null);

  // Fetch the profile and the posts at the same time.
  const loadData = useCallback(async () => {
    try {
      const [usersData, postsData] = await Promise.all([getUsers(), getPosts()]);
      setProfile(usersData.currentUser);
      setPosts(postsData.posts);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load once when the screen opens.
  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleRetry() {
    setLoading(true);
    loadData();
  }

  function handleRefresh() {
    setRefreshing(true);
    loadData();
  }

  // Pick what to show below the header.
  let content;
  if (loading) {
    content = <LoadingState message="Loading your feed..." />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={handleRetry} />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={profile ? <ProfileHeader user={profile} /> : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState message="No posts yet." />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.primary]} />
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <AppHeader />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  separator: {
    height: 6,
    backgroundColor: colors.backgroundLight,
  },
});
