import CustomButton from "../../components/CustomButton";
import facebookImg from "../../assets/images/facebook.png";
import googleImg from "../../assets/images/google.png";
import { router, Link } from "expo-router";
import axios from "axios";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {useState} from 'react'
import * as Yup from 'yup'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async() =>{
    const validationSchema = Yup.object().shape({
      password: Yup.string().required("Password is required"),
      email: Yup.string().email().required("Email is required"),
    })

    if(!email || !password){
      alert('please fill in all the inputs')
    }
    try{
      await validationSchema.validate({email, password})
      const user = {
        email: email,
        password: password
      };
      const response = await axios.post("http://10.5.220.106:5000/api/v1/auth/login", user);
      console.log(response.data)
      router.push("search")
    }
    catch(err){
      console.log("the catch error",err)
    }

  }
  return (
    <SafeAreaView className="bg-[#ff4d4d] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          marginTop: 100,
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
              <Text className="text-[#ff4d4d]">Menu</Text>
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col items-center gap-2 py-5">
            <Text className="font-bold text-secondary text-lg">
              Welcome ...
            </Text>
            <Text className="text-third">Sign In to continue</Text>
          </View>
          <View className="flex flex-col w-full">
            <View className="flex flex-row items-center justify-between border w-full h-[50px] rounded-md border-third p-4">
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#b1b6c8"
              />
              <TextInput
              value={email}
                onChangeText={(e)=> setEmail(e)}
                placeholder="Your Email"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third overflow-hidden py-4 pl-4">
              <MaterialIcons name="lock-outline" size={17} color="#b1b6c8" />
              <TextInput
                value={password}
                onChangeText={(e)=> setPassword(e)}
                placeholder="Password"
                className="flex-1 px-3 items-center h-[50px]"
              />
            </View>
          </View>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={()=> router.push("search")}
              content="Sign In"
            />
          </View>
          <View className="w-full flex-row justify-center items-center pb-4">
            <View className="h-[1px] mr-4 w-[40%] bg-third"></View>
            <Text className="text-third font-bold">OR</Text>
            <View className="h-[1px] ml-4 w-[40%] bg-third"></View>
          </View>
          <View className="flex flex-col w-full">
            <TouchableOpacity className="relative h-[50px] flex-row items-center justify-center border border-third w-full rounded-md">
              <Image
                source={googleImg}
                className="w-[28px] h-[28px] absolute left-6"
                alt=""
              />
              <Text className="text-third">Login with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative h-[50px] mt-2 flex-row items-center justify-center border border-third w-full rounded-md">
              <Image
                source={facebookImg}
                className="w-[19px] h-[19px] absolute left-7"
                alt=""
              />
              <Text className="text-third">Login with Facebook</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col items-center pt-5">
            <Text className="text-primary font-bold">Forgot Password? </Text>
            <Text className="text-third mt-2">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold">
                Register
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
