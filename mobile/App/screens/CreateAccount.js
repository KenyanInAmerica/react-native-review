import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";

import { reviewApi, saveAuthToken } from '../util/api';

const styles = StyleSheet.create({
  textBlock: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
  link: {
    textDecorationLine: "underline"
  }
});

export default class ListScreen extends React.Component {

  initialState = {
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmedPassword: null,
    error: null
  }

  state = {
    ...this.initialState
  };

  handleForm() {
    reviewApi('/account', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      }),
    })
      .then((response) => {
        return saveAuthToken(response.result.token);
      })
      .then(() => {
        this.props.navigation.navigate("Information");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <TextField label="Email" placeholder="john.doe@example.com" onChangeText={email => this.setState({ email })} />
        <TextField label="First Name" placeholder="John" onChangeText={firstName => this.setState({ firstName })} />
        <TextField label="Last Name" placeholder="Doe" onChangeText={lastName => this.setState({ lastName })} />
        <TextField label="Password" secureTextEntry onChangeText={password => this.setState({ password })} />
        <TextField label="Confirm Password" secureTextEntry onChangeText={confirmedPassword => this.setState({ confirmedPassword })} />
        <ErrorText text="" />
        <Button text="Submit" onPress={() => this.handleForm()} />
        <View style={styles.textBlock}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")}>
            <Text style={[styles.text, styles.link]}>Sign in.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
