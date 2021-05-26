import {Component} from "react";
import './App.css';

// Importa axios para fazer reqquisiçoes
import axios from "axios";

import Header from "./Components/Header";

import Form from "./Components/Form";

import RepoList from "./Components/RepoList";
class App extends Component{
        state = {
            repos : [],
            user : '',
            error :"",
        };

changeUser = user => {
          this.setState({user});
        };

// busca usuario
searchUser = async () => {
  const {user} = this.state;

  // colocando os resultados que estão no data e colocando numa const repos
  try {
    const { data: repos } = await axios.get( `https://api.github.com/users/${user}/repos`);
  

  console.log(repos);

  this.setState({repos, error : ''});
}
  catch(error){
    this.setState({
      error : 'Usuario não encontrado',
      repos : []
    });
  }
};

render (){
  const {user, repos, error} = this.state
   return(
    
    <div className = "App">
    <Header/>
       <Form
       changeUser = {this.changeUser}
       user = {user}
       error= {error}
       buttonAction={this.searchUser}
       />

       <RepoList repos={repos}/>
    
    </div>
   )

} 
}

export default App;
