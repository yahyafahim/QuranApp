import React, {useState} from 'react';
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
  BookmarkedData,
  Bookmarks,
  Dashboard,
  FavoriteDetails,
  Juz,
  Listen,
  PdfViewer,
  Profile,
  QWT,
  Quran,
  QuranSurah,
  Signin,
  Signup,
  Surah,
  SurahDetailsColor,
  Translation,
  TranslationInfo,
} from '../Screens';

import {DrawerActions} from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, NavService} from '../config';
import TajweedRule from '../Screens/TajweedRule';

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
    <Drawer.Navigator
      // screenOptions={}
      // useLegacyImplementation
      // drawerPosition="right"
      drawerStyle={{width: '40%'}}
      // drawerPosition="right"
      // drawerType="back"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        animation: 'simple_push',
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {backgroundColor: 'white', width: '60%'},
        drawerPosition: 'right',
      }}
      initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={MainStack} />
      <Drawer.Screen name="Juz" component={Juz} />
    </Drawer.Navigator>
  );
};

{
  /* <DrawerContentScrollView {...props}>
<DrawerItemList {...props} />
<DrawerItem
  label="Close drawer"
  onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
/>
<DrawerItem
  label="Toggle drawer"
  onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
/>
</DrawerContentScrollView> */
}
function CustomDrawerContent(props) {
  const arr = [
    {
      name: 'Dashboard',
      icon: require('../assets/Icons/book.png'),
      navigate: 'Dashboard',
    },
    {
      name: 'Juz (Chaptet)',
      icon: require('../assets/Icons/book.png'),
      navigate: 'Juz',
    },
    {
      name: 'Surah',
      icon: require('../assets/Icons/book.png'),
      navigate: 'QuranSurah',
    },
    {
      name: 'Bookmarks',
      icon: require('../assets/Icons/bookmark.png'),
      navigate: 'Bookmarks',
    },
    {
      name: 'Tajweed Rules',
      icon: require('../assets/Icons/tajweedRule.png'),
      navigate: 'TajweedRule',
    },
    {
      name: 'Rate Us',
      icon: require('../assets/Icons/rate.png'),
    },
  ];

  const RenderItem = ({item, selected, setSelected}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item.name);
          NavService?.navigate(item?.navigate);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          backgroundColor: item.name === selected ? Colors.color5 : 'white',
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <View style={{padding: 10, borderRadius: 10, backgroundColor: 'white'}}>
          <Image
            resizeMode="contain"
            tintColor={Colors.color5}
            style={{width: 15, height: 15}}
            source={item.icon}
          />
        </View>
        <Text style={{flex: 1, fontWeight: '600', marginLeft: 10}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const [selected, setSelected] = useState('Dashboard');
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{flexDirection: 'row', height: 200}}
        colors={['#08AE70', '#08AE70', '#149162']}>
        <ImageBackground
          imageStyle={{
            alignSelf: 'flex-end',
            top: '40%',
          }}
          resizeMode="contain"
          source={require('../assets/Icons/Vector.png')}
          style={{flex: 1}}>
          <Image
            resizeMode="contain"
            tintColor={'white'}
            style={{width: '100%', height: 35}}
            source={require('../assets/Icons/traaa.png')}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
              iTajweed
            </Text>
            <Text style={{color: 'white', fontSize: 12, fontWeight: '400'}}>
              Color Coded
            </Text>
          </View>
        </ImageBackground>
      </LinearGradient>
      <View style={{flex: 1, paddingVertical: 50}}>
        <FlatList
          contentContainerStyle={{padding: 10}}
          data={arr}
          renderItem={({item, index}) => (
            <RenderItem
              selected={selected}
              setSelected={setSelected}
              index={index}
              item={item}
            />
          )}
        />
      </View>
    </View>
  );
}
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
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
      {/* <Stack.Screen name="QWT" component={QWT} options={{headerShown: false}} />
      <Stack.Screen
        name="Pdf"
        component={PdfViewer}
        options={{headerShown: false}}
      /> */}
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
      <Stack.Screen
        name="BookmarkedData"
        component={BookmarkedData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SurahDetailsColor"
        component={SurahDetailsColor}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="QuranSurah"
        component={QuranSurah}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TajweedRule"
        component={TajweedRule}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FavoriteDetails"
        component={FavoriteDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

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
