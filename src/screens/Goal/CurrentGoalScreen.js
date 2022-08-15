import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import apiCourse from '../../services/apiCourse';
import PieChart from 'react-native-pie-chart';


const microCourses = [
  {name: '¿Qué es diseño UI?', course: 'Diseño UX'},
  {name: 'Diseñas para web y apps', course: 'Diseño UX'},
]

export class CurrentGoalScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      percentComplete: 100,
      percentIncomplete: 0,
      courses: []
    };
  }

  getStatus = async () => {
    try { 
      const response = await apiCourse.getStatus()
      const {error, result, message} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)  
      }else{
        const { percent_complete, percent_incomplete, courses} = result
        console.log('response => ', response)
        this.setState({percentComplete: percent_complete, percentIncomplete: 100 - percent_complete, courses})
        this.setState({isLoad: false})
      }
    } catch (e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    this.getStatus()
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getStatus()
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoad ? 
        <>
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
      </View>
      <View style={{flex: 1, justifyContent: 'center', display: 'flex'}}>
        <ActivityIndicator color={colors.magenta} size="large" /> 
      </View>
      </>
        :
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
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Meta Actual</Text>  
            <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 10}} >Porcentaje Promedio:</Text>
            <View style={{backgroundColor: colors.white, marginTop: 10, alignItems: 'center'}}>
              <PieChart
                widthAndHeight={250}
                series={[this.state.percentIncomplete*10, this.state.percentComplete*10,]}
                sliceColor={[colors.tealishBlueIntense, colors.bluePurple]}
              />
              {/* <Image source={images.percent} style={{width: '100%', height: 250, resizeMode: 'contain'}} /> */}
            </View>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 18, marginTop: 20, marginBottom: 0}}><View style={{borderRadius: 30, width: 13, height: 13, backgroundColor: colors.bluePurple}}/> {this.state.percentComplete}% cursos completados</Text>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 18, marginTop: 0, marginBottom: 20}}><View style={{borderRadius: 30, width: 13, height: 13, backgroundColor: colors.tealishBlueIntense}}/> {this.state.percentIncomplete}% cursos no completados</Text>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 18, marginTop: 12, marginBottom: 20}}>Microcursos que faltan culminar:</Text>
              {this.state.courses.map((item, index) => {
                return (
                  <View key={index} style={{borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: colors.tealishBlueIntense, marginBottom: 20}}>
                      <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{fontFamily: constants.openSansBold, fontSize: 18, textAlignVertical: 'center', flexWrap: 'wrap', width: 270}}>{item.title}</Text>
                        <Text style={{color: '#7B7B7B', fontFamily:constants.openSansSemiBold, fontSize: 16}}>{item.speciality}</Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                          this.props.navigation.navigate('CourseDetail', {id: item.speciality_level_id})
                        }} activeOpacity={1} style={{padding: 2, borderRadius: 10, backgroundColor: colors.bluePurple }}>
                          <Image source={images.arrow_right} style={{resizeMode: 'contain', width: 30, height: 30, margin: 5}} /> 
                        </TouchableOpacity>
                      </View>
                  </View>
                )
              })}
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
    flex: 1,
    display: 'flex',
  },
})

export default CurrentGoalScreen;