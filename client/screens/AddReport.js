import React, { useState, useEffect, useContext } from "react";
import { Text, TextInput, Button, View, Picker, StyleSheet, CheckBox } from "react-native";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form"

const AddReport = ({ navigation }) => {
  // store
  const { auth, markers, currentLocation, getCurrentLocation, reportLocation } = useContext(GlobalContext);

  const { register, handleSubmit, setValue } = useForm();

  const [reportForm, setReportForm] = useState({
    isCommon: false,
    isUncommon: false,
    isSevere: false
  })

  // getLocations to be mapped
  useEffect(() => {
    if (currentLocation === null) {
      getCurrentLocation();
    }
    register('mobileNumber');
    register('address');
  }, []);

  const [severe, setSevere] = useState(false);
  const [common, setCommon] = useState(false);
  const [uncommon, setUncommon] = useState(false);


  const report = formData => {

    // const { coords } = currentLocation;
    const otherData = {
      user: auth.user.id,
      severe,
      common,
      uncommon
    }

    const locationData = {
      data: [
        {
          data: currentLocation
        }
      ]
    }

    const form = Object.assign({}, formData, otherData, locationData);
    console.log("FoRM",form);
    console.log("wtf", markers);
    reportLocation(form);
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setValue("mobileNumber", text)}
        style={styles.input}
        placeholder=" Mobile Number"
      />
      <View >
        <View style={styles.checkBoxes}>
          <CheckBox value={severe} onValueChange={() => severe ? setSevere(false) : setSevere(true)}/>
          <Text>Severe Symptoms Read More</Text>
        </View>
        <View style={styles.checkBoxes}>
          <CheckBox value={common} onValueChange={() => common ? setCommon(false) : setCommon(true)}/>
          <Text>Common Symptoms Read More</Text>
        </View>
        <View style={styles.checkBoxes}>
          <CheckBox value={uncommon} onValueChange={() => uncommon ? setUncommon(false) : setUncommon(true)}/>
          <Text>Uncommon Symptoms Read More</Text>
        </View>
      </View>
      <TextInput
        onChangeText={text => setValue("address", text)}
        style={styles.input}
        placeholder=" Address"
      />
      <Text>Note: Your location will be automatically submit with this form.</Text>
      <Button onPress={handleSubmit(report)} title="Report" style={styles.input} />
    </View>
  )
}

export default AddReport;



const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  checkBoxes: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 5
  }
})
