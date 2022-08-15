import React,  {Component} from 'react';
import { ActivityIndicator, Image, Linking, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CardsSwipe from 'react-native-cards-swipe';
import { connect } from 'react-redux';
import { saveLevel } from '../../store/actions/level';
import {  Text, LinearProgress} from '@rneui/themed'
import {Button} from '@rneui/base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, constants, globals, images } from '../../utils';
import apiCourse from '../../services/apiCourse';

export class CourseCardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      data: {},
      percent: 0
    };
    this.swiperRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({data: globals.course }, () => { this.setState({isLoad: false})})
    const orderStart = globals.course.order_lesson === globals.course.lessons.length ? 1 : globals.course.order_lesson
    this.updatePercent(orderStart)
  }

  updatePercent = async (order) => {
    await this.saveCard(order)
    const lessons = globals.course.lessons
    if (order === lessons.length){
      this.setState({percent: 1})
    }else{
      if (order === 1){
        this.setState({percent: 0})
      }else{
        const part = 1 / (lessons.length - 1)  
        this.setState({percent: part * (order - 1)})
      }
    }
  }

  saveCard = async (order) => {
    try {      
      const isFinish = globals.course.is_finish === true ? true : order === globals.course.lessons.length 
      const response = await apiCourse.saveCardLesson({order: order, id: globals.course.id, isFinish: isFinish})
      const { error, message } = response
      if (error){
        ToastAndroid.show(message, ToastAndroid.SHORT)
      } else {
        const level = this.props.level
        level.courses.forEach(item => {
          if (item.id === globals.course.id){
            item.order_lesson = order
            item.is_finish = isFinish
          }
        });
        this.props.saveLevel(level)
        ToastAndroid.show('card saved', ToastAndroid.SHORT)
      }
    } catch(e) {
      ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  componentWillUnmount = () => {
    if (this.swiperRef !== null)
      this.swiperRef = null
  }

  render() {
      return (
          <View style={styles.container}>
            <View style={{margin: 20, flexDirection: 'row'}}>
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
              <Text style={{marginLeft: 20, fontSize: 24, fontFamily: constants.openSansBold, textAlignVertical: 'center'}} >{globals.course.title}</Text>
          </View>
              {
                this.state.isLoad ? 
                  <View style={{flex: 1, justifyContent: 'center'}}> 
                    <ActivityIndicator size="large" color={colors.magenta} /> 
                  </View>
                :
                <View style={{flex:1, display: 'flex', justifyContent: 'center'}}>
                  <View style={{paddingHorizontal: 20}}>
                    <LinearProgress
                      style={{ marginVertical: 10 }}
                      color={colors.bluePurple}
                      value={this.state.percent}
                      variant="determinate"
                    /> 
                  </View>
                  <CardsSwipe
                    ref={this.swiperRef}
                    rotationAngle={5}
                    loop={false}
                    renderNoMoreCard={() => (
                      <View style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                        <Text style={{fontSize: 22, fontFamily: constants.openSansBold, textAlign:'center'}} >Curso Finalizado</Text>
                      </View>
                    )}
                    initialIndex={globals.course.order_lesson === globals.course.lessons.length ? 0 : globals.course.order_lesson - 1}
                    animDuration={500}
                    onSwiped={async (index) => { 
                      const before = index + 1
                      const now = index + 2
                      console.log('change => ', now)
                      if (before === globals.course.lessons.length){
                        if (globals.course.lessons[index].is_link === true){
                          Linking.openURL(globals.course.lessons[index].link)
                        }else{
                          this.props.navigation.goBack()
                        }
                      }else{
                        await this.updatePercent(now)
                      }
                    }}
                    cards={this.state.data.lessons}
                    cardContainerStyle={styles.cardContainer}
                    renderCard={(item) => (
                      <Card item={item} /> 
                    )}
                  />
                  <View style={{flexDirection: 'row', justifyContent:'flex-end'}} > 
                      {/* <TouchableOpacity style={{padding: 20}} activeOpacity={1} onPress={() => {
                        // this.swiperRef.current.backCard()
                      }}>
                        <Icon name='angle-left' size={40} color={colors.black} /> 
                      </TouchableOpacity> */}
                      <TouchableOpacity style={{padding: 20}} activeOpacity={1} onPress={() => {
                        this.swiperRef.current.swipeRight()
                      }}>
                        <Icon name='angle-right' size={40} color={colors.black} /> 
                      </TouchableOpacity>
                  </View>
                </View>
              }
          </View>
      );
  }
}

const Card = ({item}) => {
  const {id, title, description, icon, is_link, link, order} = item
  return (
    <View style={{flex: 1 , display: 'flex', backgroundColor: colors.white, borderRadius: 10, elevation: 5}}>
      <View style={{marginTop: 40, paddingHorizontal: 10, flexDirection: 'row'}}>
        {icon !== '' && 
          <Icon name={icon} size={30} color={colors.black} style={{marginRight: 10}} /> 
        }
        <Text style={{ fontSize: 20, fontFamily: constants.openSansBold}}>{title}</Text>
      </View>
      <View style={{paddingHorizontal: 10, justifyContent: 'center', flex:1}}>
        <Text style={{fontSize: 16, fontFamily: constants.openSansSemiBold}} >{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    display: 'flex',
  },
  cardContainer: {
   flex:1, 
   paddingHorizontal: 20,
   paddingVertical:20
    // backgroundColor: '#000'
  },
  card: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
});

const mapStateToProps = (state) => {
  return {
    level: state.level.level,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLevel: (level) => dispatch(saveLevel(level)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCardScreen);