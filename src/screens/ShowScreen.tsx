import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import {
  Context as BlogContext,
  BlogPostInterface,
} from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

interface ShowScreenProps {
  //navigation: NavigationStackProp<{}>;
  navigation: NavigationStackProp<{ id: number }>;
}
const ShowScreen = ({ navigation }: ShowScreenProps) => {
  const blogContext = useContext(BlogContext);
  const id: number = navigation.getParam('id');
  const state: BlogPostInterface[] = blogContext.state;

  const blogPost = state.find((post) => {
    return post.id === id;
  });

  return (
    <View style={styles.BlogView}>
      <Text>ShowScreen {id}</Text>
      <Text>Title: {blogPost ? blogPost.title : 'unknown'}</Text>
      <Text>Content: {blogPost ? blogPost.content : 'unknown'}</Text>
    </View>
  );
};
ShowScreen.navigationOptions = ({ navigation }: ShowScreenProps) => {
  return {
    headerTitle: 'Post Details',
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', { id: navigation.getParam('id') })
        }
      >
        <EvilIcons name='pencil' size={35} />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  BlogView: {
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
});
export default ShowScreen;
