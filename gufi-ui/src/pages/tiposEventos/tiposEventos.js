import {Component} from "react";

class TiposEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaTiposEvento : [],
            titulo : ''
        }
    };

    // Campo de classe
    buscarTiposEventos = () => {
        console.log("AGORA VAMOS CHAMAR")

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
    }

    // Chama a função buscarTiposEventos() assim que o componente é renderizado
    componentDidMount(){
        this.buscarTiposEventos();
        
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
                                    <button type="submit">Cadastrar</button>
                                        
                            </div>
                        </form>
                    </section>
                </main>
            </div>
    
        )
}
}

export default TiposEventos;