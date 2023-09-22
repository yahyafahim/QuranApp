import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {Colors, Fonts, Shadows} from '../config';
import Images from '../assets/Images';
import {getCategories} from '../redux/APIs';
import Icons from '../assets/Icons';
import LanguageSelector from './LanguageSelector';
import {useSelector} from 'react-redux';
import Text from '../components/TextTranslator';

const {width} = Dimensions.get('window');

const Categories = ({onChange = () => {}}) => {
  const [categories, setCategories] = useState(['', '', '', '']);

  const ref = createRef();

  const selectedLanguage = useSelector(({reducer}) => reducer.language);

  const getAllCategories = async () => {
    const data = await getCategories();
    console.log(data);
    setCategories(['', ...data]);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const [selected, setSelected] = useState(0);
  const _renderItem = ({item, index}) => {
    const {id, title, activeIcone, inactiveIcon} = item;
    const isSelected = selected === index;
    return (
      <View style={{alignItems: 'center', marginLeft: index == 0 ? 0 : 7.5}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (index === 0) {
              onChange(-1);
            } else {
              onChange(id);
            }
            setSelected(index);
          }}
          style={{
            backgroundColor: Colors.white,
            width: width * 0.2,
            height: width * 0.2,
            borderRadius: 12,
            ...Shadows.shadow3,
          }}>
          <Image
            source={
              index == 0
                ? isSelected
                  ? Images.allActive
                  : Images.allInactive
                : {uri: isSelected ? activeIcone : inactiveIcon}
            }
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.black,
            fontFamily: Fonts.medium,
            fontSize: 20,
            marginTop: 10,
          }}>
          {index == 0 ? 'All' : title}
        </Text>
      </View>
    );
  };

  return (
    <View style={{marginTop: 20}}>
      <LanguageSelector ref={ref} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.black,
            fontFamily: Fonts.boldItalic,
            fontSize: 24,
          }}>
          str_Categories
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => ref.current.show()}
          style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.italic,
              fontSize: 20,
            }}>
            {selectedLanguage.toUpperCase()}
          </Text>
          <Image
            source={Icons.dropdown}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              marginBottom: 2,
              marginLeft: 4,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        bounces={false}
        style={{marginTop: 15}}
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 3,
        }}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Categories;
