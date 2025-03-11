import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableHighlight,
  Text,
} from 'react-native';
import { ArViewerView } from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';

export default function AR() {
  const [localModelPath, setLocalModelPath] = useState();
 
  const ref = useRef();

  const loadPath = async () => {
    const modelSrc =
      Platform.OS === 'android'
        ? 'https://github.com/Falcx111/Modals/blob/main/3D%20Modals/3D%20modals/Burger/Burger.glb?raw=true'
        : 'https://github.com/Falcx111/Modals/blob/main/3D%20Modals/3D%20modals/Burger/dice.usdz?raw=true';
    const modelPath = `${RNFS.DocumentDirectoryPath}/model.${
      Platform.OS === 'android' ? 'glb' : 'usdz'
    }`;
    const exists = await RNFS.exists(modelPath);
    if (!exists) {
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: modelPath,
      }).promise;
    }

    setLocalModelPath(modelPath);
  };

  useEffect(() => {
    loadPath();
  }, []);


  const reset = () => {
    ref.current?.reset();
  };

  const rotate = () => {
    ref.current?.rotate(0, 25, 0);
  };



  return (
    <View style={styles.container}>
      {localModelPath && (
        <ArViewerView
          model={localModelPath}
          style={styles.arView}
          disableInstantPlacement
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          ref={ref}
        />
      )}
      <View style={styles.footer}>
       
        <TouchableHighlight onPress={reset} style={styles.button}>
          <Text>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={rotate} style={styles.button}>
          <Text>Rotate</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arView: {
    flex: 1,
  },
  footer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    
  },
  button: {
    borderColor: '#df2020',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
  },
});

