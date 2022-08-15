import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from '@rneui/themed'
import BaseModal from './BaseModal'
import { colors, constants } from '../../utils'

const MatriculatedModal = ({isVisible, level, speciality, onAcept = () => {}, onCancel = () => {}}) => {
  return (
    <BaseModal isVisible={isVisible}>
        <View style={{justifyContent: 'center', flex: 1}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, minHeight: 200,justifyContent: 'space-around'}}>
                <Text style={{fontFamily: constants.openSansBold, fontSize: 20, textAlign: 'center', textAlignVertical: 'center'}}>Lista para aprender el nivel {level} de {speciality} </Text>
                {/* <View style={{height: 20}} />  */}
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{backgroundColor: '#EBD1FF',borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8}} onPress={onCancel} activeOpacity={1} >
                        <Text style={{fontSize: 20, fontFamily: constants.openSansBold, color:'#8794FF'}} >No gracias</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity  onPress={onAcept} style={{backgroundColor: '#C87DFF', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8}} activeOpacity={1} >
                    <Text style={{fontSize: 20, fontFamily: constants.openSansBold, color:'white'}} >Si estoy lista!</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    </BaseModal>
  )
}

export default MatriculatedModal

const styles = StyleSheet.create({})