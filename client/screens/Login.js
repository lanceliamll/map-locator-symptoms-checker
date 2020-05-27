import React, { useContext, useEffect } from "react";
import { Text, Button, View, TextInput  } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form"


const Login = ({ navigation }) => {
  const { login, auth } = useContext(GlobalContext);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("identifier");
    register("password");    
  }, [register])


  const loginUser = (data) => {
    login(data);
  }

  return (
    <View>
      <TextInput onChangeText={text => setValue("identifier", text)} />
      <TextInput onChangeText={text => setValue("password", text)} />
      <Button onPress={handleSubmit(loginUser)} title="Hello" />
    </View>
  )
}

export default Login;
