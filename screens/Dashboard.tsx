import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Note } from '../type'; 


const Dashboard = () => {
  const { username, setUsername } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Dashboard'>>();

  // Check for new note from CreateNote
  useEffect(() => {
    if (route.params && route.params.note) {
      setNotes((prevNotes) => [...prevNotes, route.params.note as Note]);
    }
  }, [route.params]);

  const handleAddNote = () => {
    navigation.navigate('CreateNote');
  };

  const handleLogout = () => {
    setUsername('');
    navigation.reset({ index: 0, routes: [{ name: 'LogIn' }] });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://png.pngtree.com/png-clipart/20230610/ourlarge/pngtree-aesthetic-blue-notepad-for-journal-or-notes-png-image_7125652.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Your Notepad App!</Text>
      <Text style={styles.subtitle}>Keep track of your thoughts, feelings, and ideas</Text>
      {username ? <Text style={styles.username}>Hello, {username}!</Text> : <Text style={styles.username}>Hello, Guest!</Text>}

      {notes.map((note, index) => (
        <View key={index} style={styles.note}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text>{note.content}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00796B', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#004D40', textAlign: 'center' },
  username: { fontSize: 18, color: '#1E88E5', marginBottom: 20 },
  note: { backgroundColor: '#FFF', padding: 10, borderRadius: 5, marginBottom: 10, width: '100%' },
  noteTitle: { fontSize: 16, fontWeight: 'bold', color: '#00796B' },
  addButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1E88E5', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 30, right: 30 },
  addButtonText: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  logoutButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#F44336', borderRadius: 5 },
  logoutButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default Dashboard;
