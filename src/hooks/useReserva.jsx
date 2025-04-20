import { useContext } from "react";
import Reservacontext from "../context/Reservaprovider";

const useReserva = () => {
    return useContext(Reservacontext)
}

export default useReserva;