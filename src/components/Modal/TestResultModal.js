import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from '@rneui/themed'
import BaseModal from './BaseModal'
import { colors, constants } from '../../utils'

const TestResultModal = ({isVisible, score , onClose = () => {}}) => {
  return (
    <BaseModal isVisible={isVisible}>
        <View style={{justifyContent: 'center', flex: 1}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, minHeight: 200, justifyContent: 'space-around'}}>
                <Text style={{fontFamily: constants.openSansBold, fontSize: 16, textAlign: 'center', textAlignVertical: 'center'}}>Tu resultado de la prueba fue de </Text>
                <Text style={{fontFamily: constants.openSansBold, fontSize: 40, textAlign: 'center', textAlignVertical: 'center'}}> {score} </Text>
                {/* <View style={{height: 20}} />  */}
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{backgroundColor: '#EBD1FF',borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8}} onPress={onClose} activeOpacity={1} >
                        <Text style={{fontSize: 20, fontFamily: constants.openSansBold, color:'#8794FF'}} >Cerrar</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    </BaseModal>
  )
}

export default TestResultModal

const styles = StyleSheet.create({})