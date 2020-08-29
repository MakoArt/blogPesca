import React from 'react';
import {firebase} from './firebase'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";

function App() {
  
  const[fecha,setFecha]=React.useState('')
  const [peces, setPeces] = React.useState([])
  const [pez, setPez] = React.useState('')
  const[longitudPez,setlongitudPez]=React.useState('')
  const[pesoPez,setpesoPez]=React.useState('')
  const[zona,setZona]=React.useState('')
  const[estacionAnual,setestacionAnual]=React.useState('')
  const[hora,setHora]=React.useState('')
  const[tecnica,setTecnica]=React.useState('')
  const[cebo,setCebo]=React.useState('')
  const[artificial,setArtificial]=React.useState('')
  const actualizar=''
  
   


     

  React.useEffect(() => {

    const obtenerDatos = async () => {

      try {

        const db = firebase.firestore()
        const data = await db.collection('peces').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData)
        setPeces(arrayData)
      
      } catch (error) {
        console.log(error)
      }

    }

    obtenerDatos()

  }, [])

  const agregar = async (e) => {
    e.preventDefault()

    if(!pez.trim()){
     
      return 
    }  
    
    

    try {

      const db = firebase.firestore()
      const nuevoPez = {
        nombre: pez,
        fecha: fecha,
        longitud:longitudPez,
        peso:pesoPez,
        zona:zona,
        estacionAnual:estacionAnual,
        hora:hora,
        tecnica:tecnica,
        cebo:cebo,
        artificial:artificial
     }
       
      const data = await db.collection('peces').add(nuevoPez)

      setPeces([
        ...peces,
        {...nuevoPez, id: data.id}
      
      
      
      ])
      setFecha('')
      setPez('')
      setlongitudPez('')
      setpesoPez('')
      setZona('')
      setestacionAnual('')
      setHora('')
      setTecnica('')
      setCebo('')
      setArtificial('')
      
    } catch (error) {
      console.log(error)
    }


  }

  const eliminar = async (id) => {
    try {
      
      const db = firebase.firestore()
      await db.collection('peces').doc(id).delete()

      const arrayFiltrado = peces.filter(item => item.id !== id)
      setPeces(arrayFiltrado)
  
    } catch (error) {
      console.log(error)
    }
  }

 
  

  

  return (
    <Router>
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 ">
         <Switch>
         <Route path="/listado">
          <h3 className="text-center">Lista de Capturas</h3>
           <div id="contenedorImg">
            
            <div id="pez"></div>


           </div>
          <ul className="list-group">
            {
              peces.map(item => (
                <h4><li className="list-group-item" key={item.id}>
          
                 <li><span>Nombre:</span>{item.nombre}</li>     
                 <li><span>Longitud:</span>{item.longitud}</li> 
                 <li><span>Peso:</span>{item.peso}</li>     
                 <li><span>Hora:</span>{item.hora}</li> 
                 <li><span>Estacion:</span>{item.estacionAnual}</li>    
                 <li><span>Zona:</span>{item.zona}</li>    
                 <li><span>Técnica de pesca:</span>{item.tecnica}</li>  
                 <li><span>Cebo:</span>{item.cebo}</li>   
                 <li><span>Señuelo:</span>{item.artificial}</li> 
                   
                   
                 
                  <button 
                    className="btn btn-danger  float-right btn-block" id="eliminar"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  
                   
                     
                     <Link to="/">
                    <button 
                    className="btn btn-success btn-block float-right" id="ocultar">Ocultar
                    </button>
                    </Link>
               
                </li></h4>
               
              ))
            }
          </ul>
         </Route>
          </Switch>
        </div>
        <div className="col-md-6 ">
          
          <Switch>
          <Route path="/">
          <form onSubmit={ agregar}>
            <h6>Ingrese nombre de pez</h6>
            <input 
              type="text"
          
              className="form-control mb-2"
              onChange={e => setPez(e.target.value)}
              value={pez}
              
            /> 
              <h6>Ingrese longitud de pez</h6>
            <input 
              type="text"
         
              className="form-control mb-2"
              onChange={e => setlongitudPez(e.target.value)}
              value={longitudPez}
            />
              <h6>Ingrese peso de pez</h6>
            <input 
              type="text"
      
              className="form-control mb-2"
              onChange={e => setpesoPez(e.target.value)}
              value={pesoPez}
            />
              <h6>Ingrese hora de captura</h6>
            <input 
              type="text"
        
              className="form-control mb-2"
              onChange={e => setHora(e.target.value)}
              value={hora}
            />
             <h6>Ingrese estación anual</h6>
            <input 
              type="text"
        
              className="form-control mb-2"
              onChange={e => setestacionAnual(e.target.value)}
              value={estacionAnual}
            />
              <h6>Ingrese zona de pesca</h6>
            <input 
              type="text"
         
              className="form-control mb-2"
              onChange={e => setZona(e.target.value)}
              value={zona}
            />
            
            <h6>Ingrese técnica de pesca</h6>
            <input 
              type="text"
         
              className="form-control mb-2"
              onChange={e => setTecnica(e.target.value)}
              value={tecnica}
            />
             <h6>Ingrese cebo utilizado</h6>
            <input 
              type="text"
          
              className="form-control mb-2"
              onChange={e => setCebo(e.target.value)}
              value={cebo}
            />
              <h6>Ingrese señuelo</h6>
            <input 
              type="text"
     
              className="form-control mb-2"
              onChange={e => setArtificial(e.target.value)}
              value={artificial}
            />
         
            <button 
              className={
                actualizar ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              }
              type="submit" id="agregar"
            >
              {
                actualizar? 'Editar' : 'Agregar'
              }
              
            </button>
        
              <Link to="/listado">
              <button  className="btn btn-success btn-block" id="verResultados">Ver resultados
              </button>
            </Link>
          </form>
           </Route>
        </Switch>
        </div>
      
      </div>
    </div>
     
    </Router>
  );
}

export default App;