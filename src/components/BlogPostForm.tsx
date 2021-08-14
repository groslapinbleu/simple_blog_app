import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { BlogPostInterface } from '../context/BlogContext';

interface BlogPostFormProps {
  blogPost: BlogPostInterface;
  callback: (updatedPlogPost: BlogPostInterface) => void;
}
const BlogPostForm = ({ blogPost, callback }: BlogPostFormProps) => {
  const [title, setTitle] = useState(blogPost ? blogPost.title : '');
  const [content, setContent] = useState(blogPost ? blogPost.content : '');

  const savePost = () => {
    callback({
      id: blogPost.id,
      title,
      content,
    });
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

BlogPostForm.defaultProps = {
  blogPost: { id: 0, title: '', content: '' },
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
export default BlogPostForm;
