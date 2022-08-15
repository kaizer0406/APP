import { View, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { colors, constants } from '../../utils'
import { Text, Switch } from '@rneui/themed';
import {Button} from '@rneui/base'

export class NotificationScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            courses: true,
            follow: true,
            advice: true
        }
    }

  render() {
    return (
      <View style={styles.container}>
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
        <Text style={{fontSize: 28, fontFamily: constants.openSansBold, marginTop: 17, marginBottom: 10}}>Notificaiones</Text>  
        <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.title}>Notificación de Cursos</Text>
                <View>
                    <Switch
                    color={colors.pinkishPurple}
                    trackColor={{false: colors.gray, true: colors.pinkishPurple}}
                    value={this.state.courses}
                    onValueChange={(value) => this.setState({courses: value})}
                    />
                </View>
            </View>
            <Text style={styles.description}>
            Te brindan informacion que debes avanzar el curso inscrito
            </Text>
        </View>
        <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.title}>Notificacion de Seguimiento</Text>
                <View>
                    <Switch
                    color={colors.pinkishPurple}
                    trackColor={{false: colors.gray, true: colors.pinkishPurple}}
                    value={this.state.follow}
                    onValueChange={(value) => this.setState({follow: value})}
                    />
                </View>
            </View>
            <Text style={styles.description}>
            Te ayudan a seguir tus metas y cumplir tus objetivos
            </Text>
        </View>
        <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.title}>Notificaciones de Consejos</Text>
                <View>
                    <Switch
                    color={colors.pinkishPurple}
                    trackColor={{false: colors.gray, true: colors.pinkishPurple}}
                    value={this.state.advice}
                    onValueChange={(value) => this.setState({advice: value})}
                    />
                </View>
            </View>
            <Text style={styles.description}>
            Estas notificaciones te ofreceran consejos o recomendaciones para ayudar a mejorar tu empoderamiento
            </Text>
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
  title: {
    fontFamily: constants.openSansBold, fontSize: 20
  },
  description: {
    fontFamily:constants.openSansSemiBold, fontSize: 16, marginTop: 10, marginRight: 50
  }
})

export default NotificationScreen;