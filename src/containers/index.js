import React from 'react';
// import {Tabbar, Colors} from '../config';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// import MyTabBar from '../components/Tabbar';

import {
  AudioAyaat,
  AudioInfo,
  AudioPlayer,
  Bookmarks,
  Dashboard,
  Listen,
  PdfViewer,
  Profile,
  QWT,
  Quran,
  Signin,
  Signup,
  Surah,
  Translation,
  TranslationInfo,
} from '../Screens';

import {DrawerActions} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        gestureEnabled: false,
      }}
      initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'simple_push',
        gestureEnabled: false,
      }}
      initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Quran"
        component={Quran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Surah"
        component={Surah}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Listen"
        component={Listen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioPlayer"
        component={AudioPlayer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Translation"
        component={Translation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Translationinfo"
        component={TranslationInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{headerShown: false}}
      />
      <Stack.Screen name="QWT" component={QWT} options={{headerShown: false}} />
      <Stack.Screen
        name="Pdf"
        component={PdfViewer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Audio"
        component={AudioAyaat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioInfo"
        component={AudioInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      /> */}
    </DrawerContentScrollView>
  );
}
// const AppStack = () => {
//   return (
//     <Drawer.Navigator
//       // screenOptions={}
//       useLegacyImplementation
//       drawerPosition="right"
//       drawerStyle={{width: '40%'}}
//       // drawerPosition="right"
//       drawerType="back"
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       initialRouteName="Home">
//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         options={{headerShown: false}}
//       />
//       <Drawer.Screen
//         name="Ingrendiants"
//         component={Ingrendiants}
//         options={{headerShown: false}}
//       />
//       <Drawer.Screen
//         name="Nutirents"
//         component={Nutirents}
//         options={{headerShown: false}}
//       />
//     </Drawer.Navigator>
//   );
// };

// const AppStack = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <MyTabBar {...props} />}
//       initialRouteName="home"
//       screenOptions={{
//         unmountOnBlur: true,
//       }}>
//       <Tab.Screen
//         name="Ingredients"
//         initialParams={{
//           backShown: true,
//         }}
//         component={IngredientsStack}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="LoadDefaults"
//         component={LoadDefaults}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="home"
//         component={AppStack1}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="reports"
//         component={Reports}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="users"
//         component={Users}
//         options={{headerShown: false}}
//       />
//     </Tab.Navigator>
//   );
// };

export {AuthStack, AppStack};
