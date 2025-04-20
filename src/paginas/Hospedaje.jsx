import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import hospedajesdb from '../components/Hospedajesdb'
import useReserva from '../hooks/useReserva'
import Popupform from '../components/Popupform'
import Dorado from '../components/hospedajesection/Dorado'
import Multimedia from '../components/Multimedia'

const Hospedaje = () => {

  const params = useParams()
  const navigate = useNavigate()
  let idurl = +params.id
  const hospedaje = hospedajesdb.find(hosp => hosp.id === idurl) || false;
  const { fechainicio, fechafin, adultos, bebes, ninos, formulario, setFormulario } = useReserva()
  const [sectionbool, setSectionbool] = useState(false);
  const [noches, setNoches] = useState([])
  const [total, setTotal] = useState(0)
  const [multiactual, setmultiactual] = useState(hospedaje.images[0])
  const [visiblereservar, setVisiblereservar] = useState(true)
  const botonreservarref = useRef(null);
  
  const section = {
    1: <Dorado />
  }
  

  if(hospedaje === false){
    navigate("/")
  }

  //USE EFFECTS
  useEffect(() => {
    
    if(adultos <= 1 ){
      setFormulario(true)
    }
    document.title = `Monel | ${hospedaje.title}`
    if(section[hospedaje.id]){
      setSectionbool(true);
    }


    //Definir si se ve el boton
    const observer = new IntersectionObserver( entries => {
      if(entries[0].isIntersecting){
        setVisiblereservar(true)
      } else {
        setVisiblereservar(false)
      }
    })
  
    if(botonreservarref.current){
      observer.observe(botonreservarref.current)
    }

    return () => {
      if(botonreservarref.current) {
        observer.unobserve(botonreservarref.current);
      }
    }

  }, [])

  const agregarreserva = () => {
    localStorage.setItem('monelreserva', JSON.stringify({fechainicio, fechafin, adultos, ninos, bebes, total}))
    navigate('/checkout')
  }

  //defi
  const definirprecios = () => {

    let nochestemp = []
    const diainicio = fechainicio.slice(8,10)
    const diafin = fechafin.slice(8,10)

    //Revisa si tienen mes diferente (maximo rango es de 28 dias)
    if(fechainicio.slice(5,7) !== fechafin.slice(5,7)){
      const lastday = new Date(+fechainicio.slice(0,4),+fechainicio.slice(5,7),0)
      
      for(let i = +diainicio; i <= lastday.getDate(); i++){
        if(i < 10) {
          nochestemp = [...nochestemp, `${fechainicio.slice(0,4)}-${fechainicio.slice(5,7)}-0${i}`]
        } else {
          nochestemp = [...nochestemp, `${fechainicio.slice(0,4)}-${fechainicio.slice(5,7)}-${i}`]
        }
      }

      for(let i = 1; i < +diafin; i++){
        if(i < 10) {
          nochestemp = [...nochestemp, `${fechafin.slice(0,4)}-${fechafin.slice(5,7)}-0${i}`]
        } else {
          nochestemp = [...nochestemp, `${fechafin.slice(0,4)}-${fechafin.slice(5,7)}-${i}`]
        }
      }
      
    } else {
      for(let i = +diainicio; i < +diafin; i++){
        if(i < 10) {
          nochestemp = [...nochestemp, `${fechainicio.slice(0,4)}-${fechainicio.slice(5,7)}-0${i}`]
        } else {
          nochestemp = [...nochestemp, `${fechainicio.slice(0,4)}-${fechainicio.slice(5,7)}-${i}`]
        }
      }
    }

    setNoches(nochestemp); 

    //Definir totales
    
    let totaltemp = 0;
    let nochesalta = 0
    let nochesbaja = 0;

    for(let i = 0; i < nochestemp.length; i++){
      if(hospedaje.dateshigh.includes(nochestemp[i])){
        nochesalta++
      } else {
        nochesbaja++
      }
    }
    
    totaltemp = nochesalta*hospedaje.pricehigh[adultos] + nochesbaja*hospedaje.pricelow[adultos]

    setTotal(totaltemp)

  }


  useEffect( () => {
    definirprecios()
  }, [fechainicio, fechafin, adultos])

  return (
    <>
      {formulario === true ? <Popupform /> : ""}
      
      <div className="contenedor main-section">
        <div className="imagen-carousel">
          {multiactual.tipo === 'imagen' ? (
            <>
              <img src={multiactual.url} alt="" className="imagen-principal-producto" />
            </>
          ) : (
            <>
              <video className="imagen-principal-producto" autoPlay loop controls controlsList="nodownload">
                <source src={multiactual.url} />
              </video>
            </>
          )}
          <div className="carousel">
            {hospedaje.images.map(multimedia => (
              <Multimedia 
                key={multimedia.url} 
                multimedia={multimedia}
                setmultiactual={setmultiactual}
              />
            ))}
          </div>
        </div>
        <div className='info-card'>
          <p className='hosp-titulo'>{hospedaje.title}</p>
          <p className=' mb-2'>{hospedaje.city}</p>
          <div className=' flex gap-1'>
            <img className='estrella' src="/estrella.webp" alt="estrella" />
            <img className='estrella' src="/estrella.webp" alt="estrella" />
            <img className='estrella' src="/estrella.webp" alt="estrella" />
            <img className='estrella' src="/estrella.webp" alt="estrella" />
            <img className='estrella' src="/estrella.webp" alt="estrella" />
            <p>+ {hospedaje.id + 126} Reservas</p>
          </div>
          <p className='hosp-descripcion'>{`${hospedaje.rooms} Habit - ${hospedaje.bathrooms} Baños - ${hospedaje.parking} Parq`}</p>

          <p className='precio-antes'>${(total*1.4).toLocaleString('es-CO')}</p>
          <div className=' flex items-center gap-4'>
            <p className='precio-actual'>${total.toLocaleString('es-CO')}</p>
            <p className="oferta-text">40% DSTO</p>
          </div>
          <p className='num-noches'>{noches.length + 1} Dias ({noches.length} Noches)</p>

          <button ref={botonreservarref} className='boton-reservar' onClick={() => agregarreserva()}>Reservar Ahora</button>
          {formulario ? "" : (
            <button className={`${visiblereservar === true  ? 'hidden' : 'fijar-boton boton-reservar'}`} onClick={() => agregarreserva()}>Reservar Ahora</button>
          )}
          
          
          
          {sectionbool ? (section[hospedaje.id]) : ""}
          
          
        </div>
        
      </div>
    </>
  )
}

export default Hospedaje