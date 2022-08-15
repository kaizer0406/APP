import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '@rneui/themed'
import { colors, constants, images } from '../../utils'

const ProfileCaseCard = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Image source={images.woman} style={{height: 70, width: 50, resizeMode: 'contain'}} />
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text style={{fontFamily: constants.openSansBold, fontSize: 18}}>Natailia Rivas</Text>
                <Text style={{fontFamily: constants.openSansSemiBold, fontSize: 16}}>UX-UI Designer en Apple</Text>
                <Text style={{fontFamily: constants.openSansSemiBold, fontSize: 16}}>27 años, Popayan, Colombia</Text>
          </View>
      </View>
      <Text style={{fontFamily: constants.openSansRegular, fontSize: 16}}>" Soy feliz diseñando las mejores interfaces en el mundo y promoviendo a más mujeres a sumarse a este mundo en mi país."</Text>
    </View>
  )
}

export default ProfileCaseCard

const styles = StyleSheet.create({})