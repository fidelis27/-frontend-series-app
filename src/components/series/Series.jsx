import React, {Component} from 'react'
import apis from '../../db'
import {Link} from 'react-router-dom'
import Main from '../template/Main'
import { Redirect } from 'react-router-dom'

import "./series.css"

const statuses= {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assitir'
}
const headerProps = {
  icon: 'séries',
  title: 'Séries',
  subtitle: 'Listagem por Gêneros!'}

class Series extends Component {
  
    constructor(props){
        super(props)

        this.state = {
            isLoading:false,
            series:[],
            redirect:false
        }
        this.renderSeries = this.renderSeries.bind(this)
        this.deleteSeries= this.deleteSeries.bind(this)
        
    }
    
    componentDidMount(){
        this.setState({isLoading:true})
        this.loadGenres()
       
    }
    loadGenres(){
        apis.loadSeriesByGenre(this.props.match.params.genre)
       .then((res)=>{
        
           this.setState({
               isLoading:false,
               series:res.data
           })
       })

    }
    deleteSeries(serie){
        console.log("id da serie",serie._id)
        apis.deleteSeries(serie._id)
        .then((res)=>{
        this.loadGenres()
        this.setState({redirect: '/series/'+serie.genre })
        console.log("serie excluida com sucesso!!!")}
        )
        

    }
    
    renderSeries(series){
        return(<div className="col-xs-10 col-md-6  mt-5" key={series._id}>
            {this.state.redirect && <Redirect to={this.state.redirect}/>}
            <div className="item ">
              <div className="thumbnail">
                <img className="group list-group-image" src="" alt="" />
                <div className="caption">
                  <h4 className="group inner list-group-item-heading justify-content-center  ">
                     {series.name}</h4>
                  <div className="row">
                    <div className="justify-content" >
                      <p className="lead ml-5">
                       {series.genre}/{statuses[series.status]}</p>
                    </div>
                    <hr/>
                    </div>
                    <div className="row"> 
                    <div className="d-flex justify-content">
                      <Link  className="btn btn-success" to={'/series/edit/'+ series._id}>Editar</Link>
                      <button type="button"  className="btn btn-danger ml-5" onClick={()=> this.deleteSeries(series)}>Excluir</button>
                    </div>
                    </div>
                    <hr/>
                  
                </div>
              </div>
            </div>
            
        </div>)
    }
    renderForm(){
      return(
        <section id="intro" className="intro-section">
            <h1> 
                Série {this.props.match.params.genre}
            </h1>
           {this.state.isLoading && <p>Carregando, aguarde....</p> }
           {!this.state.isLoading && this.state.series.length === 0 &&
            <div className='alert alert-info'>Nenhuma série Cadastrada</div>
            }
        <div id="series" className="row list-group">
            {!this.state.isLoading &&
              this.state.series.map(this.renderSeries)
              }
        </div>
        </section>
        )
    }
    render(){
        return ( 
          
        <Main {...headerProps}>
          {this.renderForm()}    
        </Main>)
        }
}
export default Series
