import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ item, me }) {
  return (
    <View
      style={[
        styles.row,
        me ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' },
      ]}
    >
      {!me && (
        <View style={styles.avatar}>
          <Text style={{ color: '#fff' }}>AI</Text>
        </View>
      )}

      <View style={[styles.bubble, me ? styles.myBubble : styles.aiBubble]}>
        <Text style={{ color: me ? '#000' : '#fff' }}>{item.text}</Text>
        {item.memoryTag && (
          <View style={styles.tag}>
            <Text style={{ fontSize: 11, color: '#444' }}>
              Remembered: {item.memoryTag}
            </Text>
          </View>
        )}
      </View>

      {me && <View style={{ width: 32 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginVertical: 6, alignItems: 'flex-end' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bubble: { maxWidth: '78%', padding: 12, borderRadius: 12 },
  aiBubble: { backgroundColor: '#111827', borderTopLeftRadius: 4 },
  myBubble: { backgroundColor: '#e6f2ff', borderTopRightRadius: 4 },
  tag: {
    marginTop: 6,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});
