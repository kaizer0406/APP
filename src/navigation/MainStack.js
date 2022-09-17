import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import ICourseScreen from '../screens/Interest/ICourseScreen'
import ICourseRoadMapScreen from '../screens/Interest/ICourseRoadMapScreen'
import BottomStack from './BottomStack'
import CourseDetailScreen from '../screens/Courses/CourseDetailScreen'
import CParticipantsScreen from '../screens/Courses/CParticipantsScreen'
import CourseMicroScreen from '../screens/Courses/CourseMicroScreen'
import CupScreen from '../screens/Goal/CupScreen'
import CurrentGoalScreen from '../screens/Goal/CurrentGoalScreen'
import EvolutionScreen from '../screens/Goal/EvolutionScreen'
import SuccessCasesScreen from '../screens/Goal/SuccessCasesScreen'
import AboutUsScreen from '../screens/Settings/AboutUsScreen'
import ContactScreen from '../screens/Settings/ContactScreen'
import NotificationScreen from '../screens/Settings/NotificationScreen'
import PrivacyScreen from '../screens/Settings/PrivacyScreen'
import ProfileScreen from '../screens/Settings/ProfileScreen'
import ChatSessionScreen from '../screens/Chat/ChatSessionScreen'
import CourseCardScreen from '../screens/Courses/CourseCardScreen'
import ChatBotSessionScreen from '../screens/Chat/ChatBotSessionScreen'
import CourseTestScreen from '../screens/Courses/CourseTestScreen'
import InterestSearchScreen from '../screens/Interest/InterestSearchScreen'


const Stack = createStackNavigator()

const MainStack = () => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
            <Stack.Screen name='BottomStack' component={BottomStack} />
            <Stack.Screen name='ICourse' component={ICourseScreen} />
            <Stack.Screen name='ICourseRoadMap' component={ICourseRoadMapScreen} />
            <Stack.Screen name='CourseDetail' component={CourseDetailScreen} />
            <Stack.Screen name='CourseTest' component={CourseTestScreen} />
            <Stack.Screen name='CParticipants' component={CParticipantsScreen} />
            <Stack.Screen name='CourseMicro' component={CourseMicroScreen} />
            <Stack.Screen name='Cup' component={CupScreen} />
            <Stack.Screen name='InterestSearch' component={InterestSearchScreen} />
            <Stack.Screen name='CurrentGoal' component={CurrentGoalScreen} />
            <Stack.Screen name='Evolution' component={EvolutionScreen} />
            <Stack.Screen name='SuccessCases' component={SuccessCasesScreen} />
            <Stack.Screen name='AboutUs' component={AboutUsScreen} />
            <Stack.Screen name='Contact' component={ContactScreen} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
            <Stack.Screen name='Privacy' component={PrivacyScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='ChatSession' component={ChatSessionScreen} />
            <Stack.Screen name='ChatBotSession' component={ChatBotSessionScreen} />
            <Stack.Screen name='CourseCard' component={CourseCardScreen} />
        </Stack.Navigator>
    )

}

export default MainStack