import hospedajesdb from "../components/Hospedajesdb"

const Inicio = () => {

  const titulourl = hospedajesdb[0].title.replace(/ /g, '-').toLowerCase().replace('#', '-').replace('/', '-').replace('/', '-')
  const idurl = hospedajesdb[0].id

  console.log(titulourl)
  console.log(idurl)

  return (
    <>
      <p onClick={() => window.open(`${titulourl}/${idurl}`)}>Casa 1</p>
    </>
  )
}

export default Inicio