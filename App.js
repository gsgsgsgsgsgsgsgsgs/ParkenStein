import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
    const [name, setName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);

    useEffect(() => {
        const getName = async () => {
            const storedName = await AsyncStorage.getItem('userName');
            if (storedName) {
                setName(storedName);
                setIsNameSet(true);
            }
        };
        getName();
    }, []);

    const handleSaveName = async () => {
        await AsyncStorage.setItem('userName', name);
        setIsNameSet(true);
    };

    const handleFindLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        try {
            const response = await axios.post('http:// 10.7.5.28/api/location', {
                name,
                latitude,
                longitude
            });
            console.log('Location sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending location:', error);
        }
    };

    if (!isNameSet) {
        return (
            <View style={styles.container}>
                <Text>Please enter your name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Button title="Save" onPress={handleSaveName} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Welcome, {name}!</Text>
            <Button title="Find" onPress={handleFindLocation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '80%',
    },
});
