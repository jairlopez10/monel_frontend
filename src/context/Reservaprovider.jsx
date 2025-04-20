import { createContext, useState } from "react";

const Reservacontext = createContext()

const Reservaprovider = ({children}) => {

    const [fechainicio, setFechainicio] = useState('');
    const [fechafin, setFechafin] = useState('');
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [bebes, setBebes] = useState(0);
    const [formulario, setFormulario] = useState(false);

    return (
        <Reservacontext.Provider value={{
            fechainicio,
            fechafin,
            adultos,
            ninos,
            bebes,
            formulario,
            setFormulario,
            setNinos,
            setBebes,
            setFechainicio,
            setFechafin,
            setAdultos
        }
        }>
            {children}
        </Reservacontext.Provider>
    )
}

export {
    Reservaprovider
}

export default Reservacontext