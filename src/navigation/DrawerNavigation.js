import { DrawerNavigator } from 'react-navigation';
import Home from '../components/HomeComponent';
import Trending from '../components/TrendingArticles';
import Favorite from '../components/FavoriteArticles';

export default Drawer = DrawerNavigator({
   Home: {
     screen: Home,
    },
   Trending: {
    screen: Trending,
    },
    Favorite: {
        screen: Favorite,
        }
}
);