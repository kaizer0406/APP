import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Video from 'react-native-video'
import { colors } from '../../utils'
import Icon from 'react-native-vector-icons/FontAwesome5'
import YouTube from 'react-native-youtube';

const CourseVideo = ({uri, time}) => {

  const videoRef = useRef(null);

  const checkTime = () => {
    setInterval(async () => {
      const current = await videoRef.current.getCurrentTime()
      const duration = await videoRef.current.getDuration()
      console.log('current => ', current,  ' duration => ', duration)
      if (current == duration)
        clearInterval()
    }, 5000);
  }
  

  return (
        <View style={{backgroundColor: colors.white, elevation: 5, borderRadius: 10, marginTop: 10, height: 300, width: '100%'}}>
            <YouTube
              apiKey='API-KEY-YOUTUBE'
              ref={videoRef}
              onReady={() => {
                videoRef.current.seekTo(100)
                checkTime()
              }}
              onChangeState={(e) => console.log(e)}
              play
              style={{ alignSelf: 'stretch', height: 300, borderRadius: 10 }}
              videoId='QX-o0zzfH7I'
            />
        </View>
  )
}

export default CourseVideo

const styles = StyleSheet.create({})