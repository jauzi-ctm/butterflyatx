import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const UserInfo = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const saveProfile = () => {
    // Save the user's profile information
    // You can implement your own logic here, such as sending data to a server or storing it locally
    console.log('Profile saved:', { name, age, email });
  };

  const saveSettings = () => {
    // Save the user's settings
    // Implement your logic for saving settings here
    console.log('Settings saved!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(Text)}
      />
      <TextInput
        styles={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onchange={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Button title="Save Profile" onPress={saveProfile} />
      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default UserInfo;