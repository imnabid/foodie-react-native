import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
WebBrowser.maybeCompleteAuthSession();
import React from 'react'
import { Button } from 'react-native-paper';

const Dummy = () => {
    const [userInfo, setUserInfo] = useState(null)
  const [req, res, promptAsync] = Google.useAuthRequest({
    androidClientId: "15510434448-3spnpoa4lflj67cgg08sia7dubvse3bp.apps.googleusercontent.com",
    iosClientId: "15510434448-fn6a4r77fd8pit9vqc6ksbjttfi62nvg.apps.googleusercontent.com",
    webClientId:"15510434448-1vh18jp74efujimrufttimq6toodqtnc.apps.googleusercontent.com"
  })

  return (
    <Button onPress={promptAsync}>click</Button>
  )
}

export default Dummy
