import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    refetch: loadMovies,
    error,
    loading,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced serach functionality
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView>
        <FlatList
          data={movies as Movie[]}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="mt-2 pb-32 px-5"
          scrollEnabled={false}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-20 items-center">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>

              <View className="my-5">
                <SearchBar
                  placeholder="Search for a movie"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              </View>

              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {!loading &&
                !error &&
                searchQuery.trim() &&
                movies?.length! > 0 && (
                  <Text className="text-xl text-white font-bold">
                    Search Results for
                    <Text className="text-accent"> {searchQuery}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Start typing to search for movies"}
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
};

export default Search;
