import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'

const Logo = ({ toggle }) => {
  return (
    <Link to='/' onClick={toggle}>
      <img src={logo} alt='jobify' className='logo' />
    </Link>
  )
}

export default Logo
