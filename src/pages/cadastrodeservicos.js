import '../App.css';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/navbar';
import PageHeader from '../components/page-header/PageHeader';
import axios from 'axios';
import { Component, useState } from 'react';


class CadastroDeServico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valor_mao_de_obra: 0,
            valor_total: 0,
            descricao: '',
            data_inicial: '',
            data_final: '',
            material_servico: [],
            auxiliares: [],
            materiaisRender: [],
            auxiliaresRender: [],
            quantidade_material: 0
        }
        this.adicionarMaterial = this.adicionarMaterial.bind(this)
        this.adicionarAuxiliar = this.adicionarAuxiliar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeValor = this.handleChangeValor.bind(this)
        // this.editarMaterial = this.editarMaterial.bind(this)
        this.getServico = this.getServico.bind(this)
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }
    handleChangeValor = e => {
        this.setState({ valor_total: this.state.valor_total + parseInt(this.state.valor_mao_de_obra) });
        console.log(this.state)
    }


    handleSubmit = async e => {
        e.preventDefault();

        let servico = {
            valor_mao_de_obra: this.state.valor_mao_de_obra,
            valor_total: this.state.valor_total,
            descricao: this.state.descricao,
            data_inicial: this.state.data_inicial,
            data_final: this.state.data_final,
            material_servico: this.state.material_servico,
            auxiliares: this.state.auxiliares
        }

        servico.material_servico["servico"] = []
        console.log(servico)
        axios({
            method: 'post',
            url: 'https://gerenciador-orcamento-backend.herokuapp.com/lisarservicos',
            data: servico
        }).then(function (response) {
            alert("Serviço cadastrado com sucesso!")
            window.location.href = 'https://gerenciador-orcamento-frontend.herokuapp.com/listarservicos'
            console.log(response.data)
        })
    }

    adicionarMaterial(material, preco, quantidade_disponivel) {
        if (this.state.quantidade_material <= quantidade_disponivel) {
            let material_servico = {
                material: material,
                quantidade_material: this.state.quantidade_material
            }
            this.setState(prevState => ({
                material_servico: [...prevState.material_servico, material_servico]
            }));
            this.setState({ valor_total: this.state.valor_total + (preco * this.state.quantidade_material) })
        }
        else {
            alert("Quantidade selecionada é maior que a disponível")
        }

    }

    adicionarAuxiliar(auxiliar, disponibilidade) {
        if (disponibilidade) {
            this.setState(prevState => ({
                auxiliares: [...prevState.auxiliares, auxiliar]
            }));
        } else {
            alert('Auxiliar não está disponível')
        }

    }

    async getMateriais() {
        try {
            await axios.get('https://gerenciador-orcamento-backend.herokuapp.com/materiais').then((response) => {
                this.setState({ materiaisRender: response.data })
            });

        } catch (error) {
            console.error(error);
        }
    }
    async getAuxiliares() {
        try {
            await axios.get('https://gerenciador-orcamento-backend.herokuapp.com/auxiliares').then((response) => {
                this.setState({ auxiliaresRender: response.data })
            });

        } catch (error) {
            console.error(error);
        }
    }

    async getServico() {
        const idServico = this.state === null ? "novo" : this.props.match.params.idservico;
        if (idServico === "novo") {
            this.setState({
                valor_mao_de_obra: 0,
                valor_total: 0,
                descricao: '',
                data_inicial: '',
                data_final: '',
                material_servico: [],
                auxiliares: [],
                quantidade_material: 0
            })
        } else {
            try {
                await axios.get(`https://gerenciador-orcamento-backend.herokuapp.com/servicos/${idServico}`).then((response) => {
                    this.setState({
                        valor_mao_de_obra: response.data.valor_mao_de_obra,
                        valor_total: response.data.valor_total,
                        descricao: response.data.descricao,
                        data_inicial: response.data.data_inicial,
                        data_final: response.data.data_final,
                        material_servico: response.data.material_servico,
                        auxiliares: response.data.auxiliares,
                    })
                });

            } catch (error) {
                console.error(error);
            }
        }
    }

    async componentDidMount() {
        this.getMateriais()
        this.getAuxiliares()
        this.getServico()
    }



    render() {
        return (
            <section>
                <Navbar />
                <PageHeader />
                <div class="main main-raised">
                    <div class="profile-content">
                        <div class="name">
                            <h3 class="titleservices">Cadastro de Serviços </h3>
                        </div>

                        <form class="formu" onSubmit={this.handleSubmit.bind(this)} method="post">
                        <div class="form-row dropdown col-12">
                                <div class="col">
                                <label for="valor_mao_de_obra">Valor Mão de Obra</label>
                                    <input required onChange={this.handleChange} value={this.state.valor_mao_de_obra} type="text" class="form-control" name="valor_mao_de_obra" id="valor_mao_de_obra" placeholder="Valor Mão de Obra" />
                                </div>
                                <div class="col">
                                <label for="data_inicial">Data Inicial</label>
                                    <input required onChange={this.handleChange} value={this.state.data_inicial} type="text" class="form-control" name="data_inicial" id="data_inicial" placeholder="Data Inicial" />
                                </div>
                                <div class="col">
                                <label for="data_final">Data Final</label>
                                    <input required onChange={this.handleChange} value={this.state.data_final} type="text" class="form-control" name="data_final" id="data_final" placeholder="Data Final" />
                                </div>
                                <div class="col">
                                <label for="descricao">Descrição</label>
                                    <input required onChange={this.handleChange} value={this.state.descricao} type="text" class="form-control" name="descricao" id="descricao" placeholder="Descrição" />
                                </div>
                                <div class="col">
                                <label for="valor_total">Valor Total</label>
                                <input readOnly value={this.state.valor_total} type="text" className="form-control" name="valor_total" id="valor_total" placeholder="Valor Total" />
                                </div>
                            </div>
                            <div class="form-row col-6">
                                
                                </div>
                            <div class="form-row col-14">

                                <button type="submit" class="btn btn-primary">Cadastrar  <i class="material-icons">add_task</i></button>
                            </div>
                        </form>
                        <div className='form-row col-14'>
                        <button onClick={this.handleChangeValor} type="button" class="btn btn-primary">Atualizar valor <i class="material-icons">autorenew</i></button>
                        </div>

                        <h5 className='form-row col-12'>Adicionar Prestador</h5>

                      

                        <table className="table col-12">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Tipo Servico</th>
                                    <th scope="col">Disponibilidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.auxiliaresRender.map((auxiliar, index) => {
                                    const { nome, email, telefone, tipo_servico, disponibilidade } = auxiliar
                                    return (
                                        <tr key={index}>
                                            <td>{nome}</td>
                                            <td>{telefone}</td>
                                            <td>{email}</td>
                                            <td>{tipo_servico}</td>
                                            <td>{disponibilidade === true ? 'sim' : 'não'}</td>
                                            <td><button class="btn btn-primary butao" onClick={this.adicionarAuxiliar.bind(this, auxiliar, disponibilidade)}><i class="material-icons">add_circle</i></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <h5 className='form-row col-12'>Adicionar Material</h5>

                        <table className="table col-12">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Qtd Disponível</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Cor</th>
                                    <th scope="col">Qtd Material</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.materiaisRender.map((material, index) => {
                                    const { id, preco, tipo, categoria, quantidade_disponivel, descricao, cor } = material
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{preco}</td>
                                            <td>{tipo}</td>
                                            <td>{categoria}</td>
                                            <td>{quantidade_disponivel}</td>
                                            <td>{descricao}</td>
                                            <td>{cor}</td>
                                            <td><input onChange={this.handleChange} type="text" class="form-control" name="quantidade_material " id="quantidade_material" placeholder="quantidade" /></td>
                                            <td><button class="btn btn-primary butao" onClick={this.adicionarMaterial.bind(this, material, preco, quantidade_disponivel)}><i class="material-icons">add_circle</i></button></td>
                                            <td><a class="nav-link nav-link active btn btn-primary butao" href="/materiais/{id}" role="tab" data-toggle="tab"><i class="material-icons">edit</i></a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <form class="formu" action="{{ url_for('calcular_valor_total') }}" method="post">
                            <div class="form-row col-11">

                            </div>
                        </form>


                        <form action="{{ url_for('servico') }}" method="post">
                            <div class="form-row col-10">



                            </div>
                            <div>

                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </section>
        );
    }
}

export default CadastroDeServico;