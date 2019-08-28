
import React, { Component } from 'react'
import apis from '../../db'
import { Link } from 'react-router-dom'

/* import App from '../../Portfolio' */

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            genres: []

        }
    }
    componentDidMount() {

        this.setState({ isLoading: true })
        apis.loadSeries()
            .then((res) => console.log(res.data))
        apis.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data

                })
            })
        console.log(this.genres)
    }


    renderGenreLink(genre) {
        return (
            <span key={genre.name}>&nbsp;<Link to={`/series/${genre.name}`} >{genre.name}</Link>&nbsp;</span>
        )

    }
    render() {
        return (
            <div>
                
                <section>
                    {this.state.isLoading && <span>aguarde, carregando.....</span>}
                    {!this.state.isLoading &&
                        <aside className="link">
                            <span className="link">{this.state.genres.map(this.renderGenreLink)}</span>
                        </aside>}

                </section>

            </div>)
    }


}
export default Home


