import React, { Component } from 'react'
import { View , StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import { Text } from '@rneui/themed'
import { colors, constants, images } from '../../utils'

const options = [
  {name: 'Meta Actual', route: 'CurrentGoal', image: images.current_goal},
  {name: 'Mis Logros', route: 'Cup', image: images.cup},
  {name: 'Mi Evolución', route: 'Evolution', image: images.evolution},
  {name: 'Cases de Exito', route: 'SuccessCases', image: images.success_cases},
]

export class GoalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.controller = new AbortController();
  }

  goToICourses(){
    this.props.navigation.navigate('ICourse')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 22, fontFamily: constants.openSansBold, marginHorizontal: 20, marginTop: 20}}>Mis objetivos</Text>
        {options.map((item, index) => (
          <Option item={{...item, onPress: () => {this.props.navigation.navigate(item.route)}}} key={index} /> 
        ))}
      </View>
    )
  }
}

const Option = ({item}) => {
  const{ onPress, image, name} = item
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={{backgroundColor: colors.white, flexDirection: 'row', padding: 15, marginTop:20, marginHorizontal:20, borderRadius: 10, elevation: 5}}>
      <Image source={image} style={{height: 50, width: 50 , resizeMode: 'contain'}} /> 
      <Text style={{fontSize: 18, fontFamily: constants.openSansBold, marginLeft: 10, textAlignVertical: 'center'}}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex:1, 
    padding: 0,
    display: 'flex'
  },
  title: {
    color: colors.pourple,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },

})

export default GoalScreen