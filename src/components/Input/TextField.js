import { StyleSheet, View, TextInput } from 'react-native'
import { Text, Input } from '@rneui/themed';
import React from 'react'
import { colors, constants } from '../../utils';

const TextField = ({label, onChangeText, value, placeholder = '', keyboardType = 'default', secureTextEntry = false, onKeyPress, style = {}}) => {
  return (
    <View style={[styles.row, style]}>
        <Input
        value={value} 
        label={label}
        labelStyle={{fontWeight: 'normal', fontFamily: constants.openSansRegular}}
        inputStyle={{fontFamily: constants.openSansSemiBold}}
        inputContainerStyle={{borderBottomWidth: 0, padding: 0, height: 30, paddingLeft: 0}}
        containerStyle={{paddingTop: 5, height: 65}}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
      backgroundColor: colors.whiteBackground,
      borderRadius: 10,
    },
})

export default TextField