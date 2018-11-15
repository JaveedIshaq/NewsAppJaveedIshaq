import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getNews } from '../shared/news';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import { Header }  from 'react-native-elements';


export default class Home extends Component {

  // constructor setting State
    constructor(props) {
      super(props);
      this.state = { 
         articles: [],
         refreshing: true,
         currentArticle: null,
        };
      this.fetchNews = this.fetchNews.bind(this);
    }

    //Component Life-cycle Method to call fetchnews function after component is mounted
    componentDidMount() {
      this.fetchNews();
    }
    // Fetch news Data and set the state
    fetchNews() {
      getNews()
        .then(articles => this.setState({ articles, refreshing: false }))
        .catch(() => this.setState({ refreshing: false }));
    }
  
    //Refresh
    handleRefresh() {
      this.setState(
        {
          refreshing: true
        },
        () => this.fetchNews()
      );
    }

    // set state for currentArticle to null to ..
    // Show all article on coming back from Article Detail Component
    onPressBackUnsetCurrentArticle = () => {
      this.setState({
        currentArticle: null
       });
    };
    
    // Set State current article with tapped article title
    setCurrentArticle = (currentArticleTile) => {
             this.setState({
              currentArticle: currentArticleTile
             });
    };
    // get the Tapped article data to pass the Article detail page
    _currentArticel = () => {
      return this.state.articles.find(
       (article) => article.title === this.state.currentArticle
      );
    }
  
    render() {
      // If Single Article is Available
      if(this.state.currentArticle) {
        return(
        <View>
        <Header
            leftComponent= {{ 
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
                   }}
          />
        <ArticleDetail 
           article={this._currentArticel()}
           onPressBack={this.onPressBackUnsetCurrentArticle}
           />
         </View>
         )
      }

      // If All News Article are to be Show
      if(this.state.articles.length > 0){
        return (
          <View>
            <Header
            leftComponent= {{ 
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
                   }}
          />
          <FlatList
            data={this.state.articles}
            renderItem={({ item }) => <Article article={item} onItemPress={this.setCurrentArticle} />}
            keyExtractor={item => item.url}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
          </View>
        );
      }

      // If no Data is available
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>News Data is loading...</Text>
        </View>
      );

      
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });
  