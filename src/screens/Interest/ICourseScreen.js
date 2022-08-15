import { View, StyleSheet, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { apiLevel, apiSpeciality } from '../../services';
import MatriculatedModal from '../../components/Modal/MatriculatedModal';
import LoadingModal from '../../components/Modal/LoadingModal'


const levels = [
  {name: 'Basico', number: 3, active: true},
  {name: 'Intermedio', number: 3, active: false},
  {name: 'Avanzado', number: 3, active: false}
]

export class ICourseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      data: {}, 
      level: {}, 
      isLoadMatriculated: false,
      showMatriculated: false
    };
  }

  getSpeciality = async () => {
    try {
      const id = this.props.route.params.id
      const response = await apiSpeciality.getById({id})
      const { result, message, error} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        globals.speciality = result
        this.setState({isLoad: false, data: result})
      }
    }catch(e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getSpeciality()
  }

  enrolledLevel = async () => {
    try {
      this.setState({isLoadMatriculated: true, showMatriculated: false})
      const response = await apiLevel.matriculatedLevel({id: this.state.level.id})
      const {error, message, result} = response
      if (error){
        this.setState({isLoadMatriculated: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        const data = this.state.data
        data.levels.forEach((item, index) => {
          if (item.id == this.state.level.id){
            item.is_matriculated = true
          }
        });
        this.setState({data: data, isLoadMatriculated: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
    }catch(e){
      this.setState({isLoadMatriculated: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
        this.state.isLoad ? 
          <View style={[styles.container, {padding: 20}]}>
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
            <View style={{ flex:1, justifyContent: 'center'}}>
              <ActivityIndicator  size="large" color={colors.magenta} /> 
            </View>
          </View>
        :
      <View style={styles.container}>
        <LoadingModal isVisible={this.state.isLoadMatriculated} /> 
        <MatriculatedModal isVisible={this.state.showMatriculated} level={this.state.level.name} speciality={this.state.data.name} onAcept={async () => { await this.enrolledLevel()}} onCancel={() => {this.setState({showMatriculated: false})}} /> 
        <ScrollView style={{}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20}}>
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
            <Button
              TouchableComponent={({onPress})  => 
                <TouchableOpacity activeOpacity={1} onPress={onPress} style={{justifyContent: 'center',alignItems: 'center', flex:1, display: 'flex'}}>
                  <Image source={images.roadmap} style={{resizeMode: 'contain', width: 35, height: 35}} /> 
                </TouchableOpacity>
              }
              containerStyle={{
                backgroundColor: colors.white,
                elevation: 4,
                borderRadius: 10,
                width: 60,
                paddingVertical: 5
              }}
              onPress={() => {
                this.props.navigation.navigate('ICourseRoadMap')
              }}
              />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>{this.state.data.name}</Text>  
            <View style={{backgroundColor: colors.white, elevation: 5, borderRadius: 10, marginTop: 10}}>
              <Image source={{uri: this.state.data.image}} style={{width: '100%', height: 300, borderRadius: 10}} />
            </View>
            <Text style={{fontSize: 18, fontFamily: constants.openSansRegular, marginTop: 10}}>{this.state.data.description} </Text>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 20}} >Niveles</Text>
              {this.state.data.levels.map((item, index) => {
                return (
                  <View key={index} style={{borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: (item.is_matriculated || item.can_matriculated) ? colors.tealishBlueIntense : colors.grayLight, marginBottom: 20}}>
                      <View>
                          <Text style={{fontFamily: constants.openSansBold, fontSize: 18}}>{item.name}</Text>
                          <Text style={{fontFamily: constants.openSansRegular, color:'#6D6D6D', fontSize: 14}}>{item.courses.length} temas</Text>
                      </View>
                      {
                        item.is_matriculated === false && 
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity onPress={() => {
                            if (item.can_matriculated === true){
                              this.setState({level: item, showMatriculated: true})
                            }
                          }} activeOpacity={1} style={{padding: 2, borderRadius: 10, backgroundColor: item.can_matriculated === true ? colors.bluePurple : colors.gray}}>
                            <Image source={images.plus} style={{resizeMode: 'contain', width: 35, height: 35}} /> 
                          </TouchableOpacity>
                        </View>
                      }
                  </View>
                )
              })}
            </View>
          </ScrollView>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    display: 'flex',
  },
})

export default ICourseScreen;