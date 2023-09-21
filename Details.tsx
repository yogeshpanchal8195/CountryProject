import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function Details({route}): JSX.Element {
  const {name, flag, officialName} = route.params;

  return (
    <View style={styles.containerStyle}>
      <Image
        source={{
          uri: flag,
        }}
        style={styles.flagStyle}
      />
      <Text style={styles.countryName}>{name}</Text>
      <Text>{officialName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flagStyle: {
    backgroundColor: '#99ccff',
    height: 260,
    width: 320,
    borderRadius: 22,
  },
  countryName: {
    borderRadius: 12,
    padding: 12,
  }
});

export default Details;
