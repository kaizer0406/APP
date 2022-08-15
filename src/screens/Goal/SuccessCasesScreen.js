import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import ProfileCaseCard from '../../components/Card/ProfileCaseCard';


const routes = [
  {name: 'Basico', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: true},
  {name: 'Intermedio', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: false},
  {name: 'Avanzado', topics: ['Introducción al diseño UI', 'Diseño Web y App'], active: false},
]

export class SuccessCasesScreen extends Component {

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
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 20}}>Casos de exito</Text>  
                {routes.map((item, index, array) => (
                    <View key={index}>
                        <ProfileCaseCard item={item}  /> 
                        {index + 1 !== array.length && 
                            <View style={{height: 1, width: '100%', marginVertical: 10, backgroundColor: colors.tealishBlue}} />
                        }
                    </View>
                ))}
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

export default SuccessCasesScreen;