import React, { Component } from 'react'
import apis from '../../db'

import { Redirect } from 'react-router-dom'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assitir'
}
const initialState = {

  isLoading: false,
  genres: [],
  serie: {}

}


class NewSeries extends Component {
  constructor(props) {
    super(props)
    /* this.state = {
      isLoading: false,
      genres: [],
      serie:{}
 
    } */
    this.state = initialState
    this.saveSeries = this.saveSeries.bind(this)
  }
  componentDidMount() {

    this.setState({ isLoading: true })
    apis.loadSeriesById()
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

    /* this.state.series.map(x => {
        if(x.name === this.refs.name.value){
        alert("serie já cadastrada!!!")

        }else{ */
    apis.UpdateSeries(newSeries)
      .then((res) => {
        console.log(newSeries)
        this.setState({
          redirect: '/series/' + this.refs.genre.value
        })
      })

    /*  } 
})  */

  }
  render() {
    return (

      <section className="intro-section">
        {/* <p>{JSON.stringify(this.state.serie)}</p> */}
        {this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <h1>Editar série</h1>
        <form key="form" >
          Nome: <input type="text" ref="name" className="form-control" defaultValue={this.state.serie.name} /><br />
        Status:
        <select type="text" ref="status" className="form-control">
            {Object
              .keys(statuses)
              .map(status => <option key={status} value={status}>{statuses[status]}</option>)}
          </select><br />
        Gênero:
        <select type="text" ref="genre" className="form-control">
            {this.state.genres
              .map(genre => <option key={genre.name} value={genre.name}>{genre.name}</option>)}
          </select><br />
        Comentários: <textarea ref="comments" type="text" className="form-control" />
          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-primary"
              onClick={this.saveSeries}>
              Salvar
                        </button>

            <button type="button" className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}>
              Cancelar
                        </button>
          </div>
          {/* <button  className="btn btn-success" key="button" type="button" onClick={this.saveSeries}>Salvar</button><br/> */}
        </form>
      </section>
    )
  }
}
export default NewSeries


