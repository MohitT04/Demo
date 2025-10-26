import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import AppContext from '../context/AppContext';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';

function generateReply(input) {
  const text = input.trim().toLowerCase();
  if (text === 'hi' || text === 'hello')
    return { text: "Hey! Good to see you again. What's on your mind?" };
  if (text.includes('startup') || text.includes('company'))
    return {
      text: "I remember you're building AiRA. How's that going?",
      memory: 'career',
    };
  if (text.includes('help') || text.includes('advice'))
    return {
      text: "I'm here to help. What specifically are you thinking about?",
    };
  return { text: "That's interesting. Tell me more about that." };
}

export default function ChatScreen({ navigation }) {
  const { user, memories, setMemories, setUser } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'sys',
      role: 'ai',
      text: "Hi, I'm AiRA — your assistant.",
      memoryTag: null,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const flatRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  function addMessage(msg) {
    setMessages(prev => [...prev, msg]);
  }
  function onSend() {
    if (!input.trim()) return;
    const userMsg = { id: 'u' + Date.now(), role: 'user', text: input.trim() };
    addMessage(userMsg);
    setInput('');
    handleAi(userMsg.text);
  }

  function handleAi(text) {
    setTyping(true);
    const reply = generateReply(text);

    if (reply.memory) {
      const mem = {
        id: 'm' + Date.now(),
        category: 'About You',
        text: `Mentioned ${reply.memory}`,
        date: new Date().toISOString().slice(0, 10),
      };
      setMemories(prev => [mem, ...prev]);
    }

    const words = reply.text.split(' ');
    const aiId = 'a' + Date.now();
    addMessage({
      id: aiId,
      role: 'ai',
      text: '',
      memoryTag: reply.memory || null,
    });

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setMessages(prev =>
        prev.map(m =>
          m.id === aiId ? { ...m, text: words.slice(0, i).join(' ') } : m,
        ),
      );
      if (i >= words.length) {
        clearInterval(timer);
        setTyping(false);
      }
    }, 200);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: '700' }}>Hi, {user?.email || 'there'}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Memory')}
            style={{ marginRight: 12 }}
          >
            <Text>Memories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setUser(null);
              navigation.replace('Auth');
            }}
          >
            <Text style={{ color: '#b00' }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <MessageBubble item={item} me={item.role === 'user'} />
        )}
        contentContainerStyle={{ padding: 12, paddingBottom: 120 }}
        onContentSizeChange={() =>
          flatRef.current?.scrollToEnd({ animated: true })
        }
      />

      {typing && (
        <View style={{ paddingHorizontal: 12 }}>
          <TypingIndicator />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={onSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
            <Text style={{ color: '#fff' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  inputRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
