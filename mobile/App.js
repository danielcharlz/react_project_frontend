import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import HomeFilledIcon from './assets/icons/home-filled.svg';
import HomeOutlineIcon from './assets/icons/home-outline.svg';
import SearchFilledIcon from './assets/icons/search-filled.svg';
import SearchOutlineIcon from './assets/icons/search-outline.svg';
import { colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();

// Tab icons: filled when the tab is active, outline otherwise.
function homeIcon({ focused, color }) {
  const Icon = focused ? HomeFilledIcon : HomeOutlineIcon;
  return <Icon width={40} height={40} color={color} />;
}

function discoverIcon({ focused, color }) {
  const Icon = focused ? SearchFilledIcon : SearchOutlineIcon;
  return <Icon width={40} height={40} color={color} />;
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });

  // Wait for DM Sans before drawing anything (if it fails, fall back to the system font).
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.root}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primaryDark,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: styles.tabBar,
            tabBarItemStyle: styles.tabBarItem,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: homeIcon }} />
          <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarIcon: discoverIcon }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white, // shows behind the tab bar's rounded corners
  },
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // soft shadow above the bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarItem: {
    paddingTop: 8,
  },
});
