import React from 'react';
import {BrowserRouter, Router, Switch} from 'react-router-dom';
import HelloMessage from './HelloMessage';
import Teste from './paginas/Teste';

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Router path='/' exact={true} component={HelloMessage}/>
                <Router path='/teste' exact={true} component={Teste}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;