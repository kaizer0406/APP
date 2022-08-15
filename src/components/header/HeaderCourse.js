import { StyleSheet, View, Image } from 'react-native'
import { Text } from '@rneui/themed'
import React from 'react'
import { constants } from '../../utils'

const HeaderCourse = ({image, text}) => {
  return (
    <View>
      <Image source={image} style={styles.image}  />
      <Text style={styles.text}>{text}</Text> 
    </View>
  )
}

export default HeaderCourse

const styles = StyleSheet.create({
    image: {
        width: constants.width,
        height: 200
    },
    text: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: 70,
    }
})