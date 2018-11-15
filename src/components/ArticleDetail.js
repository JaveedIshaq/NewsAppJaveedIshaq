import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class ArticleDetail extends React.Component {

  constructor(props){
    super(props);
  }  

  _handlePress = () => {
    this.props.onPressBack();
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
             <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Card
             image={{
                   uri: urlToImage || defaultImg
                   }}>
         <Text h3>{title}</Text>
           <Text style={{marginBottom: 10}}>
             {description || '...'}
           </Text>
           <Text style={noteStyle}>
             {source.name.toUpperCase()}
           </Text>
        </Card>
     
        </View>
    );
  }
}

const styles = {
  backButton: {
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: 'blue'
  }

};
