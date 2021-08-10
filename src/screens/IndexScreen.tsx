import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = () => {
  const blogContext = useContext(BlogContext);
  return (
    <View>
      <Button title={'Add post'} onPress={blogContext.addBlogPost}></Button>

      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={blogContext.state}
        renderItem={({ item }) => {
          return (
            <View style={styles.BlogView}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.id}-{item.title}
                </Text>
                <TouchableOpacity
                  onPress={() => blogContext.delBlogPost(item.id)}
                >
                  <Feather style={styles.icon} name='trash' />
                </TouchableOpacity>
              </View>
              <Text>{item.content}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  BlogView: {
    borderColor: 'black',
    borderTopWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});
export default IndexScreen;
