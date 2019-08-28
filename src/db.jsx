import axios from 'axios'

 const api = axios.create({
    baseURL: /* 'http://localhost:3333' */process.env.REACT_APP_API_URL
})

const apis ={
    loadGenres:()=> api.get('genre'),
    StoreGenre:(genre)=> api.post('genre',genre),
    deleteGenre: (genreId) => api.delete('genre/'+genreId),
    
    
    StoreSeries:(serie)=> api.post('serie',serie),
    UpdateSeries:(serie)=>api.put('serie/'+serie.id,serie),
    loadSeriesByGenre:(genre)=> api.get('serie/'+genre),
    loadSeries:()=> api.get('serie'),   
    deleteSeries: (serieId) => api.delete('serie/'+serieId),
    loadSeriesById:(id)=> api.get('serie/edit/'+id),
    Series: (serieId) => api.delete('serie/'+serieId),

       
}

export default apis  

 
  /* ola */
