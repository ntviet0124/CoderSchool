import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  StatusBar,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';

// import { Card, Button, Icon } from 'react-native-elements';

export default function App() {

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [oldArticles, setOldArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  const getNews = async () => {
    if (lastPageReached) return;
    // setLoading(true);
    try {      
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${pageNumber}`);
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setOldArticles(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }
    }catch(error) {
      setHasApiError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getNews();
  }, []);

  
  const searchNews = async (search) => {
    if (search != '') {
      const newArticleList = articles.filter((item) => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setArticles(newArticleList);
    }else {
      setArticles(oldArticles);
    }
  }

  const renderArticleItem = ({ item }) => {
    return(
      <View style={styles.articleItem}>
        <View style={styles.articleImageHolder}>
          <Image source={{ uri: item.urlToImage }} style={styles.articleImage} resizeMode="cover" />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <TouchableOpacity>
            <Text style={styles.info}>{item.source.name}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onPress(item.url)}>
          <Text style={styles.articleTitle}>{item.title}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).startOf('hour').fromNow()}
          </Text>
        </View>
      </View>
    );
  };

  const onPress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  if (loading) {
    return(
      <ActivityIndicator style={styles.container} size="large" loading={loading} />
    );
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Error =(</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.row}>
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>

      <View style={styles.wrapSearchInput}>
        <View style={styles.bgSearchInput}>
          <TextInput
            style={styles.sizeSearchInput}
            placeholder="Search.."
            placeholderTextColor="#fff"
            color="#fff"
            fontSize="16"
            onChangeText={(value) => searchNews(value)}
          />
        </View>
      </View>

      <FlatList
        data={articles}
        onEndReached={getNews}
        onEndReachedThreshold={1}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
        ListFooterComponent={lastPageReached ? 
        <View style={styles.listFooter}>
          <Text style={styles.listFooterContent}>No more articles</Text>
        </View>
        :
        <ActivityIndicator size="large" loading={loading} />
        }
        /*
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        */
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#192433',
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: '#00bad6',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: '#ababab'
  },
  articleItem: {
    paddingHorizontal: 20,
    marginVertical: 20
  },
  articleImageHolder: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#ababab',
    marginBottom: 10
  },
  articleImage: {
    width: '100%',
    height: 250,
    borderRadius: 12
  },
  articleTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    marginVertical: 10
  },
  wrapSearchInput: {
    backgroundColor: '#192433',
    paddingVertical: 10,
    width: '100%'
  },
  bgSearchInput: {
    backgroundColor: '#151d28',
    marginHorizontal: 20,
    borderRadius: 25
  },
  sizeSearchInput: {
    height: 45,
    paddingHorizontal: 20
  },
  listFooter: {
    backgroundColor: '#151d28',
    marginHorizontal: 20,
    borderRadius: 12
  },
  listFooterContent: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    padding: 10
  },
});