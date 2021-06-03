import React, { useState, useEffect } from 'react';
//import './style.css';
import api from '../services/api';

// instalar axios: npm install axios
// criar componente para listar livros

function ListarLivros() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        api.get('livros', {}).then(response => {
            setLivros(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Livros</h1>
            <ul>
                {
                    livros.map(livro => (
                        <li>
                            <p>Id: {livro.liv_codigo}</p>
                            <p>Nome: {livro.liv_descricao}</p>
                            <p>Autor: {livro.liv_autor}</p>
                            <p>isbn: {livro.liv_isbn}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}


export default ListarLivros;