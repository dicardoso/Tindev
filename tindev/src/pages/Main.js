import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';

import logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';
import itsamatch from '../assets/itsamatch.png';

export default function Main( {navigation} ){
    const id = navigation.getParam('user') ;
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(false);
    
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user: id //envia para rota devs o id logado
                }
            })
            setUsers(response.data);//seta o estado
        }

        loadUsers();
    },[id]);

    useEffect(()=> {//conectar com webSocket
        const socket = io('http://localhost:5555', {
            query: { user: id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        })
    },[id]);

    async function handleLike(){
        const [user, ...rest] = users;//pegando a 1ª posição de 'users' e armazena em 'user'
        // e guarda os demais e 'rest', portanto não usa o filtro no 'setUsers'
        await api.post(`/devs/${user._id}/likes`, null,{
            headers: {user: id}
        });

        setUsers(rest);
    }

    async function handleDislike(){
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null,{
            headers: {user: id}
        });

        setUsers(rest);
    }

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }


    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo}></Image>
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                { users.length === 0
                    ?<Text style={styles.empty}>Acabou!</Text>
                    :(
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}>
                                <Image style={styles.avatar} source={{uri: user.avatar }}></Image>
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )
                }
                
            </View>

            {users.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like}></Image>
                    </TouchableOpacity>
                </View>
            )}

            { matchDev && (
                <View style={styles.matchContainer}>
                    <Image style={styles.matchImage} source={itsamatch}></Image>
                    <Image style={styles.matchAvatar} source={{uri: matchDev.avatar}}></Image>

                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>

                    <TouchableOpacity onPress={() => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            ) }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 10
    },

    logo:{
        marginTop: 30
    },

    empty:{
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
        zIndex:0,
    },

    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar:{
        flex: 1,
        height:300,
    },

    footer:{
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    name:{
        fontSize:16,
        fontWeight: 'bold',
        color:'#333'
    },

    bio:{
        fontSize:14,
        color:'#999',
        marginTop: 5,
        lineHeight: 18
    },

    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 30,
    },

    button:{
        width: 60,
        height: 60,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        //abaixo server para sobra no IOS
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        
    },

    matchContainer:{
        ...StyleSheet.absoluteFillObject,//preenche a tela toda de uma vez no código
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },

    matchImage:{
        height: 60,
        resizeMode: 'contain',
    },

    matchAvatar:{
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#FFF',
        marginVertical: 30
    },

    matchName:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
    },

    matchBio:{
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        paddingHorizontal: 30,
    },

    closeMatch:{
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    }
})