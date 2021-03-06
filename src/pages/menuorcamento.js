import '../App.css';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/navbar';
import PageHeader from '../components/page-header/PageHeader';
import { Component } from 'react';


class MenuOrcamento extends Component {
    render() {
        return (
            <section>
                <Navbar />
                <PageHeader />
                <div class="main main-raised">
                    <div class="profile-content">
                        <div class="container">
                            <div class="name">
                                <h3 class="titleservices"> Orçamento </h3>
                            </div>
                        </div>
                        <div class="row form-row col-12">
                                    <ul class="nav nav-pills nav-pills-icons justify-content-center" role="tablist">
                                        <li class="nav-item col-6 orcament">
                                            <a class="nav-link nav-link active" href="/cadastroorcamento/novo" role="tab" data-toggle="tab">
                                                <i class="material-icons">add_box</i>
                                                Adicionar
                                            </a>
                                        </li>
                                        <li class="nav-item col-6">
                                            <a class="nav-link nav-link active" href="/listarorcamento" role="tab" data-toggle="tab">
                                                <i class="material-icons">view_list</i>
                                                Listar
                                            </a>
                                        </li>
                                    </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        )
    }
}

export default MenuOrcamento;
