import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppContext from '../context/AppContext';

export default function MemoryScreen({ navigation }) {
  const { memories } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Memory panel</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#2563eb' }}>Close</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={memories}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.icon}>
              <Text>💡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.category}</Text>
              <Text>{item.text}</Text>
              <Text style={{ fontSize: 11, color: '#666' }}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});
