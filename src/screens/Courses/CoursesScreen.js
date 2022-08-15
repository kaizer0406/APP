import React, { Component } from 'react'
import { View , StyleSheet, Image, FlatList, ToastAndroid, ActivityIndicator} from 'react-native'
import { Text } from '@rneui/themed'
import { colors, constants, images } from '../../utils'
import CourseCard from '../../components/Option/CourseCard'
import { apiLevel } from '../../services'

export class CoursesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      data: []
    };
    // this.controller = new AbortController();
  }

  goToICourses(){
    this.props.navigation.navigate('ICourse')
  }

  renderItem = ({item, index, array}) => {
    console.log('level => ', item)
    return (
      <CourseCard key={index} item={{...item, onPress: () => {this.props.navigation.navigate('CourseDetail', {id: item.id})}}} /> 
    )
  }

  getLevelsMatriculated = async () => {
    try {
      const response = await apiLevel.getMatriculatedLevel()
      const {error, message, result} = response
      if (error){
        this.setState({isLoad: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)  
      }else{
        this.setState({isLoad: false, data: result.data})
        // ToastAndroid.show(e, ToasstAndroid.SHORT)
      }
    }catch(e){
      this.setState({isLoad: false})
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentDidMount = async () => {
    await this.getLevelsMatriculated()
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getLevelsMatriculated()
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 22, fontFamily: constants.openSansBold, marginHorizontal: 20, marginTop: 20}}>Mis Cursos</Text>
        {
          this.state.isLoad ? 
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={colors.magenta} />
          </View>
          :
          <FlatList 
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical:20 }}
          ItemSeparatorComponent={() => <View style={{height: 20}} /> }
          renderItem={this.renderItem}
          data={this.state.data}
          keyExtractor={(item, index) => index}
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

export default CoursesScreen