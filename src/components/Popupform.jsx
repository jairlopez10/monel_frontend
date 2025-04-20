import useReserva from "../hooks/useReserva"
import { useState } from "react";
import Alerta from "./Alerta";

const Popupform = () => {

    const { fechainicio, fechafin, adultos, ninos, bebes, setFechainicio, setFechafin, setAdultos, setNinos, setBebes, setFormulario} = useReserva();
    const fechahoy = new Date()
    const [alerta, setAlerta] = useState(false);

    const mindate = `${fechahoy.getFullYear()}-${(fechahoy.getMonth()+1) < 10 ? `0${(fechahoy.getMonth()+1)}` :  fechahoy.getMonth()+1}-${fechahoy.getDate()}`


    //HANDLE EL BUSCAR
    const handlesubmit = () => {
        
        if(fechainicio && fechafin){
            setFormulario(false)
        } else {
            setAlerta(true)
            setTimeout(() => {
                setAlerta(false)
            }, 3000);
        }


    }

    //CAMBIAR CONTADOR
    const cambiarcont = (tipo, pers) => {

        if(tipo === 'menos'){
            if(pers === 'adultos'){
                if(adultos !== 1) {
                    setAdultos(adultos - 1)
                }
            }
            if(pers === 'ninos') {
                if(ninos !== 0) {
                    setNinos(ninos - 1)
                }
            }
            if(pers === 'bebes') {
                if(bebes !== 0) {
                    setBebes(bebes - 1)
                }
            }
        } else {
            if(pers === 'adultos'){
                setAdultos(adultos + 1)
            }
            if(pers === 'ninos') {
                setNinos(ninos + 1)
            }
            if(pers === 'bebes') {
                setBebes(bebes + 1)
            }
        }
    }
    

  return (
    <>
        <div className="div-backpopup">
            <div className="div-popup">
                <h4>¿Cuándo?</h4>
                <div className="div-cuando">
                    <div className="div-fecha">
                        <label htmlFor="ingreso">Ingreso: <span className="text-red-600 font-bold">*</span></label>
                        <input type="date" id="ingreso" value={fechainicio} min={mindate} onChange={(e) => setFechainicio(e.target.value)} />
                    </div>
                    <div className="div-fecha">
                        <label htmlFor="salida">Salida: <span className="text-red-600 font-bold">*</span></label>
                        <input type="date" id="salida" min={fechainicio} value={fechafin} onChange={(e) => {
                            setFechafin(e.target.value)
                            
                        }} />
                    </div>
                </div>
                <h4 className=" mt-4 mb-4">¿Quiénes?</h4>
                <div className="div-personas">
                    <div className="div-persona">
                        <div className="div-personatexto">
                            <p className="tit-persona">Adultos <span className="text-red-600 font-bold">*</span></p>
                            <p className="desc-persona">+ 11 años</p>
                        </div>
                        <div className="div-selectores">
                            <button className="selector" onClick={() => cambiarcont('menos', 'adultos')}>-</button>
                            <p>{adultos}</p>
                            <button className="selector" onClick={() => cambiarcont('mas', 'adultos')}>+</button>
                        </div>
                    </div>
                    <div className="div-persona mt-4">
                        <div className="div-personatexto">
                            <p className="tit-persona">Niños</p>
                            <p className="desc-persona">5 - 11 años</p>
                        </div>
                        <div className="div-selectores">
                            <button className="selector" onClick={() => cambiarcont('menos', 'ninos')}>-</button>
                            <p>{ninos}</p>
                            <button className="selector" onClick={() => cambiarcont('mas', 'ninos')}>+</button>
                        </div>
                    </div>
                    <div className="div-persona mt-4">
                        <div className="div-personatexto">
                            <p className="tit-persona">Bebés</p>
                            <p className="desc-persona">Menos 5 años</p>
                        </div>
                        <div className="div-selectores">
                            <button className="selector" onClick={() => cambiarcont('menos', 'bebes')}>-</button>
                            <p>{bebes}</p>
                            <button className="selector" onClick={() => cambiarcont('mas', 'bebes')}>+</button>
                        </div>
                    </div>
                </div>
                {alerta ? <Alerta msg='Las fechas son obligatorias' /> : ""}
                <div className="div-botonbuscar">
                    <button onClick={() => handlesubmit()} className="buscar-popup">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        Buscar</button>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Popupform