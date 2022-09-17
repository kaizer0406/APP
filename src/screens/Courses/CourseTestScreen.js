import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { apiLevel } from '../../services';
import TestRadio from '../../components/Radio/TestRadio';
import LoadingModal from '../../components/Modal/LoadingModal';
import TestResultModal from '../../components/Modal/TestResultModal';

export class CourseTestScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true, 
      data: [],
      isLoadService: false,
      showScore: false,
      score: 0
    };
  }

  getTest = () => {
    const data = globals.test
    data.map((item) => {
      item.result = ''
    })
    this.setState({isLoad: false, data: data})
  }

  componentDidMount = () => {
    this.getTest()
  }

  changeResult = (index, result) => {
    let data = this.state.data
    data[index].result = result
  }

  saveResult = async () => {
    this.setState({isLoadService: true})
    let isApproved = true
    let points = 0
    const data = this.state.data
    data.forEach(item => {
      if (item.answer !== item.result){
        isApproved = false
      }else{
        points++
      }
    });
    const questions = data.length
    const score = points*20/questions;
    this.setState({score: score})
    const response = await apiLevel.sendTest({isApproved: isApproved, points: score, specialityLevelId: globals.level.id})
    this.setState({isLoadService: true})
    const {message, error , result} = response
    if (score === 20) globals.isApproved = true
    console.log('globals test =>', globals)
    if (!error)
      this.setState({isLoadService: false}, () => { this.setState({showScore: true})})
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
        <LoadingModal isVisible={this.state.isLoadService} />
        <TestResultModal score={this.state.score} isVisible={this.state.showScore} onClose={() => {
          this.setState({showScore:false}, () => {this.props.navigation.goBack()})
          }
          }  />
        <ScrollView style={{}}>
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
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginVertical: 17}}>Prueba</Text>  
              {
                this.state.data.map((item, index, array) => 
                  <TestRadio answer={item.answer} onPress={(result) => this.changeResult(index, result)} question={item.question} options={item.options} key={index} />
                )
              }
               <Button
                  title={'Enviar'}
                  onPress={() => {
                    this.saveResult()
                  }}
                  titleStyle={{
                    color:colors.white,
                    fontSize: 18, 
                    marginVertical: 5,
                    fontFamily: constants.openSansBold
                  }}
                  buttonStyle={{
                    backgroundColor: colors.bluePurple
                  }}
                  containerStyle={{
                    width: '100%',
                    marginVertical: 20,
                    borderRadius: 10, 
                  }}
                />
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

export default CourseTestScreen