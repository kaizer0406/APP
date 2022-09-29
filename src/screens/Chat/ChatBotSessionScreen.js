import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import {Button} from '@rneui/base'
import { Input, Text } from '@rneui/themed';
import AWS from 'aws-sdk/dist/aws-sdk-react-native'
import { colors, constants, images } from '../../utils'
import ChatCard from '../../components/Card/ChatCard';


// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: '47b68259-db0a-4278-8971-19af63300bd1',
})
AWS.config.update({
  secretAccessKey: '+tBcHzdOe/drNV2OxJPUXOWDFH+sMMJ/H7r/1GVz',
  accessKeyId: 'AKIAYOFQ4WBRVVMLEABY',
  region: "us-east-1",
});
let lexRunTime = new AWS.LexRuntime()
let lexUserId = 'mediumBot' + Date.now()

export class ChatBotSessionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      chats: [],
      inputEnabled: true,
    }
  }
  // Sends Text to the lex runtime
  handleTextSubmit() {
    let inputText = this.state.userInput.trim()
    if (inputText !== '')
      this.showRequest(inputText)
  }
  // Populates screen with user inputted message
  showRequest(inputText) {
    // Add text input to messages in state
    let oldChats = Object.assign([], this.state.chats)
    oldChats.push({ from: 'user', msg: inputText })
    this.setState({
      chats: oldChats,
      userInput: '',
      inputEnabled: false
    })
    this.sendToLex(inputText)

  }
  // Responsible for sending message to lex
  sendToLex(message) {
    let params = {
      botAlias: '$LATEST',
      botName: 'CoachMotivacional',
      inputText: message,
      userId: lexUserId,
    }
    lexRunTime.postText(params, (err, data) => {
      if (err) {
        // TODO SHOW ERROR ON MESSAGES
        console.log('error', err)
      }
      if (data) {
        console.log('data => ', data)
        this.showResponse(data)
      }
    })
  }
  showResponse(lexResponse) {
    let lexMessage = lexResponse.message
    let oldChats = Object.assign([], this.state.chats)
    oldChats.push({ from: 'bot', msg: lexMessage })
    this.setState({
      chats: oldChats,
      inputEnabled: true
    })
  }

  renderItem = ({item, index, array}) => {

    let info = item
    info.is_transmitter = item.from === 'bot' ? false : true
    info.message = item.msg

    return (
      <ChatCard key={index} item={info} /> 
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 17, marginBottom: 20 }}>
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
              marginRight: 20
            }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          />
          <View style={{ justifyContent: 'center' }}>
            <Image source={images.woman_chat} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 10 }} />
          </View>
          <Text style={{ fontSize: 28, fontFamily: constants.openSansBold, textAlignVertical: 'center' }}>Bot Sofia</Text>
        </View>
        <FlatList
          // inverted
          contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 20 }}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={this.renderItem}
          data={this.state.chats}
          extraData={this.state.chats}
          keyExtractor={(item, index) => index}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ elevation: 5, backgroundColor: colors.white, borderRadius: 10, flex: 1 }}>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0, paddingBottom: 0, paddingTop: 20, height: 30, paddingLeft: 0 }}
              autoFocus={true}
              value={this.state.userInput}
              placeholder='Escribe tu mensaje'
              onSubmitEditing={this.handleTextSubmit.bind(this)}
              onChangeText={(text) => this.setState({ userInput: text })}
            />
          </View>
          <View style={{ width: 10 }} />
          <TouchableOpacity onPress={this.handleTextSubmit.bind(this)} activeOpacity={1} style={{ backgroundColor: colors.white, elevation: 5, borderRadius: 10, justifyContent: 'center', padding: 10 }}>
            <Image source={images.send} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
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


export default ChatBotSessionScreen