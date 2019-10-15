import React from 'react';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';

export default function Main({match}){//match possui todos os parâmetros passados para essa rota
    return(
        <div className="main-container">
            <img src={logo} alt="Tindev"></img>
            <ul>
                <li>
                    <img src="https://avatars2.githubusercontent.com/u/32266873?v=4" alt=""/>
                    <footer>
                        <strong>Diogo Cardoso</strong>
                        <p>Estudante do curso Superior de Sistemas para Internet no IFPB. Apaixonado por desenvolvimento de games e web.</p>
                    </footer>

                    <div className="button">
                        <button type="button">
                            <img src={dislike} alt="Dislike"/>
                        </button>
                        <button type="button">
                            <img src={like} alt="Like"/>
                        </button>
                        
                    </div>
                </li>

                <li>
                    <img src="https://avatars2.githubusercontent.com/u/32266873?v=4" alt=""/>
                    <footer>
                        <strong>Diogo Cardoso</strong>
                        <p>Estudante do curso Superior de Sistemas para Internet no IFPB. Apaixonado por desenvolvimento de games e web.</p>
                    </footer>

                    <div className="button">
                        <button type="button">
                            <img src={dislike} alt="Dislike"/>
                        </button>
                        <button type="button">
                            <img src={like} alt="Like"/>
                        </button>
                        
                    </div>
                </li>

                <li>
                    <img src="https://avatars2.githubusercontent.com/u/32266873?v=4" alt=""/>
                    <footer>
                        <strong>Diogo Cardoso</strong>
                        <p>Estudante do curso Superior de Sistemas para Internet no IFPB. Apaixonado por desenvolvimento de games e web.</p>
                    </footer>

                    <div className="button">
                        <button type="button">
                            <img src={dislike} alt="Dislike"/>
                        </button>
                        <button type="button">
                            <img src={like} alt="Like"/>
                        </button>
                        
                    </div>
                </li>
            </ul>
        </div>
    );
}