import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const Header = ({ token, setToken, ...props } : any) => {
  const [input, setInput] = useState('');
  const [ color, setColor ] = useState('red');
  const [ isActive, setIsActive ] = useState<boolean>(false);
  const [ userSection, setUserSection ] = useState('hidden');
  const [ classUser, setClassUser ] = useState('user');
  const [ downDrop, setDownDrop ] = useState('hidden')
  const router = useRouter();

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push({
      pathname: "/tracks",
      query: { search: input }
    });
    setInput('')
  };

  useEffect(() => {
    setColor(token ? 'blue' : 'red');
    setUserSection( token ? 'hidden' : 'user-buttons');
    setClassUser( token ? 'user' : 'hidden');
    setDownDrop( isActive ? 'downdrop' : 'hidden')
  }, [token, isActive]);

  const handleClick = () => {
    setToken('');
    router.push('/');
  };

  console.log(token)

  return (
    <header>
      {/* searchbar */}
      <form className="searchbar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">
          <BiSearch size={18} />
        </button>
      </form>

      {/* section login / register/ user */}
      <div className={userSection}>
        <Link href="/account/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link  href="/account/register">
          <button>Registrarse</button>
        </Link>
      </div>

      <div className={classUser}>
        <FaUser />
        <span onClick={() => setIsActive(!isActive)}>{'holi'}</span>
        
        <div className={downDrop}>
          <Link  href="/account/profile">
            <div>Mi Perfil</div>
          </Link>
          <div onClick={handleClick}>Cerrar sesión</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
