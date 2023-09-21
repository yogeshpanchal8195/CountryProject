import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Home({navigation}): JSX.Element {
  const [countryList, setCountryList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getData = async <T, K>(
    key: string,
    defaultValue?: K,
  ): Promise<T | K | undefined> => {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : defaultValue;
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountryList(response.data.slice(0, 10) || []);
      const jsonValue = JSON.stringify(response.data);
      AsyncStorage.setItem('countryData', jsonValue);
    });
  }, []);

  useEffect(() => {
    getData('countryData').then(listData => {
      setCountryList(
        listData
          .filter(ele =>
            ele.name.common.toLowerCase().includes(searchText.toLowerCase()),
          )
          .slice(0, 10) || [],
      );
    });
  }, [searchText]);

  const fetchNext = async () => {
    const listData = await getData('countryData');
    if (listData.length > countryList.length) {
      setCountryList(
        listData
          .filter(ele =>
            ele.name.common.toLowerCase().includes(searchText.toLowerCase()),
          )
          .slice(0, countryList.length + 10) || [],
      );
    }
  };

  const renderItem = country => {
    const {name, latlng, officialName, coatOfArms} = country;
    return (
      <TouchableOpacity
        key={name.common + Math.floor(latlng[0]) + Math.floor(latlng[1])}
        style={styles.card}
        onPress={() =>
          navigation.navigate('details', {
            name: name.common,
            flag: coatOfArms.png,
            officialName: officialName,
          })
        }>
        <Image
          source={{
            uri: coatOfArms.png,
          }}
          alt={name.common}
          style={styles.flagStyle}
        />
        <Text style={styles.countryName}>{name.common}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <TextInput
        style={styles.searchInputStyle}
        placeholder="Type here"
        onChangeText={v => setSearchText(v)}
        defaultValue={searchText}
      />
      <FlatList
        data={countryList}
        renderItem={({item}) => renderItem(item)}
        onEndReached={fetchNext}
        keyExtractor={item => item.name.common}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  containerStyle: {
    marginLeft: 32,
    marginTop: 32,
  },
  card: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  searchInputStyle: {
    width: 300,
    margin: 32,
    height: 40,
    padding: 8,
    borderRadius: 12,
    borderColor: '#3366cc',
    borderWidth: 1,
  },
  flagStyle: {
    height: 360,
    width: 300,
    borderRadius: 28,
    backgroundColor: '#99ccff',
  },
  countryName: {
    borderRadius: 12,
    padding: 12,
    textAlign: 'center',
  },
});

export default Home;
