import React, { useState,useEffect, useCallback } from "react";
import { Button, Text, View, StyleSheet, TextInput ,Image,SafeAreaView, ScrollView} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"

const Plant = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-LightItalic": require("./asset/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-SemiBold": require("./asset/fonts/Montserrat-SemiBold.ttf")
  })
  const [isThirsty, setIsThirsty] = useState(true);
  const [thirstyTime, setThirstyTime] = useState(3000);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  
  const onLayout = useCallback(async()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded])
  
if(!fontsLoaded) return null
  return (
    <View style>
      <View style={{flexDirection:'row'}}>
      <Image
        style={{height:70,width:70}}
        source={props.imageUri}
      />
    <View style={{marginLeft:8,justifyContent:"center" }} onLayout={onLayout}>
      <Text style={{fontFamily:"Montserrat-SemiBold"}}>
        I am {props.name}, and I am {isThirsty ? "thirsty" : "happy"}!
      </Text>
      <Text style={{marginTop:5,fontFamily:"Montserrat-LightItalic"}}>
        {props.description}
      </Text>
      </View>
      </View>
      <Button
        onPress={() => {
          setIsThirsty(false);
          setTimeout(
            () => {
              setIsThirsty(true)
            }, thirstyTime
          );
        }}
        disabled={!isThirsty}
        title={isThirsty ? "Please Water Me!" : "Thank you!"}
      />
      <TextInput
        style = {styles.inputBox}
        placeholder = 'Set time to water'
        onChangeText = { inputValue => setThirstyTime(inputValue) }
        defaultValue = { thirstyTime }
      />
    </View>
  );
}

const plants = [
  {
    id:1,
    name:'Herbs',
    description:"Herbs are short-sized plants with soft, green\ndelicate stems without woody tissues.",
 imageUri:{
  uri: 'https://static.wixstatic.com/media/2cd43b_6458034a47694c0bb079a3747622da64~mv2.png/v1/fill/w_260,h_185,q_90/2cd43b_6458034a47694c0bb079a3747622da64~mv2.png',
}
  },
  {
    id:2,
    name:'Shrubs',
    description:"Shrubs are medium-sized, woody plants taller\nthan herbs and shorter than a tree.",
    imageUri:{
      uri: 'https://toppng.com/uploads/preview/shrub-png-transparent-image-bushes-11562902510vhakeqedt7.png',
    }

  },
  {
    id:3,
    name:'Trees',
    description:"Trees are big and tall plants. They have very\nthick, woody and hard stems called the trunk",
    imageUri:{
      uri: 'https://i.pinimg.com/originals/67/90/c2/6790c2a6c0fa1e2cc0bd8ab9e678bcfd.png',
    }
  },
  {
    id:4,
    name:'Climbers',
    description:"Climbers have a very thin, long and weak stem\nwhich cannot stand upright.",
    imageUri:{
      uri: 'https://png.pngitem.com/pimgs/s/478-4786527_plants-png-free-download-flower-plants-png-transparent.png',
    }
  },
  {
    id:5,
    name:'Creepers',
    description:"Creepers, as the name suggests, are plants\nthat creep on the ground.",
    imageUri:{
      uri: 'https://w7.pngwing.com/pngs/210/376/png-transparent-creeper-plant-creeper-material.png',
    }
  }
];
const Plants = () => {
  return plants.map(
    (plant) => {
      return (
        <Plant key={plant.id} name={plant.name} description={plant.description} imageUri={plant.imageUri}/>
      );
    }
  );
}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 55,alignSelf:"center",fontFamily:"Montserrat-LightItalic"
    }}>
        Plants
      </Text>
      <ScrollView>
      {Plants()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   marginLeft:16,
   marginRight:16
  },
  inputBox:{
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical:10
  }
});

export default App;