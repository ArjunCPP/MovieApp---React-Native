import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, ImagePickerIOS } from 'react-native';
import COLORS from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSperator from '../components/ItemSeperator';
import MovieCard from '../components/MovieCard';
import { 
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres
} from '../services/MovieService';


const Genres = [ "All" , "Action", "Comedy" , "Romance" , "Horror","Sci-Fi"];

const HomeScreen = ({navigation}) => {
  const [activeGenre,setActiveGenre] = useState('All');

  const [ nowPlayingMovies,SetNowPlayingMovies] = useState({});

  const [ upcomingMovies,SetUpcomingMovies] = useState({});

  const [ genres,setGenres] = useState([{ id: 10110, name:"All"}]);

  useEffect(() =>{
    getNowPlayingMovies().then(moiveResponse => 
      SetNowPlayingMovies(moiveResponse.data)
      ); 
      getUpcomingMovies().then(moiveResponse => 
        SetUpcomingMovies(moiveResponse.data)
      ); 
      getAllGenres().then(genreResponse => 
        setGenres([...genres, ...genreResponse.data.genres])
      ); 
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar 
      style="auto" 
      translucent={false} 
      backgroundColor={COLORS.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer }>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubtitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListcontainer}>
        <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSperator width={20}/>}
        ListHeaderComponent={() => <ItemSperator width={20}/>}
        ListFooterComponent={() => <ItemSperator width={20}/>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <GenreCard 
        genreName={item.name}
        active={item.name === activeGenre ? true : false}
        onPress={setActiveGenre}
        /> 
        )}
       />
      </View>
      <View>
        <FlatList
        data={nowPlayingMovies.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSperator width={20}/>}
        ListHeaderComponent={() => <ItemSperator width={20}/>}
        ListFooterComponent={() => <ItemSperator width={20}/>}
        renderItem={({ item }) => <MovieCard 
          title={item.title}
          language={item.original_language}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          heartLess={false}
          onPress={()=> navigation.navigate("movie" ,{ movieId: item.id })}
          />}
        />
      </View>
      <View style={styles.headerContainer }>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubtitle}>VIEW ALL</Text>
      </View>
      <FlatList
        data={upcomingMovies.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSperator width={20}/>}
        ListHeaderComponent={() => <ItemSperator width={20}/>}
        ListFooterComponent={() => <ItemSperator width={20}/>}
        renderItem={({ item }) => <MovieCard 
          title={item.title}
          language={item.original_language}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          size={.6}
          onPress={()=> navigation.navigate("movie" ,{ movieId: item.id })}
          />}
        />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
  flex:1,
  backgroundColor: COLORS.BASIC_BACKGROUND
  },
  headerContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
    paddingVertical:10
  },
  headerTitle:{
    fontSize:28,
  },
  headerSubtitle:{
    fontSize:13,
    color: COLORS.ACTIVE,
  },
  genreListcontainer:{
    paddingVertical:20,
  }
});

export default HomeScreen;