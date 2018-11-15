import React from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Card, Divider, Icon } from 'react-native-elements';
import moment from 'moment';

export default class Article extends React.Component {
  constructor(props){
    super(props);
  }

  _handlePress = () => {
    this.props.onItemPress(this.props.article.title);
  }

  _saveFavorite = () => {
    AsyncStorage.setItem('article',JSON.stringify(this.props.article));
}

  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';


      
    return (
            <View>
                <TouchableOpacity onPress={this._handlePress}>
                  <Card
                    featuredTitle={title}
                    featuredTitleStyle={styles.featuredTitleStyle}
                    image={{
                      uri: urlToImage || defaultImg
                    }}
                  >
                    <Text style={styles.descriptionText}>
                      {description || 'Read More..'}
                    </Text>
                    <Divider style={styles.divider} />
                    <View style={styles.cardfooter}>
                      <Text style={styles.noteStyle}>{source.name.toUpperCase()}</Text>
                    </View>
                  </Card>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cardfooter} onPress={this._saveFavorite}>
                      <Icon
                      raised
                      name='heartbeat'
                      type='font-awesome'
                      color='#f50' 
                      />
                      <Text style={styles.favStyle}>Add to favorites</Text>
                  </TouchableOpacity>
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
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  },
  descriptionText:{
    marginBottom: 10
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  divider:{
    backgroundColor: '#dfe6e9'
  },
  cardfooter: {
    flexDirection: 'row',
  },
  favStyle: {
    marginTop: 25,
    fontStyle: 'italic',
    color: '#b2aac3',
    fontSize: 20
  },
});
