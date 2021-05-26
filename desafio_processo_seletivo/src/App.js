import Header from "./Components/Header";

import './App.css';
import { Component } from 'react';


class GitHub extends Component
{
  constructor(props)
  {
    super(props)
    this.state =
    {
      listaRepositorios : [],
      nome : ''
    }
  }

  buscarRepo = (element) =>
  {
    element.preventDefault();

    console.log('Função chamada')

    // url passando o nome como uma variavel
    fetch('https://api.github.com/users/' + this.state.nome + '/repos')

    // resposta como json
    .then(resposta => resposta.json())

    // atualiza a lista
    .then(lista => this.setState({ listaRepositorios : lista }))

    // Caso de algum erro, mostra no console
    .catch( erro => console.log(erro) )
  }

  // Atualiza o nome com o valor do inpput
  atualizaEstadoNome = async (nome) => 
  {                       //Nome state   //Valor Input
    await this.setState({ nome : nome.target.value })
    console.log(this.state.nome)
  }

  render()
  {
  return (
    <div className="App">
      <main>
        <section>
          {/* tras o componente header */}
          <Header/>
          <form onSubmit={this.buscarRepositorios}>
            <div>
              <input
              type="text"
              value={this.state.nome}
              
              onChange={this.atualizaEstadoNome}
              placeholder="Usuario do GitHub"
              />
              <button type="submit" onClick={this.buscarRepo}> Buscar </button>
            </div>
          </form>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th> ID </th>
                <th> Nome Repositorio </th>
                <th> Descrição </th>
                <th> Data de Criação </th>
                <th> Tamanho </th>
                <th> Stars </th>

              </tr>
            </thead>
            <tbody>
              {  this.state.listaRepositorios.map( (repositorio) => {           
                  return(
                    <tr key={repositorio.id}>
                      
                      <td className="repoItemContainer">{repositorio.id}</td>
                      <td className="repoItemContainer">{repositorio.name}</td>
                      <td className="repoItemContainer">{repositorio.description}</td>
                      <td className="repoItemContainer">{repositorio.created_at}</td>
                      <td className="repoItemContainer">{repositorio.size}</td>
                      <td className="repoItemContainer">{repositorio.stargazers_count}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>        
        </section>
      </main>
    </div>
    )
  }
}

export default GitHub;