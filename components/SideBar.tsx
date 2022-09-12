import Logo from '../public/logo.png';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SideBar = ({ token, ...props } : any) => {

  const [ library, setLibrary ] = useState(<div/>)

  useEffect(() => {
    setLibrary(
      token ?
      <section className='my-library'>
        <p className='text-section'>Mi Librería</p>
        <article>Recientes</article>
        <article>Artistas</article>
        <article>Albums</article>
        <article>Canciones</article>
        <article>Estaciones</article>
      </section>
      : <div/>
    )
  }, [token])

  return (
    <aside>
      <Link href='/'>
        <img src={Logo.src} alt="logo" />
      </Link>

      {library}

      <section className='section'>
        <p className='text-section'>Playlist</p>
        <article>Metal</article>
        <article>Para bailar</article>
        <article>Rock 90s</article>
        <article>Baladas</article>
      </section>

    </aside>
  )
};

export default SideBar;