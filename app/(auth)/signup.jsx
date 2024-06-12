import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const Signup = () => {

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = async() =>{
    if(!fullname || !email || !password){
      alert('please fill in all the inputs')
    }
    try{
      const api = await fetch('http://10.5.220.176:5000/api/v1/user/register', {
        method: 'POST',
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          password: password
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await api.json()
      if(data){
        console.log("gotchuuu");
      }
      router.push("search")
    }
    catch(err){
      console.log("the catch error",err)
    }

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          marginTop: 160,
        }}
      >
        <View className="h-full bg-white w-full rounded-t-[25px] flex items-center px-5 py-6">
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-4xl font-bold">
              Supa
              <Text className="text-primary">Menu</Text>
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col items-center gap-2 py-5">
            <Text className="font-bold text-secondary text-lg">
              Welcome ...
            </Text>
            <Text className="text-third">Please fill in the information.</Text>
          </View>
          <View className="flex flex-col w-full">
            <View className="flex flex-row items-center justify-between border w-full h-[50px] rounded-md border-third overflow-hidden py-4 pl-4">
              <FontAwesome name="user-o" size={24} color="#b1b6c8" />
              <TextInput
              value={fullname}
              onChangeText={(e) => setFullName(e)}
                placeholder="Full Name"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third p-4">
              <FontAwesome5 name="phone-alt" size={15} color="#b1b6c8" />
              <TextInput
              value={password}
                onChangeText={(e)=> setPassword(e)}
                placeholder="Phone Number"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third p-4">
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#b1b6c8"
              />
              <TextInput
              value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="Your Email"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
          </View>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={handleSubmit}
              content="Proceed"
            />
          </View>
          <Text className="text-third font-bold mt-4">OR</Text>
          <Text className="text-third py-1 font-bold">
            Already have an account?
          </Text>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={() => router.push("/login")}
              content="Sign In"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
