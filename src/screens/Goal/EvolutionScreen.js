import { View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import LottieView from 'lottie-react-native';
import { apiSettings } from '../../services';


export class EvolutionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      level: 'BASICO',
      isLoad: true
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
        const {level} = result
        this.setState({level}, () => {this.setState({isLoad: false})})
      }
    }catch (e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getProfile()
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
        {this.state.isLoad ? 
          <View style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
             <ActivityIndicator color={colors.magenta} size="large" /> 
            </View>
        :
        <>
        {this.state.level === 'BASICO' && 
        <>
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Mi Nivel es 1 (Junior)</Text>  
        <LottieView 
            style={{ width: 230, height: 230, marginBottom: 10}}
            source={require('../../assets/animations/girl-junior.json')} 
            autoPlay 
            loop />
        <Text style={{textAlign: 'center', fontFamily: constants.openSansRegular, fontSize: 16}}>
        Son los usuarios que ya han superado al menos 2 cursos en el nivel básico. Y el ícono de la mujer estudiante representa el inicio del escalon en el empoderamiento, ya que recien estan adquiriendo conocimientos en temas de Tecnología.
        </Text>
        </>
        }
         {this.state.level === 'INTERMEDIO' && 
        <>
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Mi Nivel es 2 (Semi Senior)</Text>  
        <View style={{alignItems: 'center'}}>
        <LottieView 
            style={{ width: 250, height: 250, marginBottom: 10}}
            source={require('../../assets/animations/girl-intermediate.json')} 
            autoPlay 
            loop />
            </View>
        <Text style={{textAlign: 'center', fontFamily: constants.openSansRegular, fontSize: 16}}>
        Son los usuarios que ya han superado al menos 2 cursos en el nivel intermedio.  Y el ícono de la mujer trabajadora representa el nivel intermedio del escalon en el empoderamiento, ya que se encuentra motivada y con los suficientes conocimientos técnicos para formar parte de Proyectos TI dentro del entorno laboral.
        </Text>
        </>
        }
         {this.state.level === 'AVANZADO' && 
        <>
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Mi Nivel es 3 (Senior)</Text>  
        <View style={{alignItems: 'center'}}>
        <LottieView 
            style={{ width: 230, height: 230, marginBottom: 10}}
            source={require('../../assets/animations/girl-advance.json')} 
            autoPlay 
            loop />
        </View>
        <Text style={{textAlign: 'center', fontFamily: constants.openSansRegular, fontSize: 16}}>
        Son los usuarios que ya han superado al menos 2 cursos en el nivel avanzado.  Y el ícono de la mujer empresaria representa el máximo escalon en el empoderamiento, ya que cuenta con la suficiente motivación, autoconfianza, experiencia técnica y estratégica para liderar una compañia y sus colaboradores.
        </Text>
        </>
        }
        </>
        }
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

export default EvolutionScreen;