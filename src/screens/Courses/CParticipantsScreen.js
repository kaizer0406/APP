import { View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import PartnerCard from '../../components/Option/PartnerCard';
import { apiContacts, apiLevel } from '../../services';

export class CParticipantsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true, 
      data: [],
      name: ''
    };
  }

  renderItem = ({item, index, array}) => {
    console.log('globals => ' ,globals)
    const isYou = item.id === globals.id ? true : false
    console.log('item => ', item, isYou, item.id, globals.id)
    return (
      <PartnerCard key={index} item={{...item, isYou, onPress: async () => {
        if ( isYou === false ){
          const response = await apiContacts.getChatSession({id: item.id})
          const {error, message, result } = response
          if (error){
            ToastAndroid.show(message, ToastAndroid.SHORT)
          }else{
            ToastAndroid.show("have chat", ToastAndroid.SHORT)
            const {id} = result
            this.props.navigation.navigate('ChatSession', {
              chatId: id,
              personId: item.id, 
              fullName: `${item.name} ${item.last_name}`
            })
          }
        }
      }}} /> 
    )
  }

  getPartners = async () => {
    try {
      const id = this.props.route.params.id
      const name = this.props.route.params.name
      this.setState({name: name})
      const response = await apiLevel.getPartnersByLevel({id})
      const  {result, error, message}  = response
      if (error) {
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{ 
        this.setState({data: result.data, isLoad: false})
      }
    }catch (e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getPartners()
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
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
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>Compañeras</Text>  
            </View>
            {
              this.state.isLoad ? 
                <View style={{flex:1, justifyContent: 'center'}}>
                  <ActivityIndicator size="large" color={colors.magenta} /> 
                  </View>  
              :
              <>
                <View style={{marginHorizontal: 20}}>
                  <Text style={{fontSize: 16, fontFamily: constants.openSansSemiBold}}>{this.state.data.length} matriculadas</Text>  
                  <Text style={{fontSize: 16, fontFamily: constants.openSansSemiBold, marginBottom: 10}}>Curso: {this.state.name}</Text>  
                </View>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 20, paddingVertical:10 }}
                    ItemSeparatorComponent={() => <View style={{height: 10}} /> }
                    renderItem={this.renderItem}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                />
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
  },
})

export default CParticipantsScreen;