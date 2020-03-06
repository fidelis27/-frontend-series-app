import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

import "./styles.css"


const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = process.env.REACT_APP_API_URL + '/user'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

const api = axios.create({
    baseURL:process.env.REACT_APP_API_URL 
})


api.get('genre')
export default class UserCrud extends Component {

    state = { ...initialState }
    constructor() {
        super()
        api.get('user').then(resp => {
            this.setState({ list: resp.data })
        })

    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        
        const method = user._id ? 'put' : 'post'
        const url = user._id ? `${baseUrl}/${user._id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                
                if (!user._id) {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ user: initialState.user, list })
                } else {
                    axios.get(baseUrl).then(res => this.setState({ list: res.data }))
                }

            })
            this.clear();
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u._id !== user._id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row pl-3">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." required />
                        </div>
                    </div>

                </div>
                <div className="row pl-3">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." required />
                        </div>
                    </div>

                </div>

                <hr />
                <div className="row pl-3">
                    <div className=" d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user._id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
           
        })
    }
   

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>

                        <th>Nome</th>                        
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                    
                </tbody>
                
            </table>
        )
    }

    renderRows() {
        return this.state.list.map((user, index) => {
            return (<>
                <tr key={user._id}>

                    
                    {/* <td><Link to={`user/${user.name}`}>{user.name}</Link></td>                     */}
                    <td>{user.name}</td>
                    <td className="button">
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)} title="editar">
                            <i className="fa fa-pencil"></i>
                        </button>
                        
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}title="excluir">
                            <i className="fa fa-trash"></i>
                        </button>
                        <div id="user" className="user">email : {user.email} </div>
                    </td>
                    

                </tr>
                
                </>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
