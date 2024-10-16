import React, { useState, useMemo } from 'react'; 
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext'; // Import the context

const Dashboard = () => {
  const { username } = useUser(); // Access username from UserContext
  const [textFields, setTextFields] = useState<string[]>([]); // State to store input values

  // Function to add a new text field
  const addTextField = () => {
    setTextFields((prevFields) => [...prevFields, '']); // Add an empty string to the text fields
  };

  // Use useMemo to optimize rendering of text fields
  const renderedTextFields = useMemo(() => {
    return textFields.map((text, index) => (
      <TextInput
        key={index}
        style={styles.input}
        placeholder={`Input ${index + 1}`}
        value={text}
        onChangeText={(value) => {
          const newFields = [...textFields];
          newFields[index] = value; // Update the specific input field
          setTextFields(newFields);
        }}
      />
    ));
  }, [textFields]);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://png.pngtree.com/png-clipart/20230610/ourlarge/pngtree-aesthetic-blue-notepad-for-journal-or-notes-png-image_7125652.png' }} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Welcome to Your Notepad App!</Text>
      <Text style={styles.subtitle}>Keep track of your thoughts, feelings, and ideas</Text>
      
      {/* Display username if it exists */}
      {username ? (
        <Text style={styles.username}>Hello, {username}!</Text>
      ) : (
        <Text style={styles.username}>Hello, Guest!</Text>
      )}

      {/* Render the dynamic text fields */}
      {renderedTextFields}

      {/* Circular button to add more text fields */}
      <TouchableOpacity style={styles.addButton} onPress={addTextField}>
        <Text style={styles.addButtonText}>+</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#004D40',
    textAlign: 'center',
  },
  username: {
    fontSize: 18,
    color: '#1E88E5',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Dashboard;
