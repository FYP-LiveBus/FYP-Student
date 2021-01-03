import React, { useEffect, useState } from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phonenumber: '',
    email: '',
  });

  useEffect(()=>{
    setTimeout(async() => {
      try {
        let userData = await AsyncStorage.getItem('userObject');
        setData(JSON.parse(userData))
      } catch(e) {
        console.log(e);
      }
    }, 1000);
  },[])

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {marginTop:15,marginBottom: 5,}]}>
              {data.firstname +" "+ data.lastname}
            </Title>
          </View>
        </View>
      </View>

      <View>
        <Title style={[styles.title,{marginLeft: 10}]}>
          First name
        </Title>
        <Caption style={[styles.caption,{marginLeft: 10}]}>
          {data.firstname}
        </Caption>
      </View>
      
      <View>
        <Title style={[styles.title,{marginLeft: 10, marginTop: 20}]}>
          Last Name
        </Title>
        <Caption style={[styles.caption,{marginLeft: 10}]}>
          {data.lastname}
        </Caption>
      </View>
      
      <View>
        <Title style={[styles.title,{marginLeft: 10,marginTop: 20}]}>
          Username
        </Title>
        <Caption style={[styles.caption,{marginLeft: 10}]}>
          {data.username}
        </Caption>
      </View>
      
      <View>
        <Title style={[styles.title,{
        marginLeft: 10,
        marginTop: 20}]}>Phone Number</Title>
        <Caption style={[styles.caption,{
        marginLeft: 10}]}>{data.phonenumber}</Caption>
      </View>
     
      <View>
        <Title style={[styles.title,{
        marginLeft: 10,
        marginTop: 20}]}>Email</Title>
        <Caption style={[styles.caption,{
        marginLeft: 10}]}>{data.email}</Caption>
      </View>
    
    </SafeAreaView>
  );
  
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

