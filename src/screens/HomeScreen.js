import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-navigation'
import { Text, StyleSheet } from 'react-native'
import Map from '../components/Map'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
    
    useEffect(  () => {
        (() => registerForPushNotificationsAsync())(); 
    }, []) 

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
        
        const res = await firebase.firestore().collection('Tokens').doc("userid12").set({token});

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }
    
        return token;
    }
    
    // const token = await registerForPushNotificationsAsync();


    return (
        <SafeAreaView forceInset={{ top: 'always' }}>

        </SafeAreaView>
    )
}

export default HomeScreen