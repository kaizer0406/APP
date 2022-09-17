import React, { Component } from 'react'
import { View , StyleSheet, Image, FlatList, ToastAndroid, ActivityIndicator} from 'react-native'
import { Input, Text } from '@rneui/themed'
import { colors, constants, globals, images } from '../../utils'
import EspecialityItem from '../../components/Option/EspecialityItem'
import { apiSpeciality } from '../../services'
import { Button } from '@rneui/base'
import { TouchableOpacity } from 'react-native'

export class InterestSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      data: [],
      name: ''
    };
    // this.controller = new AbortController();
  }

  goToICourses(){
    this.props.navigation.navigate('ICourse')
  }

  renderItem = ({item, index, array}) => {
    return (
      <EspecialityItem key={index.toString()} item={{...item, onPress: () => {this.props.navigation.navigate('ICourse', {id: item.id})}}} /> 
    )
  }

  getSpecialities = async () => {
    try {
      this.setState({isLoad: true})
      const response = await apiSpeciality.getAll({name: this.state.name})
      const {message, result, error} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        this.setState({isLoad: false, data: result.data})
      }
    }catch(e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getSpecialities()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20, marginTop: 20}}>
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
        <View style={{flexDirection: 'row', marginHorizontal: 20, marginBottom: 5, marginTop: 15}}>
          <View style={{borderRadius: 10, backgroundColor: colors.white, elevation: 3, flex: 1, alignItems: 'center'}}>
            <Input 
            value={this.state.name} 
            onChangeText={(text) => {this.setState({name:text})}} 
            placeholder='Buscar........'
            inputStyle={{fontFamily: constants.openSansRegular, fontSize: 16, marginBottom:0}} 
            containerStyle={{borderWidth: 0, bottom: -12}}
            inputContainerStyle={{borderBottomWidth: 0, padding: 0, height: 30, paddingLeft: 0}}
            /> 
          </View>
          <View style={{width: 20}} />
          <TouchableOpacity onPress={() => {this.getSpecialities()}} activeOpacity={1} style={{borderRadius: 10, backgroundColor: colors.white, paddingHorizontal: 15, elevation: 3, justifyContent: 'center'}}>
            <Image source={images.icon_search} style={{resizeMode: 'contain', width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
        {this.state.isLoad ? 
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={colors.magenta} />
          </View>
        :
        <FlatList 
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical:10, paddingBottom:100 }}
        ItemSeparatorComponent={() => <View style={{height: 20}} /> }
        renderItem={this.renderItem}
        ListEmptyComponent={() => 
          <View style={{flex: 1, justifyContent: 'center', padding:30}}>
            <Text style={{fontSize: 18, fontFamily: constants.openSansBold, textAlign: 'center'}}>No se encontro el curso que estas buscando. 😞</Text>
          </View>
        }
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}
          /> 
        }
      </View>
    )
  }
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

export default InterestSearchScreen