import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed';
import React from 'react'
import { colors, constants } from '../../utils';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const TextFieldDatePicker = ({label,  value, setValue, text}) => {

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setValue(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          style: {
            shadowColor: '#fff',
            shadowRadius: 0,
            shadowOpacity: 1,
            shadowOffset: { height: 0, width: 0 },
          },
          value: value,
          onChange,
          mode: currentMode,
          is24Hour: true
        })
      };

    const showDatepicker = () => {
    showMode('date');
    };

    return (
        <View style={{backgroundColor: colors.whiteBackground, marginTop: 17, borderRadius: 10, height: 65}}>
            <Text style={{color: '#86939e', fontFamily: constants.openSansRegular, fontSize: 16, marginTop:7, marginLeft: 10}}>{label}</Text>
            <Text
            style={styles.input}
            onPress={showDatepicker}
            >{text}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18, 
        fontFamily: constants.openSansSemiBold,
        color: colors.black, 
        borderBottomColor: colors.black, 
        marginTop: 2,
        marginLeft: 14
      },
      text: {
        fontSize: 22,
        color: colors.pink,
        fontWeight: 'bold',
        width: 115
      },  
      row: {
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
      },
})

export default TextFieldDatePicker