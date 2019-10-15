import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

import api from '../services/api.js';

export default function Login({ history }){
    const [username, setUsername] = useState('');//função retorna o username e a função set
    //cria um estado

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs',{
            username,
        });
        const { _id } = response.data;//capturando o id do username vindo do response
        history.push(`/dev/${_id}`);//enviando o id para a rota
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <input 
                    placeholder="Digite o usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}//html dispara toda vez que há alteração no input (evento)
                    />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

