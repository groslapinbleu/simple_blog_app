import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BlogPostForm from '../components/BlogPostForm';
import {
  Context as BlogContext,
  BlogPostInterface,
} from '../context/BlogContext';

interface EditScreenProps {
  navigation: NavigationStackProp<{ id: number }>;
}
const EditScreen = ({ navigation }: EditScreenProps) => {
  const blogContext = useContext(BlogContext);
  const state: BlogPostInterface[] = blogContext.state;

  const id: number = navigation.getParam('id');
  let blogPost = state.find((post) => {
    return post.id === id;
  });
  if (!blogPost) blogPost = { id, title: '', content: '' };

  const callback = (updateBlogPost: BlogPostInterface) => {
    blogContext.editBlogPost(
      {
        id: updateBlogPost.id,
        title: updateBlogPost.title,
        content: updateBlogPost.content,
      },
      () => {
        navigation.goBack();
      }
    );
  };

  return <BlogPostForm blogPost={blogPost} callback={callback}></BlogPostForm>;
};

EditScreen.navigationOptions = ({ navigation }: EditScreenProps) => {
  return {
    headerTitle: `Edit Post ${navigation.getParam('id')}`,
  };
};
const styles = StyleSheet.create({});
export default EditScreen;
