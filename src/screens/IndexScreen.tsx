import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { NavigationStackProp } from 'react-navigation-stack';

interface IndexScreenProps {
  navigation: NavigationStackProp<{}>;
}

const IndexScreen = ({ navigation }: IndexScreenProps) => {
  const blogContext = useContext(BlogContext);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={blogContext.state}
        renderItem={({ item }) => {
          return (
            <View style={styles.BlogView}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Show', { id: item.id })}
                >
                  <Text style={styles.title}>
                    {item.id}-{item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => blogContext.delBlogPost(item.id)}
                >
                  <Feather style={styles.icon} name='trash' />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }: IndexScreenProps) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather style={styles.icon} name='plus' />
      </TouchableOpacity>
    ),
  };
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
    marginRight: 5,
  },
});
export default IndexScreen;
