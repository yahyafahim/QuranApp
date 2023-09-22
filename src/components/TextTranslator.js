import React from 'react';

// import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

const TextTranslator = props => {
  // const {t} = useTranslation();
  if (typeof props.children === 'string') {
    // return <Text {...props}>{t(props.children)}</Text>;
  }
  return <Text {...props}>{props.children}</Text>;
};

export default TextTranslator;
