import React, {Component } from 'react'
import apis from '../../db'
import { Link } from 'react-router-dom'
import Main from '../template/Main'
import {Redirect} from 'react-router-dom'


const headerProps = {
    icon: 'genre',
    title: 'Gênero',
    subtitle: 'Cadastro de novo Gênero!'
}

class NewGenre extends Component{
    constructor(props) {
        super(props)
        this.state = {
          isLoading: false,
          genres: [],
          series:[]
    
        }
        this.saveGenre = this.saveGenre.bind(this)
        this.renderRows= this.renderRows.bind(this)
      }
      componentDidMount() {

        this.setState({ isLoading: true })
        apis.loadGenres()
          .then((res) => {
            this.setState({
              isLoading: false,
              genres: res.data,
              redirect:false
    
            })
          })
        console.log(this.genres)
      }
      getUpdatedList(genre, add = true) {
        console.log('lista antes', this.state.genres)
        const listGenre = this.state.genres.filter(u => u.id !== genre.id)
        if(add) listGenre.unshift(genre)
          return listGenre
      }
      remove(id) {
        console.log("id", id)
        apis.deleteGenre(id).then(res => {
            const genres = this.getUpdatedList(res.data, false)
            console.log('lista depois', this.state.genres)
            this.setState({ genres })
        })
      }
      saveGenre(){
         var name = this.refs.name.value
                  const newGenre={
          name: name,
          
        }
        
        /* this.state.series.map(x => {
            if(x.name === this.refs.name.value){
            alert("serie já cadastrada!!!")

            }else{ */
                 apis.StoreGenre(newGenre)
                 .then((res)=>{
                  const listGenre = this.getUpdatedList(res.data)
                  this.setState({ genres: listGenre })
                     /* this.setState({
                        redirect:'/genres/'  +this.refs.name.value
                         
                     }) */
                 })
                 
                
                
        
      }
      renderRows() {
        return (this.state.genres.map(genres=>{
          return(<tr key={genres.id}>
            
            <td><Link to={`series/${genres.name}`}>{genres.name}</Link></td>            
            <td>
                <button className="btn btn-warning"
                    onClick={() => this.load(genres)}>
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="btn btn-danger ml-2"
                    onClick={() => this.remove(genres.id)}>
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
  
      renderForm(){
          return(<section key="section" className="intro-section"> 
          {this.state.redirect &&
             <Redirect to={this.state.redirect}/>
          }
           <h1>Novo Gênero</h1>
            <form key="form" >
             Nome: <input type="text" ref="name" className="form-control text-uppercase"/><br/>
                          <button  className="btn btn-success" key="button" type="button" onClick={this.saveGenre}>Salvar</button><br/>
            </form>
         </section>
         )
      }
    render(){
    return (
          <Main {...headerProps}>
               {this.renderForm()}  
               {this.renderTable()}  
          </Main>
    )
       
    }  
}  
export default NewGenre


//rua professor osvaldo martins cruz 276