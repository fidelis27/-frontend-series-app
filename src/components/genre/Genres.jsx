import React, { Component } from 'react'
import apis from '../../db'

import Main from '../template/Main'


const headerProps = {
  icon: 'Generos',
  title: 'Gêneros',
  subtitle: 'Listagem de Gêneros!'
}

class Genres extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      Genres: []
    }

    this.deleteGenres = this.deleteGenres.bind(this)
    this.renderRows= this.renderRows.bind(this)
    this.renderTable= this.renderTable.bind(this)

  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.loadGenres()

    
  }
  loadGenres(){
    apis.loadGenres()
      .then((res) => {

        this.setState({
          isLoading: false,
          Genres: res.data
        })
              })

  }
  getUpdatedList(genre, add = true) {
    const listGenre = this.state.genres.filter(u => u.id !== genre.id)
    if(add) listGenre.unshift(genre)
      return listGenre
  }
  deleteGenres(id) {
    console.log("id da serie", id)
    apis.deleteGenres(id)
      .then((res) => console.log("serie excluida com sucesso!!!"))

  }

  renderRows(genres) {
        return (this.state.Genres.map(genres=>{
          return(<tr key={genres.id}>
            
            <td>{genres.name}</td>            
            <td className="col-12 col-md-6" >
                <button className="btn btn-warning"
                    onClick={() => this.load(genres)}>
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="btn btn-danger ml-2"
                    onClick={() => this.remove(genres)}>
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>)
        }))           

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
  
  render() {
    return (

      <Main {...headerProps}>
        {this.state.isLoading && <p>Carregando, aguarde....</p>}
        {!this.state.isLoading && this.renderTable()}

      </Main>)
  }
}
export default Genres
