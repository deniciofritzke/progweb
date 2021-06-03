
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HelloMessage from './paginas/Teste/HelloMessage';
import ListarLivros2 from './paginas/Teste/Livro2';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} component={HelloMessage} />
                <Route path='/livros' exact={true} component={ListarLivros2} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;