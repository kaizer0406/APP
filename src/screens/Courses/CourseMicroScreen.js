import { View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import YouTube from 'react-native-youtube';
import apiCourse from '../../services/apiCourse';
import { connect } from 'react-redux';
import { saveLevel } from '../../store/actions/level';


export class CourseMicroScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      data: {},
    };
    this.videoRef = React.createRef();
    this.checkInterval = null
  }

  componentDidMount = () => {
    const course = this.props.level.courses.find(item => item.id === globals.course.id)
    this.setState({data: course})
    console.log('course => ', course)
    this.setState({isLoad: false})
  }

  checkTime = () => {
    this.checkInterval =  setInterval(async () => {
      const current = await this.videoRef.current.getCurrentTime()
      const duration = await this.videoRef.current.getDuration()
      console.log('current => ', current,  ' duration => ', duration)
      if (current == duration){
        await this.saveTime(current, true)
        clearInterval(this.checkInterval)
      } else {
        await this.saveTime(current, false)
      }
    }, 5000);
  }

  saveTime = async (time, isFinish) => {
    try {
      const response = await apiCourse.saveTimeVideo({id: this.state.data.id, time, isFinish })
      console.log('save time => ', response)
      const {error, message} = response
      if(error){
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }else {
        const level = this.props.level
        console.log('level => ', level)
        level.courses.forEach(item => {
          if (item.id === this.state.data.id){
            item.time = time
            item.is_finish = isFinish
          }
        });
        console.log('update course => ', level.courses)
        this.props.saveLevel(level)
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
    }catch (e){
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentWillUnmount = () => {
    if (this.checkInterval !== null)
      clearInterval(this.checkInterval)
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.isLoad ? 
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
            <View style={{flex: 1, justifyContent: 'center'}}> 
              <ActivityIndicator size="large" color={colors.magenta} /> 
            </View>
          </View>
          :
        <ScrollView>
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
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>{this.state.data.title}</Text>  
            <View style={{backgroundColor: colors.white, elevation: 5, borderRadius: 10, marginTop: 10, height: 300, width: '100%'}}>
              <YouTube
                apiKey='AIzaSyAmDW7Q_iIRo8teA94arZB48KfUOmALZ_E'
                ref={this.videoRef}
                onReady={() => {
                  if (this.state.data.time !== 0 && this.state.data.is_finish === false){
                    this.videoRef.current.seekTo(this.state.data.time)
                  }
                }}
                onChangeState={async (e) => {
                  if (this.state.data.is_finish === false){
                    if (e.state === 'playing'){
                      this.checkTime()
                    }else{
                      if (this.checkInterval !== null){
                        clearInterval(this.checkInterval)
                        this.checkInterval = null
                      }
                      if (e.state === 'ended'){
                        const current = await this.videoRef.current.getDuration()
                        await this.saveTime(current, true)
                      }
                    }
                  } 
                }}
                play
                style={{ alignSelf: 'stretch', height: 300, borderRadius: 10 }}
                videoId={this.state.data.video}
              />
            </View>
            <Text style={{fontSize: 16, fontFamily: constants.openSansSemiBold, marginTop: 10, textAlign: 'justify'}}>{this.state.data.description}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseMicroScreen);