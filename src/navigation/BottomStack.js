import React, { useEffect, useRef } from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Animated, {useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, withTiming, withSpring} from 'react-native-reanimated'
import ChatScreen from '../screens/Chat/ChatScreen'
import GoalScreen from '../screens/Goal/GoalScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import { colors, images } from '../utils'
import InterestScreen from '../screens/Interest/InterestScreen'
import CoursesScreen from '../screens/Courses/CoursesScreen'

const Tab = createBottomTabNavigator()

const tabArr =[
    {route: 'Interest', icon: images.icon_interest, component: InterestScreen},
    {route: 'Course', icon: images.icon_course, component: CoursesScreen},
    {route: 'Goal', icon: images.icon_goal, component: GoalScreen},
    {route: 'Chat', icon: images.icon_chat, component: ChatScreen},
    {route: 'Settings', icon: images.icon_settings, component: SettingsScreen}
]

const TabButton = (props) => {
    const {item, onPress, accessibilityState} = props
    const focused = accessibilityState.selected

    const animation = useSharedValue(0)
    const rotation = useDerivedValue(() => {
        return interpolate(animation.value, [0,360], [0,360])
    })

    const sizeIcon = useSharedValue(25)

    const style = useAnimatedStyle(() => {
        return {
            width: sizeIcon.value,
            height: sizeIcon.value,
            tintColor: focused ? colors.bluePurple : '#A6A6A6',
            transform: [
                {rotate: rotation.value + 'deg'}
            ]
        }
    })

    useEffect(() => {
        if (focused){
            animation.value = withTiming(360, {duration: 1000})
            sizeIcon.value = withSpring(30)
        }else{
            animation.value = withTiming(0, {duration: 1000})
            sizeIcon.value = withSpring(25)
        }
    }, [focused])

    return (
        <TouchableOpacity 
        onPress={onPress}
        activeOpacity={1}
        style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
            <Animated.Image resizeMode="contain" source={item.icon} style={style} /> 
        </TouchableOpacity>
    )
}

const BottomStack = () => {

    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60, 
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 10
                }
            }}
        >
            {tabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index.toString()} name={item.route} component={item.component}  
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({color, focused}) => (
                                <Image source={item.icon} style={{ 
                                    width: 25,
                                    height: 25,
                                    resizeMode: 'contain',
                                    tintColor: focused ? colors.bluePurple : '#A6A6A6'
                                }} /> 
                            ),
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    /> 
                )
            })}
        </Tab.Navigator>
    )
}

export default BottomStack