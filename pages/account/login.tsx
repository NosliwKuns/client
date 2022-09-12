import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Image from "../../public/image.png";
import Logo from "../../public/logo.png";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';

const Login: NextPage = ({ setToken } : any) => {

  const router = useRouter();
  const [ viewPassord, setViewPassord ] = useState(false);
  const [input, setInput] = useState<any>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const sendData = async (event: any) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/api/signin", input, {withCredentials: true});
      console.log(data);
      if(data) {
        setToken(data);
        router.push('/');
      }
    } catch (error : any) {
      console.log(error.response.data);
    }
  };

  console.log(input);

  return (
    <Layout>
      <div className="login-container">
        <div className="left-side">
          <img src={Image.src} alt="A guy listening music" />
        </div>
        <form className="login-form" onSubmit={sendData}>
          <img src={Logo.src} alt="Logo" />
          <h1>Bienvenido</h1>
          <section>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-input"
                placeholder="email@gmail.com"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type={viewPassord ? "text" : "password"}
                name="password"
                id="password"
                className="form-input"
                placeholder="••••••••••"
                value={input.password}
                onChange={handleInputChange}
              />
              <div onClick={() => setViewPassord(!viewPassord)}>
                {viewPassord ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </div>
            </div>
          </section>
          <button type="submit">Iniciar sesión</button>
          <p>Aún no tienes cuenta? 
            <Link href='/account/register'>
              <span> Registrarse</span> 
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
