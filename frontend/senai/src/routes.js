
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HelloMessage from './paginas/Teste/HelloMessage';
import ListarLivros from './paginas/livro/ListarLivros';
import CadastrarLivro from './paginas/livro/CadastrarLivro';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} component={HelloMessage} />
                <Route path='/livros' exact={true} component={ListarLivros} />
                <Route path='/livro' exact={true} component={CadastrarLivro} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;