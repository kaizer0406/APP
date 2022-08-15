import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'

export class PrivacyScreen extends Component {

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
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Politicas de Privacidad</Text>  
        <Text style={{textAlign: 'justify', fontFamily: constants.openSansRegular, fontSize: 16}}>
        Nos basamos en la ley  N° 29733 – Ley de Protección de Datos Personales, y su Reglamento, aprobado por el decreto Supremo N° 003-2013-JUS.
{'\n\n'}
Este regula el tratamiento de los datos personales, con el objeto de garantizar el derecho fundamental a la protección de datos personales de sus titulares y de los derechos que las mencionadas 
disposiciones legales conceden.
{'\n\n'}
En ese sentido, garantizamos el mantenimiento de la confidencialidad y la seguridad en el tratamiento
de los datos personales facilitados por lo usuarios  que acceden, en forma libre y voluntaria, a nuestra aplicacion, ya que las bases de datos personales donde se almacenan cuentan con medidas de seguridad para evitar cualquier alteración, pérdida, acceso o tratamiento no autorizados.
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

export default PrivacyScreen;