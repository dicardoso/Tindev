import React, { useEffect, useState } from 'react';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api.js';

import './Main.css';

export default function Main({match}){//match possui todos os parâmetros passados para essa rota
    const [users, setUsers] = useState([]);
    
    useEffect(()=> {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user: match.params.id //envia para rota devs o id logado
                }
            })
            setUsers(response.data);//seta o estado
        }

        loadUsers();
    },[match.params.id])
    
    return(
        <div className="main-container">
            <img src={logo} alt="Tindev"></img>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.avatar}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>

                        <div className="buttons">
                            <button type="button">
                                <img src={dislike} alt="Dislike"/>
                            </button>
                            <button type="button">
                                <img src={like} alt="Like"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}