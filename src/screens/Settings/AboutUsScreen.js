import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import LottieView from 'lottie-react-native';

export class AboutUsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
        icon={{
            name: 'arrow-left',
            type: 'font-awesome-5',
            size: 30,
            color: 'black',
        }}
        buttonStyle={{
            backgroundColor: colors.white,
            borderRadius: 10,
        }}
        containerStyle={{
            backgroundColor: colors.white,
            elevation: 4,
            borderRadius: 10,
            width: 60,
            paddingVertical: 5
        }}
        onPress={() => {
            this.props.navigation.goBack()
        }}
        />
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Sobre Nosotros</Text>  
        <LottieView 
            style={{ width: 230, height: 230, marginBottom: 10}}
            source={require('../../assets/animations/team.json')} 
            autoPlay 
            loop />
        <Text style={{textAlign: 'center', fontFamily: constants.openSansRegular, fontSize: 16}}>
        Somos un proyecto que busca empoderar a la mujer, basandonos en los conocimientos que se les puede impartir, principalmente en el ambito tecnologico.
{'\n\n'}
Buscando con ello reducir la brecha que existe en la actualidad y a su vez generando mayor presencia de ellas en este campo.
        </Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    display: 'flex',
    padding: 20
  },
  imageEnable: {
    resizeMode: 'contain', width: 40, height: 40
  },
  imageDisable: {
    resizeMode: 'contain', width: 40, height: 40, tintColor: colors.grayLight
  }
})

export default AboutUsScreen;