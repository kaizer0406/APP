import { View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { openComposer } from "react-native-email-link";

export class ContactScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  contact = () => {
    openComposer({
        to: "bot.test.dev@gmail.com",
        subject: "Tengo una consulta",
        body: "Hola, me pueden ayudar con...",
      });
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
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Contacto</Text>
        <Text style={{fontSize: 16,marginTop: 10, fontFamily: constants.openSansSemiBold}}>Si tienes alguna duda, sugerencia o problema encontrado en el aplicativo. 
Puedes contactarte con nosotros enviandonos un correo electronico.</Text>
        <Button
            title={'Contactar'}
            onPress={() => {
              this.contact()
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
              width: '100%',
              marginTop: 20,
              borderRadius: 10, 
            }}
          />
          <View style={{height: constants.height, position: 'absolute',justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={images.forget} style={{resizeMode: 'cover', alignSelf: 'center', width: constants.width, height: 300}} />
          </View>

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
})

export default ContactScreen;