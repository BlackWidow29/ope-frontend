import '../App.css';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/navbar';
import PageHeader from '../components/page-header/PageHeader';
import axios from 'axios';
import { Component } from 'react';



class ListarOrcamento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orcamentosRender: []
        }

        this.getOrcamento = this.getOrcamento.bind(this)
    }

    async getOrcamento() {
        try {
            await axios.get('https://gerenciador-orcamento-backend.herokuapp.com/orcamentos').then((response) => {
                this.setState({ orcamentosRender: response.data })
            });

        } catch (error) {
            console.error(error);
        }
    }

    async componentDidMount() {
        this.getOrcamento()
    }

    render() {


        return (
            <section>
                <Navbar />
                <PageHeader />
                <div class="main main-raised">
                    <div class="profile-content">
                        <div class="name">
                            <h3 class="titleservices">Orçamentos </h3>
                        </div>

                        <table className="table col-9">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Observações</th>
                                    <th scope="col">valor total</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orcamentosRender.map((orcamento, index) => {
                                    const { id, observacoes, valor_total } = orcamento
                                    console.log(orcamento)
                                    return (
                                        <tr class="form " key={id}>
                                            <td>{id}</td>
                                            <td>{observacoes}</td>
                                            <td>{valor_total}</td>
                                            <td><a class="nav-link nav-link active btn btn-primary butao" href={`/cadastroorcamento/${id}`} role="tab" data-toggle="tab"><i class="material-icons">edit</i></a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div class="form-row col-12">
                            <div class="col-5">
                                <a class="nav-link nav-link active btn btn-primary " href="/cadastroorcamento/novo" role="tab" data-toggle="tab">Adicionar<i class="material-icons">app_registration</i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        );
    }
}

export default ListarOrcamento;
