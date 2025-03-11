import { View, Text } from 'react-native'
import React from 'react'
import Otpverification from './optverficationcomponent'


const OtpVerificationpage = ({route}) => {
  return (
    <View>
  <Otpverification
  page={'Login'}
  email={route.params.email}
  type={'registration'}


/>
    </View>
  )
}

export default OtpVerificationpage