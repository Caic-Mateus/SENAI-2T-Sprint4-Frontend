import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'; 

import './index.css';

import App from './pages/home/App';
import NotFound from './pages/notFound/notFound';
import TiposEventos from './pages/tiposEventos/tiposEventos';

import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/> {/* Home */}
        <Route path="/tiposeventos" component={TiposEventos}/> {/* Tipos Eventos */}
        <Route path="/notFound" component={NotFound}/> {/* Not Found */}

        <Route to="/notFound"/> {/* redireciona para Not Found caso nenhuma outra seja encontrada*/}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
  