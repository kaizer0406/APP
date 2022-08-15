import { View, StyleSheet, Image, ToastAndroid, Keyboard } from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import TextField from '../../components/Input/TextField';
import { apiAuth } from '../../services';
import LoadingModal from '../../components/Modal/LoadingModal';

class ForgetScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: __DEV__ ? 'bot.test.dev@gmail.com' : '',
      isLoad: false
    };
  }

  async forget() {
    try{
      this.setState({isLoad: true})
      Keyboard.dismiss()
      const response = await apiAuth.forget({email: this.state.email})
      const {error, result, message } = response
      this.setState({isLoad: false})
      if (error){
        ToastAndroid.show(message, ToastAndroid.LONG);
      }else{
        ToastAndroid.show(message, ToastAndroid.LONG);
      }
    }catch (e) {
      this.setState({isLoad: false})
      console.log('error', e)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.isLoad} /> 
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
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Olvide mi contraseña</Text>
        <Text style={{fontSize: 16, fontFamily: constants.openSansRegular}}>Recibiras un correo para que puedas restablecer tu contraseña</Text>
        <TextField 
          label={'correo'} 
          onChangeText={text => this.setState({email: text})}
          keyboardType="email-address"
          value={this.state.email} 
          style={{marginTop: 40}} /> 
        <Button
            title={'Enviar'}
            onPress={async () => {
                await this.forget()
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
            <Button
                title={'Ingresar codigo de correo'}
                onPress={() => {
                  this.props.navigation.navigate('Recover')
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
                    width: '100%',
                    marginTop: 10,
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

export default ForgetScreen;