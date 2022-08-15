import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseModal from './BaseModal'

const LoadingModal = ({isVisible}) => {
  return (
    <BaseModal isVisible={isVisible}>
        <View style={{justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color={'#c8b6ff'} />
        </View>
    </BaseModal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({})