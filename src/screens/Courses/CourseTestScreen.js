import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { apiLevel } from '../../services';
import { connect } from 'react-redux';
import { saveLevel } from '../../store/actions/level';
import YouTube from 'react-native-youtube';
import { useRef } from 'react';

export class CourseTestScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true, 
      data: {}
    };
  }

  getLevel = async () => {
    try {
      const id = this.props.route.params.id
      const response = await apiLevel.getMatriculatedLevelById({id: id})
      const {error, message, result} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else{
        this.props.saveLevel(result)
        globals.level = result
        this.setState({data: result})
        this.setState({isLoad: false})
      }
    }catch (e){
      // this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getLevel()
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
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>{this.state.data.speciality} - {this.state.data.name} - TEST</Text>  
            {
            this.state.data.courses.map((item, index) => (
                <View key={index} style={{borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: colors.tealishBlueIntense, marginBottom: 20}}>
                    <View style={{justifyContent: 'space-around'}}>
                      <Text style={{fontFamily: constants.openSansBold, fontSize: 18, textAlignVertical: 'center', flexWrap: 'wrap', width: 270}}>{item.title}</Text>
                      <Text style={{fontFamily: constants.openSansBold, fontSize: 12, textAlignVertical: 'top', flexWrap: 'wrap', fontWeight: '700', width: 270}}>{item.topic}</Text>
                      {item.is_finish && 
                        <Text style={{fontFamily: constants.openSansBold, fontSize: 14, color: colors.white }}>TERMINADO</Text>
                      }
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity onPress={() => {
                        this.goToMicrocourse(item)
                      }} activeOpacity={1} style={{padding: 2, borderRadius: 10, backgroundColor: colors.bluePurple }}>
                        <Image source={images.arrow_right} style={{resizeMode: 'contain', width: 30, height: 30, margin: 5}} /> 
                      </TouchableOpacity>
                    </View>
                </View>
              )
            )}
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

const mapStateToProps = (state) => {
  console.log('state => ', state.level.level.courses)
  return {
    level: state.level.level,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLevel: (level) => dispatch(saveLevel(level)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailScreen);