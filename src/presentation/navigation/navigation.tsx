import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  DetailsScreen,
  HomeScreen,
  WishListScreen,
  MovieCategoryScreen,
} from '@screen/index';

const HomeStack = createNativeStackNavigator({
  groups: {
    Home: {
      screens: {
        App: {
          screen: HomeScreen,
          options: { title: 'Premier Night' },
        },
      },
    },
    MovieCategories: {
      screens: {
        MovieCategories: {
          screen: MovieCategoryScreen,
          options: ({ route }) => ({
            title: route.params?.title,
          }),
        },
      },
    },
    Modal: {
      screenOptions: {
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerBackVisible: false,
        presentation: 'modal',
      },
      screens: {
        Details: DetailsScreen,
      },
    },
  },
});
const WishlistStack = createNativeStackNavigator({
  groups: {
    Wishlist: {
      screens: {
        App: {
          screen: WishListScreen,
          options: {
            headerShown: false,
          },
        },
      },
    },
    Modal: {
      screenOptions: {
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerBackVisible: false,
        presentation: 'modal',
      },
      screens: {
        Details: DetailsScreen,
      },
    },
  },
});

const RootTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName: string = 'home';

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'WishList') {
        iconName = focused ? 'heart' : 'heart-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  }),
  screens: {
    Home: {
      screen: HomeStack,
      options: {
        headerShown: false,
      },
    },
    WishList: {
      screen: WishlistStack,
      opacity: {
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootTabs);
