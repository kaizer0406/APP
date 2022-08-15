import { View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Text } from '@rneui/themed'
import {Button} from '@rneui/base'
import LottieView from 'lottie-react-native';

import { colors, constants } from '../../utils'

export class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <LottieView 
            style={{ width: 230, height: 230, marginTop: 20, marginBottom: 50}}
            source={require('../../assets/animations/girl-laptop.json')} 
            autoPlay 
            loop />
        </View>
        <View style={{marginTop: 20, width: 300}}>
            <Text style={styles.title}>Conviértete en una profesional en cualquier parte</Text>
        </View>
        <View style={{marginTop: 20, width: 250}}>
            <Text style={styles.description}>!Únete a nuestra comunidad de manera rapida y sencilla!</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', display: 'flex'}}>
          <Button
                title={'Registrarse'}
                onPress={() => {
                  this.props.navigation.navigate('Register')
                }}
                titleStyle={{
                  color:colors.white,
                  fontSize: 18, 
                  marginVertical: 5,
                  fontFamily: constants.openSansBold
                }}
                buttonStyle={{
                  backgroundColor: colors.bluePurple
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  borderRadius: 10, 
                  
                }}
              />
          <Button
                title={'Iniciar Sesión'}
                onPress={() => {
                  this.props.navigation.navigate('Login')
                }}
                titleStyle={{
                  color:  '#D59BFF',
                  fontSize: 18, 
                  marginVertical: 5,
                  fontFamily: constants.openSansBold
                }}
                buttonStyle={{
                  backgroundColor: '#EBE4FF',
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  borderRadius: 10, 
                  
                }}
                />
          </View>
      </View>
    )
  }
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.white,
        padding: 20
    },
    title: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 22,
        fontFamily: constants.openSansBold
    },
    description: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: constants.openSansRegular
    }
})