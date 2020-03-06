import React, { Component } from 'react'
import apis from '../../services/api'
import Main from '../template/Main'

import { Redirect } from 'react-router-dom'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assitir'
}

const headerProps = {
  icon: 'séries',
  title: 'Séries',
  subtitle: 'Editar série!'
}


const initialState = {

  isLoading: false,
  genres: [],
  serie: {}

}

class NewSeries extends Component {
  

  constructor(props) {
    super(props)

    this.state = initialState
    this.saveSeries = this.saveSeries.bind(this)
  }
 
  componentDidMount() {

    this.setState({ isLoading: true })
    apis.loadSeriesById(this.props.match.params.id)
      .then((res) => console.log(res.data))
    apis.loadSeriesById(this.props.match.params.id)
      .then((res) => {
        this.setState({
          isLoading: false,
          serie: res.data

        })
        this.refs.name.value = this.state.serie.name
        this.refs.status.value = this.state.serie.status
        this.refs.genre.value = this.state.serie.genre
        this.refs.comments.value = this.state.serie.comments
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
  clear() {
    this.setState({ initialState })
  }

  saveSeries() {
    const newSeries = {      
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }   
   
    apis.UpdateSeries(this.props.match.params.id, newSeries)
    .then((res) => {       
        this.setState({
          redirect: '/series/' + this.refs.genre.value
        })     
      })
 
  }
  renderForm() {
    return (<section className="intro-section">
      {this.state.redirect &&
        <Redirect to={this.state.redirect} />
      }
      <h1>Editar série</h1>
      <form key="form" >
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" ref="name" className="form-control " defaultValue={this.state.serie.name} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-6">
            <div className="form-group">
              <label>Status</label><select type="text" ref="status" className="form-control">
                {Object
                  .keys(statuses)
                  .map(status => <option key={status} value={status}>{statuses[status]}</option>)}
              </select>
            </div>
          </div>


          <div className="col-6 col-md-6">
            <div className="form-group">
              <label>Gênero</label>
              <select type="text" ref="genre" className="form-control">
                {this.state.genres
                  .map(genre => <option key={genre.name} value={genre.name}>{genre.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Comentários</label>
              <textarea ref="comments" type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-primary"
            onClick={this.saveSeries}>
            Salvar
            </button>

          <button type="button" className="btn btn-secondary ml-2"
            onClick={e => this.setState({
              redirect: `/series/${this.state.serie.genre}`
            })}>
            Cancelar
            </button>

        </div>
      </form>
    </section >

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


