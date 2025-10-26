import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StyleSheet,
} from 'react-native';
import AppContext from '../context/AppContext';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const { setUser } = useContext(AppContext);

  function onLogin() {
    if (!email || !password) return Alert.alert('Please fill both fields');

    // Hardcoded demo credentials
    if (email === 'test@aira.ai' && password === 'password') {
      setUser({ email });
      navigation.replace('Chat');
    } else {
      Alert.alert('Invalid credentials', 'Use test@aira.ai / password');
    }
  }

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.box}>
        <Text style={styles.title}>AiRA</Text>
        <Text style={styles.sub}>Sign in to continue</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.toggle}
          >
            <Text>{secure ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={onLogin}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Demo: test@aira.ai / password</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
  },
  box: {
    width: '92%',
    maxWidth: 420,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  title: { fontSize: 32, fontWeight: '800' },
  sub: { color: '#666', marginBottom: 12 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  row: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  toggle: { padding: 10 },
  btn: {
    marginTop: 12,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  hint: { marginTop: 12, color: '#666' },
});
