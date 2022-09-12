import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Image from "../../public/image.png";
import validate from "../../Libs/formValidate";
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register: NextPage = ({ setToken } : any) => {
  const router = useRouter();
  const [ viewPassord, setViewPassord ] = useState(false);
  const [imgFile, setImgFile] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [load, setLoad] = useState<string>('Registrarse')
  const [input, setInput] = useState<any>({
    name: "",
    lastname: "",
    email: "",
    phonenumber: "",
    gender: "",
    password: "",
    picture: "",
  });

  const uploadImg = (event: any) => {
    setImgFile(event.target.files[0]);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    setLoad('Cargando...')

    const formdata = new FormData();
    imgFile && formdata.append("image", imgFile);
    formdata.append("name", input.name);
    formdata.append("lastname", input.lastname);
    formdata.append("email", input.email);
    formdata.append("phonenumber", input.phonenumber);
    formdata.append("gender", input.gender);
    formdata.append("password", input.password);

    try {
      const { data } = await axios.post("http://localhost:4000/api/users", formdata);
      console.log(data, "llegue?");
      if(data) {
        setLoad('Registrarse');
        setToken(data);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
    setImgFile(null);
    setInput({
      name: "",
      lastname: "",
      email: "",
      phonenumber: "",
      gender: "",
      password: "",
      picture: "",
    });
  };

  console.log(setToken);

  return (
    <Layout>
      <div className="register-container">
        <form className="login-form register-form" onSubmit={sendData}>
          <h1>Craer cuenta</h1>
          <section>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={
                  errors.name ? "form-input input-error" : "form-input"
                }
                value={input.name}
                onChange={handleInputChange}
              />
              <span className="error">{errors.name}</span>
            </div>

            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Apellido *
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className={
                  errors.lastname ? "form-input input-error" : "form-input"
                }
                value={input.lastname}
                onChange={handleInputChange}
              />
              <span className="error">{errors.lastname}</span>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico *
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={
                  errors.email ? "form-input input-error" : "form-input"
                }
                value={input.email}
                onChange={handleInputChange}
              />
              <span className="error">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber" className="form-label">
                Número de celular
              </label>
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                className="form-input"
                value={input.phonenumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Género
              </label>

              <select
                name="gender"
                id="gender"
                value={input.gender}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="" selected></option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña *
              </label>
              <input
                type={viewPassord ? "text" : "password"}
                name="password"
                id="password"
                className={
                  errors.password ? "form-input input-error" : "form-input"
                }
                value={input.password}
                onChange={handleInputChange}
              />
              <span className="error">{errors.password}</span>
              <div onClick={() => setViewPassord(!viewPassord)}>
                {viewPassord ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="picture" className="form-label">
                Foto de perfil
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                accept="image/*"
                className="form-input"
                onChange={uploadImg}
              />
            </div>
            <p>{"( * ) campos obligatorios"}</p>
          </section>
          <button type="submit">{load}</button>
          <p>Ya esta registrado? 
            <Link href='/account/login'>
              <span> Iniciar Sesión</span>
            </Link>
          </p>
        </form>
        <div className="right-side">
          <img src={Image.src} alt="A guy listening music" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
