import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { colors, constants, globals, images } from '../../utils'
import {  Text } from '@rneui/themed';
import {Button} from '@rneui/base'
import { apiLevel } from '../../services';
import { connect } from 'react-redux';
import { saveLevel } from '../../store/actions/level';

export class CourseDetailScreen extends Component {

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
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({data: this.props.level})
    });
  }

  componentWillUnmount() {
    if (this._unsubscribe != null)
      this._unsubscribe();
  }

  goToMicrocourse = (course) => {
    globals.course = course
    if (this.state.data.is_basic === true){
      this.props.navigation.navigate('CourseMicro')
    }else{
      this.props.navigation.navigate('CourseCard')
    }
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
          
            <Button
              TouchableComponent={({onPress})  => 
                <TouchableOpacity activeOpacity={1} onPress={onPress} style={{justifyContent: 'center',alignItems: 'center', flex:1, display: 'flex'}}>
                  <Image source={images.partners} style={{resizeMode: 'contain', width: 35, height: 35}} /> 
                </TouchableOpacity>
              }
              containerStyle={{
                backgroundColor: colors.white,
                elevation: 4,
                borderRadius: 10,
                width: 60,
                paddingVertical: 5
              }}
              onPress={() => {
                this.props.navigation.navigate('CParticipants', {id: this.state.data.id, name: `${this.state.data.speciality} - ${this.state.data.name}`})
              }}
              />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17}}>{this.state.data.speciality} - {this.state.data.name}</Text>  
            <View style={{backgroundColor: colors.white, elevation: 5, borderRadius: 10, marginTop: 10}}>
              <Image source={{uri: this.state.data.image}} style={{width: '100%', height: 300, borderRadius: 10}} />
            </View>
            <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginTop: 12, marginBottom: 20}} >Microcursos</Text>
              {
              this.state.data.courses.map((item, index) => (
                  <View key={index} style={{borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: colors.tealishBlueIntense, marginBottom: 20}}>
                      <View style={{justifyContent: 'space-around'}}>
                        <Text style={{fontFamily: constants.openSansBold, fontSize: 18, textAlignVertical: 'center', flexWrap: 'wrap', width: 270}}>{item.title}</Text>
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
              {this.state.data.certificates.length > 0 && 
                <Text style={{fontFamily: constants.openSansBold, fontSize: 20, marginBottom: 20}} >Si quisiera tener certificado tenemos las siguientes opciones:</Text>
              }
              {this.state.data.certificates.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => {Linking.openURL(item.uri)}} activeOpacity={5} key={index} style={{borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: colors.tealishBlue, marginBottom: 20}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image source={images.link} style={{height: 20, width: 20, resizeMode: 'contain', marginRight: 5}} />
                        </View>
                        <Text style={{fontFamily: constants.openSansSemiBold, fontSize: 14, flexWrap: 'wrap', textAlignVertical: 'center', width: 220}}>{item.title} </Text>
                      </View>
                      <Text style={{textAlignVertical: 'center', fontFamily: constants.openSansBold, fontSize: 16,textAlign: 'center'}}>{item.company}</Text>
                  </TouchableOpacity>
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