import React, { useContext, useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import {
  Context as BlogContext,
  BlogPostInterface,
} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

interface CreateScreenProps {
  navigation: NavigationStackProp<{ id: number }>;
}
const CreateScreen = ({ navigation }: CreateScreenProps) => {
  const blogContext = useContext(BlogContext);
  const state: BlogPostInterface[] = blogContext.state;

  const callback = (updateBlogPost: BlogPostInterface) => {
    blogContext.addBlogPost(
      {
        id: Math.floor(Math.random() * 99999),
        title: updateBlogPost.title,
        content: updateBlogPost.content,
      },
      () => {
        navigation.goBack();
      }
    );
  };

  return <BlogPostForm callback={callback}></BlogPostForm>;
};

CreateScreen.navigationOptions = () => {
  return {
    headerTitle: 'Create Post',
  };
};

export default CreateScreen;
