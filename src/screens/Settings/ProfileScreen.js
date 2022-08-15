import { View, StyleSheet, Image, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { colors, constants, functions, images } from '../../utils'
import TextField from '../../components/Input/TextField';
import TextFieldDatePicker from '../../components/Input/TextFieldDatePicker';
import funcitons from '../../utils/funcitons';
import { apiSettings } from '../../services';
import LoadingModal from '../../components/Modal/LoadingModal'

export class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: __DEV__ ? 'juan' : '',
      fatherLastName: __DEV__ ? 'Perez' : '',
      motherLastName: __DEV__ ? 'Torres' : '',
      email: __DEV__ ? 'test@gmail.com' : '',
      password: __DEV__ ? '' : '',
      birthdate: functions.formatDate(new Date()),
      date: new Date(),
      linkedin: __DEV__ ? 'Juan Perez Torres' : '',
      isLoad: true,
      loadService: false
    };
  }

  getProfile = async () => {
    try {
      const response = await apiSettings.getProfile()
      console.log('response => ', response)
      const {result, message, error} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        const {name, last_name, mother_last_name, birthdate, email, linkedin} = result
        this.setState({names: name, fatherLastName: last_name, motherLastName: mother_last_name, date: birthdate, birthdate: funcitons.formatDate(new Date(birthdate)), email, linkedin}, () => {this.setState({isLoad: false})})
      }
    }catch (e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getProfile()
  }

  updateProfile = async () => {
    try {
      const {names, fatherLastName, motherLastName, birthdate, email, linkedin, password} = this.state
      if (names.trim() === '' || fatherLastName.trim() === '' || motherLastName.trim() === '' || birthdate === '', email.trim() === ''){
        ToastAndroid.show("Complete todos los campos.", ToastAndroid.SHORT)
        return
      }
      this.setState({loadService: true})
      const response = await apiSettings.updateProfile({names: names, last_name: fatherLastName, mother_last_name: motherLastName, birthdate: birthdate, email: email, linkedin: linkedin, password: password})
      const { message, error } = response
      this.setState({loadService: false})
      if (error){
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
    }catch (e){
      this.setState({loadService: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
    <View style={{backgroundColor: colors.white, display: 'flex', flex:1}}>
      <LoadingModal isVisible={this.state.loadService} /> 
      {this.state.isLoad ? 
      <>
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
            paddingVertical: 5,
            margin: 20
          }}
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <View style={{justifyContent: 'center', display: 'flex', flex: 1}}>
            <ActivityIndicator color={colors.magenta} size="large" /> 
        </View>
      </>
      :
      <ScrollView style={styles.container}>
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
            paddingVertical: 5,
            marginLeft: 20,
            marginTop: 20
          }}
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Mi Perfil</Text>
        <TextField 
          label={'nombres'} 
          onChangeText={text => this.setState({names: text})}
          value={this.state.names} 
          style={{marginTop: 25}} /> 
          <TextField 
          label={'apellido paterno'} 
          onChangeText={text => this.setState({fatherLastName: text})}
          value={this.state.fatherLastName} 
          style={{marginTop: 17}} /> 
        <TextField 
          label={'apellido materno'} 
          onChangeText={text => this.setState({motherLastName: text})}
          value={this.state.motherLastName} 
          style={{marginTop: 17}} /> 
        <TextField 
          label={'correo'} 
          onChangeText={text => this.setState({email: text})}
          keyboardType="email-address"
          value={this.state.email} 
          style={{marginTop: 17}} /> 
        <TextField 
          label={'contraseña'} 
          keyboardType='visible-password'
          value={this.state.password} 
          onChangeText={text => this.setState({password: text})}
          secureTextEntry={true}
          style={{marginTop: 17}} /> 
         <TextFieldDatePicker
            label={'fecha de nacimiento'}
            value={this.state.date} 
            text={this.state.birthdate}
            setValue={(value) => {this.setState({birthdate: funcitons.formatDate(value), date: value})}}
        />  
        <TextField 
          label={'perfil de linkedin (opcional)'} 
          onChangeText={text => this.setState({linkedin: text})}
          value={this.state.linkedin} 
          style={{marginTop: 17}} /> 
        <Button
            title={'Guardar'}
            onPress={async () => {
              await this.updateProfile()
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
      </ScrollView>
      }
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // margin: 20
  },
})

export default ProfileScreen;