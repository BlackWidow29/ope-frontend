import React from 'react';
import '../App.css';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/navbar';
import PageHeader from '../components/page-header/PageHeader';

import axios from 'axios';
class cadastroDeAuxiliares extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            telefone: '',
            nome: '',
            tipo_servico: '',
            disponbibilidade: '',
            email: ''
        }

    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    handleSubmit = async e => {
        e.preventDefault();

        let auxiliar = {
            telefone: this.state.telefone,
            nome: this.state.nome,
            tipo_servico: this.state.tipo_servico,
            disponbibilidade: true,
            email: this.state.email
        }

        axios({
            method: 'post',
            url: 'http://localhost:8081/auxiliares',
            data: auxiliar
        }).then(function (response) {
            console.log(response.data)
        })


    }


    render() {
        return (
            <section>
                <Navbar />
                <PageHeader />


                <div class="main main-raised">
                    <div class="avatar">
                    </div>
                    <div class="name">
                        <h3 class="titleservices">Auxiliares</h3>
                    </div>

                    <form class="formu" onSubmit={this.handleSubmit.bind(this)} method="post">
                        <div class="form-row col-14">

                            <div class="col-3">
                                <input onChange={this.handleChange} type="text" class="form-control" name="nome" id="nome" placeholder="Nome" />
                            </div>

                            <div class="col-3">
                                <input onChange={this.handleChange} type="text" class="form-control" name="tipo_servico" id="tipo_servico" placeholder="Tipo de serviço" />
                            </div>


                            <div class="col-3">
                                <input onChange={this.handleChange} type="text" class="form-control" name="telefone" id="telefone" placeholder="Telefone" />
                            </div>


                            <div class="col-3">
                                <input onChange={this.handleChange} type="text" class="form-control" name="email" id="email" placeholder="E-mail" />
                            </div>

                        </div>
                        
                        <div class="form-row dropdown col-14">
                                <div class="dropdown col-3">
                                    <select class="form-control form-control-lg ">
                                        <option>Disponibilidade</option>
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
                                </div>
                            </div>

                        <div class="form-row col-9">
                            <button type="submit" class="btn btn-primary">Cadastrar</button>
                        </div>

                    </form>

                   
                    <form>
                        <div class="form-row col-9">


                        </div>
                    </form>

                </div>

                <Footer />
            </section>

        );
    }
}
export default cadastroDeAuxiliares;
