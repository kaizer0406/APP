import { View, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import TextField from '../../components/Input/TextField';
import { apiAuth } from '../../services';
import LoadingModal from '../../components/Modal/LoadingModal';

class RecoverScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password: '',
      repeat_password: '',
      isLoad: false
    };
  }

  async change(){
    
    if (this.state.password.trim() === '' || this.state.repeat_password.trim() === '' || this.state.code.trim() === '')
    {
        ToastAndroid.show('Complete todos los campos.', ToastAndroid.LONG);
        return  
    }
    if (this.state.password !== this.state.repeat_password){
      ToastAndroid.show('Las nuevas contraseñas deben coincidir.', ToastAndroid.LONG);
      return
    }
    try {
      this.setState({isLoad: true})
      const response = await apiAuth.resetPassword({code: this.state.code, password: this.state.password})
      this.setState({isLoad: false})
      const {error, message, result} = response
      if (error){
        ToastAndroid.show(message, ToastAndroid.LONG);
      }else{
        ToastAndroid.show(message, ToastAndroid.LONG);
        this.props.navigation.navigate('Login')
      }
    }catch (e){
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
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Actualizar contraseña</Text>
        <TextField 
          label={'codigo'} 
          onChangeText={text => this.setState({code: text})}
          keyboardType="number-pad"
          value={this.state.code} 
          style={{marginTop: 40}} /> 
           <TextField 
          label={'nueva contraseña'} 
          onChangeText={text => this.setState({password: text})}
          value={this.state.password} 
          keyboardType='visible-password'
          style={{marginTop: 17}} /> 
           <TextField 
          label={'repetir contraseña'} 
          keyboardType='visible-password'
          onChangeText={text => this.setState({repeat_password: text})}
          value={this.state.repeat_password} 
          style={{marginTop: 17}} /> 
        <Button
            title={'Actualizar'}
            onPress={async () => {
              await this.change()
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

export default RecoverScreen;