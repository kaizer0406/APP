import { View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import CupCard from '../../components/Card/CupCard';
import { apiLevel } from '../../services';

const myCups = [
    {name: 'Basico', active: true},
    {name: 'Intermedio', active: true},
    {name: 'Avanzado', active: true},
  ]
  

  const soonCups = [
    {name: 'Basico',  active: false},
    {name: 'Intermedio',  active: false},
    {name: 'Avanzado',  active: false},
  ]
  

export class CupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      trophiesComplete: [],
      trophiesIncomplete: []
    };
  }

  getTrophies =  async () => {
    try {
      const response = await apiLevel.getTrophies()
      const {result, error, message } = response
      if (error){
        this.setState({isLoad:false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        const {trophies_wins, trophies_missing} = result
        this.setState({trophiesComplete: trophies_wins.map(item => ({...item, active: true})), trophiesIncomplete: trophies_missing.map(item => ({...item, active: false}))}, () => {this.setState({isLoad:false})})
      }
    }catch (e){
      this.setState({isLoad:false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getTrophies()
  }

  renderItem = ({item, index, array}) => {
    return (
      <CupCard key={index} item={item} /> 
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
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
            
        </View>
        {
          this.state.isLoad 
          ? 
          <View style={{flex: 1, justifyContent: 'center', display: 'flex'}}>
            <ActivityIndicator color={colors.magenta} size="large" /> 
            </View>
          :
          <>
          <View style={{paddingHorizontal: 20}}>
          <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 5}}>Mis Logros</Text>  
            <Text style={{ fontFamily: constants.openSansSemiBold, fontSize: 16}}>
            Podras ver todos los logros que han 
    conseguido y lo que aun pueden conseguir.
            </Text>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 10}} >Mis Premios</Text>
        </View>
            <View style={{height: 190}}>
        <FlatList 
        contentContainerStyle={{ padding: 20}}
        ItemSeparatorComponent={() => (<View style={{width: 20}} /> )}
        data={this.state.trophiesComplete} 
        keyExtractor={(item, index) => index}  
        renderItem={this.renderItem} horizontal/> 
        </View>
        <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 10, marginHorizontal: 20}} >Proximos Premios</Text>
        <View style={{height: 190}}>
        <FlatList 
        contentContainerStyle={{ padding: 20}}
        ItemSeparatorComponent={() => (<View style={{width: 20}} /> )}
        data={this.state.trophiesIncomplete} 
        keyExtractor={(item, index) => index}  
        renderItem={this.renderItem} horizontal/> 
        </View>
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
    // padding: 20
  },
  imageEnable: {
    resizeMode: 'contain', width: 40, height: 40
  },
  imageDisable: {
    resizeMode: 'contain', width: 40, height: 40, tintColor: colors.grayLight
  }
})

export default CupScreen;