import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useReserva from "../hooks/useReserva"

const Header = () => {

  const { fechainicio, fechafin, adultos, ninos, bebes, setFormulario } = useReserva()

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [fechamostrar, setFechamostrar] = useState('')

  //Crea la fecha nuevamente para manipularla y la cola en formato local T00:00 
  const fechainiciotemp = new Date(`${fechainicio}T00:00`)
  const fechafintemp = new Date(`${fechafin}T00:00`)
  
  const definirfechatexto = () => {

    //Mismo mes
    if(fechainiciotemp.getMonth() === fechafintemp.getMonth()) {
      setFechamostrar(`${fechainiciotemp.getDate()} - ${fechafintemp.getDate()} ${meses[fechainiciotemp.getMonth()]} ${fechainiciotemp.getFullYear()}`)
    } else {
      setFechamostrar(`${fechainiciotemp.getDate()} ${meses[fechainiciotemp.getMonth()].slice(0,5)} - ${fechafintemp.getDate()} ${meses[fechafintemp.getMonth()].slice(0,5)} ${fechafintemp.getFullYear()}`)
    }

  }

  useEffect(() => {
    if(fechafin && fechainicio){
      definirfechatexto()
    }
  }, [fechafin, fechainicio])

  

  return (
    <>
        <header>
          <div className="div-header contenedor">
            <Link to="/">
              <img className="logo" src="/logo.webp" alt="logo-monel" />
            </Link>
            <div className="filtros" onClick={() => setFormulario(true)}>
              <p className="font-bold">{fechamostrar}</p>
              <p>{adultos} adultos, {ninos} menores</p>
              
            </div>
            <nav>
              <svg xmlns="http://www.w3.org/2000/svg" className={`menuicono icon cursor-pointer icon-tabler icon-tabler-menu-2`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>  
            </nav>
          </div>
          
        </header>
    </>
  )
}

export default Header