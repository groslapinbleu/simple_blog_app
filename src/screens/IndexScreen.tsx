import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
const IndexScreen = () => {
  const blogContext = useContext(BlogContext);
  return (
    <View>
      <Text>IndexScreen</Text>
      <FlatList
        keyExtractor={(item) => item.title}
        data={blogContext.state}
        renderItem={(element) => {
          return (
            <View>
              <Text>Post title: {element.item.title}</Text>
              <Text>Post content: {element.item.content}</Text>
            </View>
          );
        }}
      />
      <Button title={'Add post'} onPress={blogContext.addBlogPost}></Button>
    </View>
  );
};

const styles = StyleSheet.create({});
export default IndexScreen;
