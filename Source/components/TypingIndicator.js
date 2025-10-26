import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function TypingIndicator() {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
    marginRight: 6,
    opacity: 0.9,
  },
});
