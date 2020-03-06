import React, { Component } from 'react'
import apis from '../../services/api'
import { Link } from 'react-router-dom'
import Main from '../template/Main'
import { Redirect } from 'react-router-dom'


const headerProps = {
  icon: 'genre',
  title: 'Gênero',
  subtitle: 'Cadastro de novo Gênero!'
}

class NewGenre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      genres: [],
      series: [],
      genre: {}

    }
    this.saveGenre = this.saveGenre.bind(this)
    this.renderRows = this.renderRows.bind(this)
  }
  componentDidMount() {

    this.setState({ isLoading: true })
    apis.loadGenres()
      .then((res) => {
        this.setState({
          isLoading: false,
          genres: res.data,
          redirect: false,

        })
      })

  }
  getUpdatedList(genre, add = true) {

    const listGenre = this.state.genres.filter(u => u._id !== genre._id)
    if (add) listGenre.unshift(genre)
    return listGenre
  }
  remove(id) {

    apis.deleteGenre(id).then(res => {
      const genres = this.getUpdatedList(res.data, false)
      
      this.setState({ genres })
    })
  }
  load(genre) {
    this.setState({ genre: genre })
  }
  saveGenre(event) {
    const genre = this.state.genre
    if (genre._id) {
      alert("existe id")
      apis.UpdateGenres(genre)
        .then((res) => {
          apis.loadGenres().then(res => {
            const listGenre = res.data
            const genre = {}
            this.setState({ genres: listGenre, genre: genre })
          }
          )


        })
    } else {

      const newGenre = {
        name: this.refs.name.value

      }

      apis.StoreGenre(newGenre)
        .then((res) => {
          const listGenre = this.getUpdatedList(res.data)
          this.setState({ genres: listGenre, genre: {} })

        })

    }
  }
  clear() {
    const genre = { name: "" }
    this.setState({ genre })
    
  }
  renderRows() {
    return (this.state.genres.map(genres => {
      return (<tr key={genres._id}>

        <td><Link to={`series/${genres.name}`}>{genres.name}</Link>
        </td>
        <td>
          <button className="btn btn-warning"
            onClick={() => this.load(genres)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger ml-2"
            onClick={() => this.remove(genres._id)}>
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>)
    }))

  }
  updateField(event) {
    const genre = { ...this.state.genre }
    genre[event.target.name] = event.target.value
    this.setState({ genre })
  }




  renderTable(genres) {

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

  renderForm() {
    return (<section key="section" className="intro-section">
      {this.state.redirect &&
        <Redirect to={this.state.redirect} />
      }
      <h1>Novo Gênero</h1>
      <form key="form" >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome:</label> <input type="text" ref="name" name="name" className="form-control" onChange={e => this.updateField(e)} value={this.state.genre.name} /><br />
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col-12 d-flex justify-content-end">
            <button type='button' className="btn btn-primary" key="button" onClick={(e) => this.saveGenre(e)}>Salvar</button><br />
            <button type="button" className="btn btn-secondary ml-2" onClick={() => this.clear()}> Cancelar </button>
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
        {this.renderTable()}
      </Main>
    )

  }
}
export default NewGenre



