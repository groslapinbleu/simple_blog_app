import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import {
  Context as BlogContext,
  BlogPostInterface,
} from '../context/BlogContext';

interface CreateScreenProps {
  //navigation: NavigationStackProp<{}>;
  navigation: NavigationStackProp<{ id: number }>;
}
const CreateScreen = ({ navigation }: CreateScreenProps) => {
  const blogContext = useContext(BlogContext);
  const state: BlogPostInterface[] = blogContext.state;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const savePost = () => {
    blogContext.addBlogPost(
      { id: Math.floor(Math.random() * 99999), title, content },
      () => {
        navigation.goBack();
      }
    );
  };

  return (
    <View style={styles.BlogView}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(title) => setTitle(title)}
        value={title}
        placeholder='Enter title'
        autoCorrect={false}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        onChangeText={(content) => setContent(content)}
        value={content}
        placeholder='Enter content'
        autoCorrect={false}
      />
      <Button title={'Save'} onPress={() => savePost()}></Button>
    </View>
  );
};

CreateScreen.navigationOptions = () => {
  return {
    headerTitle: 'Create Post',
  };
};
const styles = StyleSheet.create({
  BlogView: {
    paddingHorizontal: 5,
  },
  input: {
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
});
export default CreateScreen;
