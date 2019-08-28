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
      .then((res) => console.log(res.data))
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
    console.log(this.genres)
  }
  saveSeries() {
    const newSeries = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

     
      if ('' === this.refs.name.value) {
        alert("serie já cadastrada!!!")
        this.refs.vazio.value = "serie já cadastrada!!!"

      } else {
        console.log('else')
        apis.StoreSeries(newSeries)
          .then((res) => {
            console
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
      <label className="alert alert-info" ref="vazio"></label>
      <form key="form" data-toggle="validator" >

        Nome: <input type="text" ref="name" className="form-control" required/><br />
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
        <div className="d-flex justify-content-center"><button className="btn btn-success mt-3 " key="button" type="button"
          onClick={this.saveSeries}>Salvar</button></div><br />
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