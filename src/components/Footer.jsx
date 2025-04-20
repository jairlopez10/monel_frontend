import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer>
        <Link to="/">
          <img src="/logo.webp" alt="Logo" />
        </Link>
      </footer>
    </>
  )
}

export default Footer