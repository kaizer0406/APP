import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { storage } from './src/utils';
import { connect } from 'react-redux';
import { signIn, signOut } from './src/store/actions/auth';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';

const Stack = createNativeStackNavigator();

class App extends Component {
  state = {
    userToken: this.props.userToken,
    loading: true
  };

  async componentDidMount() {

    const token = await storage.getToken();
    if (token === '') {
      this.props.signOut();
    } else {
      await storage.getProfile();
      this.props.signIn(token);
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }

  render() {
    return (
        <Stack.Navigator>
          {this.props.userToken === '' ? (
            <Stack.Screen
              name="Auth"
              options={{ headerShown: false }}
              component={AuthStack}
            />
          ) : (
              <Stack.Screen
                name="Main"
                options={{ headerShown: false }}
                component={MainStack}
              />
            )}
        </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => dispatch(signIn(token)),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
