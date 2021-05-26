import {Component} from "react";

class TiposEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaTiposEvento : [],
            titulo : '',
            idTipoEventoAlterado : 0 
        }
    };

    // Campo de classe
    buscarTiposEventos = () => {
        //console.log("AGORA VAMOS CHAMAR")

        // Faz a chamada para a API usando o fetch
        fetch('http://localhost:5000/api/tiposeventos')
  
        // Define o tipo de dado do retorno da requisição(JSON)
        .then(resposta => resposta.json())

        // e atualiza o state listaTiposEvento com os dados obtidos
        .then(dados => this.setState({ listaTiposEvento : dados}))

        // Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro))
    }

    // Atualiza o state titulo com o valor do input
    atualizarEstadoTitulo = async(event) => {
                    // NomeEstado        : ValorInput
        await this.setState({ titulo : event.target.value})
        console.log(this.state.titulo)
    }

    // Função responsavel por cadastrar um tipo de evento
    cadastrarTipoEvento = (event) => {
        event.preventDefault();

        // Caso algum Tipo de Evento seja selecionado para a edição, 
        if (this.state.idTipoEventoAlterado !== 0){

            //Edição

        // faz a chamada para a api usando fetch e passando o ID do Tipo de Evento que será atualizado na url da requisição
        fetch('http://localhost:5000/api/tiposeventos/' + this.state.idTipoEventoAlterado, {
            
        // Define o metodo da resquisição (PUT)
            method: 'PUT',

            // Define o corpo da requisição especificando o tipo (JSON)
            // Em outras palavras, converte o state para uma string JSON
            body : JSON.stringify({ tituloTipoEvento : this.state.titulo }),

            // Define o cabeçalho da requisição
            headers : {
                "Content-Type" : "application/json"
            }
            })
            .then(resposta => {
            
                //Caso a requisição retorne um status code 204,
                if(resposta.status ===204){
                    console.log(
                    // exibe no console do navegador essa mensagem de exito
                    'Tipo de Evento ' + this.state.idTipoEventoAlterado + ' atualizado!',
                    'Seu novo titulo agora é: ' + this.state.titulo
                    )
                }

             } )
             .then(this.buscarTiposEventos)
             .then(this.limparCampos)
        }
        else{

        


        //Cadastro

        // Faz a chamada para a API usando fetch
        fetch('http://localhost:5000/api/tiposeventos', {
          
            // Define o metodo da resquisição (PoST)
            method : 'POST', 

            // Define o corpo da requisição especificando o tipo (JSON)
            // Em outras palavras, converte o state para uma string JSON
            body : JSON.stringify( {tituloTipoEvento : this.state.titulo}),

            // Define o cabeçalho da requisição
            headers : {
                "Content-Type" : "application/json"
            }
        })
     
        // Exibe isso no console
        .then(console.log("Tipo evento cadastrado"))

        // Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro))

        // Então, atualiza a lista de Tipos de Eventos
        // sem o usuario precisar executar outra ação
        .then(this.buscarTiposEventos)

        .then(this.limparCampos)
    }
    }
    // Chama a função buscarTiposEventos() assim que o componente é renderizado
    componentDidMount(){
        this.buscarTiposEventos();
        
    }

    //Recebe um tipo de evento da lista
    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            // Atualiza o state idtipoeventoatualizado
            idTipoEventoAlterado : tipoEvento.idTipoEvento,
            titulo : tipoEvento.tituloTipoEvento},
            () => {
                console.log(
                    // Exibe no console do navegador o valor do ID do tIPO eVENTO RECEBIDO
                    "O tipo de Evento "  +  tipoEvento.idTipoEvento + 'foi selecionado',
                    //e o idTipoEvento alterado
                     'agora o valor do state idTipoEventoAlterado é:' + this.state.idTipoEventoAlterado, 
                     'e o valor do state titulo é:' + this.state.titulo
                )
        

            
        })
    }

    excluirTipoEvento = (tipoEvento) =>
    {
        console.log('O tipo de evento ' + tipoEvento.idTipoEvento + 'foi selecionado')

        // Faz a chamada para a API usando fetch passando o ID do tipo de evento recebido na url da requisição
        fetch('http://localhost:5000/api/tiposeventos/' + tipoEvento.idTipoEvento, {
          
            // Define o metodo da resquisição (PoST)
            method : 'DELETE'
    })
    // Caso a requisição retorne um status code 204
    .then(resposta => {
        if(resposta.status === 204){
            // Exibe no console do navegador a mensagem
            console.log('Tipo de Evento ' +tipoEvento.idTipoEvento+'excluido!')
        }
    })
    // Caso de erro, mostra o erro no console
    .catch(erro => console.log(erro))

    // Mostra a lista atualizada
    .then(this.buscarTiposEventos)
}
    //Reseta os states titulo e id
    limparCampos= () => {
        this.setState({
            titulo : '',
            idTipoEventoAlterado : 0
        })

        //exibe a mensagem no console
        console.log('Os states foram resetados!')
    }


    render(){
        return(
            <div>
                <main>
                    <section>
                    <h2> Lista de tipos de eventos</h2>
                    <table>
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Titulo</th>
                            <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* Trazer os dois objetos criados, usando o map */}
                                {
                                    this.state.listaTiposEvento.map( (tipoEvento) => {
                                        return (
                                            <tr key={tipoEvento.idTipoEvento}>
                                                <td>{tipoEvento.idTipoEvento}</td>
                                                <td>{tipoEvento.tituloTipoEvento}</td>

                                                {/* Faz a chamada da função passando o tipoevento selecionado */}
                                                
                                                
                                                <td><button onClick={() => this.buscarTipoEventoPorId(tipoEvento)}>Editar</button></td>

                                                {/* Faz a chamada da função passando o tipoevento selecionado */}
                                                <td><button onClick={() => this.excluirTipoEvento(tipoEvento)}>Excluir</button></td>



                                            </tr>
                                        )
                                    } )
                                }
                            </tbody>
                       
                    </table>
                    </section>

                    <section>
                        <h2>Cadastro de Tipo Evento</h2>

                        <form onSubmit={this.cadastrarTipoEvento}>
                            <div>
                                <input
                                    type="text"
                                    value={this.state.titulo}
                                    onChange={this.atualizarEstadoTitulo}
                                    placeholder="Titulo do Tipo de Evento"
                                    />

                                    {/* <button type="submit">Cadastrar</button> */}


                                   
                                    {/* Estrutura do if ternário */}
                                    {/* condição ? faço algo, caso seja verdade : faço algo, caso seja falso */}


                                     {/* Altera o botão de acordo com a operação usando if ternario */}
                                    {/* {
                                        this.state.idTipoEventoAlterado === 0 ? 
                                        <button type="submit">Cadastrar</button> :
                                        <button type="submit">Atualizar</button>
                                    }  */}

                                    {/* Uma outra forma, com IF ternario e disable ao mesmo tempo */}

                                    {
                                        <button type="submit" disabled={this.state.titulo === '' ? 'none' : ''}>
                                            {
                                                this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar'
                                            }
                                        </button>
                                    }

                                    <button type="button" onClick={this.limparCampos}>
                                        Cancelar
                                    </button>

                                        
                            </div>
                        </form>


                        {/* Caso algum Tipo de Evento tenha sido selecionado para edição, exibe a mensagem de feedback ao usuario */}
                        {
                            this.state.idTipoEventoAlterado !== 0 && 
                            <div>
                                <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado </p>
                                <p>Clique em cancelar, caso queria cancelar a operação, antes de cadastrar um novo tipo de evento</p>
                            </div>
                        }
                    </section>
                </main>
            </div>
    
        )
}
}

export default TiposEventos;