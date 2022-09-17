import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { CheckBox, Icon, Text } from '@rneui/themed';
import { colors, constants } from '../../utils';

const TestRadio = ({answer, question, options, onPress}) => {

  const [option, setOption] = useState('')

  return (
    <View>
      <Text style={{fontFamily: constants.openSansSemiBold, fontSize: 16, marginTop: 10, marginBottom: 10}} >{question}</Text>
      {options.map((value, index, array) => 
          <CheckBox
            containerStyle={{paddingVertical: 2, paddingHorizontal:0}}
            checkedColor={colors.pourple}
            textStyle={{fontFamily: `${constants.openSansRegular} !important`, fontWeight: '700', fontSize: 14}}
            key={index}
            title={value}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={option === value}
            onPress={() => {
              setOption(value)
              onPress(value)
            }}
          />
        )
      }
      
    </View>
  )
}

export default TestRadio

const styles = StyleSheet.create({})