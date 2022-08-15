import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import { Text } from '@rneui/themed';
import {Button} from '@rneui/base'


const routes = [
  {name: 'Basico', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: true},
  {name: 'Intermedio', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: false},
  {name: 'Avanzado', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: false},
]

export class ICourseRoadMapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{}}>
          <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 20}}>
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
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>{globals.speciality.name}</Text>  
            <View style={{backgroundColor: colors.white, elevation: 5, borderRadius: 10, marginTop: 10}}>
              <Image source={{uri: globals.speciality.image}} style={{width: '100%', height: 300, borderRadius: 10}} />
            </View>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 20}} >Ruta de aprendizaje</Text>
              {globals.speciality.levels.map((item, index) => {
                return (
                  <View key={index.toString()} style={{marginBottom: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={images.flag} style={item.is_matriculated ? styles.imageEnable : styles.imageDisable} />
                          <Text style={{fontSize: 22, fontFamily:constants.openSansBold, textAlignVertical: 'center', marginLeft: 10 }}>{item.name}</Text>
                      </View>
                      <View style={{marginLeft: 50}}>
                          {item.courses.map((course, iCourse) => 
                          (
                            <Text key={iCourse.toString()} style={{fontSize: 18, fontFamily: constants.openSansRegular}}>* {course.title}</Text> 
                          ))}
                      </View>
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
  imageEnable: {
    resizeMode: 'contain', width: 40, height: 40
  },
  imageDisable: {
    resizeMode: 'contain', width: 40, height: 40, tintColor: colors.grayLight
  }
})

export default ICourseRoadMapScreen;