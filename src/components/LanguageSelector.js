// import i18next from 'i18next';
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import Icons from '../assets/Icons';
import Images from '../assets/Images';
import {Colors, Fonts} from '../config';
import {changeLanguage} from '../redux/actions';

const LanguageSelector = React.forwardRef((props, ref) => {
  const selectedLanguage = useSelector(({reducer}) => reducer.language);
  const onSelect = lang => {
    ref.current.hide();
    // i18next.changeLanguage(lang).then(t => {
    //   changeLanguage(lang);
    // });
  };
  return (
    <ActionSheet
      ref={ref}
      containerStyle={{backgroundColor: 'transparent'}}
      overlayColor={'white'}
      defaultOverlayOpacity={0.7}>
      <View style={{padding: 20}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 12,
            padding: 20,
            paddingVertical: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                fontFamily: Fonts.boldItalic,
              }}>
              Select Language
            </Text>
            <TouchableOpacity onPress={() => ref.current.hide()}>
              <Image
                source={Icons.add}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  transform: [{rotate: '45deg'}],
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelect('en')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              marginTop: 15,
              backgroundColor:
                selectedLanguage == 'en' ? Colors.skyBlue : 'transparent',
            }}>
            <Image
              source={Images.englishFlag}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: Fonts.italic,
                marginLeft: 10,
              }}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelect('vi')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor:
                selectedLanguage == 'vi' ? Colors.skyBlue : 'transparent',
            }}>
            <Image
              source={Images.vietnamFlag}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: Fonts.italic,
                marginLeft: 10,
              }}>
              Vietnamese
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
});

export default LanguageSelector;
