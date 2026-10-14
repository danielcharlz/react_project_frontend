import { useCallback, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Alert, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import SearchIcon from '../../assets/icons/search-outline.svg';
import UserCard from '../components/UserCard';
import { LoadingState, ErrorState, EmptyState } from '../components/StateViews';
import { getUsers, sendConnectRequest } from '../api/client';
import { colors, typography } from '../constants/theme';

// Alert.alert does nothing in a web browser, so use window.alert there.
function showError(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export default function DiscoverScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [pendingIds, setPendingIds] = useState([]); // users whose Connect request is in progress

  // The "requested" flag of every user comes from the backend (MongoDB),
  // so it is still correct after a refresh or after closing the app.
  const loadUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Reload every time this tab comes into view.
  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  function handleRetry() {
    setLoading(true);
    loadUsers();
  }

  function handleRefresh() {
    setRefreshing(true);
    loadUsers();
  }

  async function handleConnect(userId) {
    if (pendingIds.includes(userId)) return; // already sending

    setPendingIds((ids) => [...ids, userId]);
    try {
      await sendConnectRequest(userId);
      // Only after the server confirms do we show "Requested".
      setUsers((current) => current.map((user) => (user._id === userId ? { ...user, requested: true } : user)));
    } catch (err) {
      // Button stays "Connect" so the user can try again.
      showError('Request not sent', err.message);
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== userId));
    }
  }

  let content;
  if (loading) {
    content = <LoadingState message="Finding people..." />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={handleRetry} />;
  } else {
    content = (
      <FlatList
        data={users}
        keyExtractor={(user) => user._id}
        numColumns={2}
        renderItem={({ item }) => (
          <UserCard user={item} pending={pendingIds.includes(item._id)} onConnect={handleConnect} />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<EmptyState message="No people to show right now." />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.primary]} />
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        {/* Search is shown to match the design; searching is not part of this task. */}
        <View style={styles.searchBar}>
          <SearchIcon width={28} height={28} color={colors.textPrimary} />
          <Text style={styles.searchPlaceholder}>Search profiles, organizations...</Text>
        </View>
        <Text style={styles.sectionTitle}>People you may know</Text>
      </View>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  searchBar: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 4,
  },
  searchPlaceholder: {
    fontFamily: typography.b2.fontFamily,
    fontSize: 16,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: typography.b2.fontFamily,
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 14,
  },
  list: {
    backgroundColor: colors.backgroundLight,
  },
  listContent: {
    padding: 20,
    gap: 16,
    flexGrow: 1,
  },
  row: {
    gap: 16,
  },
});
