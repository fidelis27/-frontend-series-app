import React, { Component } from 'react'
import apis from '../../db'

import Main from '../template/Main'
import { Redirect } from 'react-router-dom'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assitir'
}

const headerProps = {
  icon: 'series',
  title: 'Séries',
  subtitle: 'Cadastro de nova série!'
}

class NewSeries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      genres: [],
      series: []

    }
    this.saveSeries = this.saveSeries.bind(this)
  }
  componentDidMount() {

    this.setState({ isLoading: true })
    
    apis.loadSeries()
      .then((res) => {
        this.setState({
          isLoading: false,
          series: res.data

        })
      })
    apis.loadGenres()
      .then((res) => {
        this.setState({
          isLoading: false,
          genres: res.data,
          redirect: false

        })
      })
    
  }
   
  saveSeries() {
    const newSeries = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

     
      if ('' === this.refs.name.value) {
        
      } else {
        
        apis.StoreSeries(newSeries)
          .then((res) => {
                        this.setState({
              redirect: '/series/' + this.refs.genre.value
            })
          })
      }     
     


  }
  renderForm() {
    return (<section className="intro-section">
      {this.state.redirect &&
        <Redirect to={this.state.redirect} />
      }

      
      <h1>Nova série</h1>

      <form key="form" >
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Nome</label>
              <input className="form-control" type="text" ref="name"  required />
              
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Status</label>
              <select type="text" ref="status" className="form-control">
                {Object
                  .keys(statuses)
                  .map(status => <option key={status} value={status}>{statuses[status]}</option>)}
              </select>
              <div className="help-block with-errors"></div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Gênero</label>
              <select type="text" ref="genre" className="form-control">
                {this.state.genres
                  .map(genre => <option key={genre.name} value={genre.name}>{genre.name}</option>)}
              </select>
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Comentários</label>
              <textarea ref="comments" type="text" className="form-control" />
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" type="button"
                            onClick={this.saveSeries}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
      </form>
    </section>
    )
  }
  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
      </Main>
    )

  }
}
export default NewSeries


//rua professor osvaldo martins cruz 276