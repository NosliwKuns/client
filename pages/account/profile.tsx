import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import SideBar from './../../components/SideBar';
import Header from "../../components/Header";
import { useState } from 'react';
import validate from "../../Libs/formValidate";
import axios from 'axios';
import { useRouter } from 'next/router'


const Profile: NextPage = ({ data, setToken, token, sendHeader } : any) => {

  console.log(data, sendHeader, 'data');
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [ lock, setLock ] = useState<any>(false);
  const [ newPass, setNewPass ] = useState<any>('')
  const [imgFile, setImgFile] = useState<any>(null);
  const [ picture, setPicture ] = useState<any>(data.picture)
  const [input, setInput] = useState<any>({
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    phonenumber: data.phonenumber,
    gender: data.gender,
    password: data.password,
  });

  const headers : any = {
    headers : {
        token : sendHeader
    }
  };

  const updateImg = async (event: any) => {
    setImgFile(event.target.files[0]);
    try {
      const formdata = new FormData();
      formdata.append("image", event.target.files[0]);
      const { data } = await axios.put("http://localhost:4000/api/profile/picture", formdata, headers);
      console.log(data, "llegue?");
      if(data) {
        setPicture(data);
      }
    } catch (error) {
      console.log(error);
    }
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

  
  const updateInfo = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("http://localhost:4000/api/profile/update",input, headers);
      if(data) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewPassword = (event:any) => {
    setNewPass(event.target.value)
  }


  console.log(newPass);

  return (
    <Layout>
      <SideBar token={token} />
      <Header token={token} setToken={setToken} />
      <main className="profile-page">

        <div className={ lock ? "password-change" : "hidden"}>
          <label htmlFor="change-password">Contraseña nueva</label>
          <input type="text" id="change-password" value={newPass} onChange={handleNewPassword}/>
          <div>
            <button onClick={() => { 
              setLock(!lock);
              setNewPass('')
              }}>Cancelar</button>
            <button onClick={() => { setLock(!lock)}}>Confirmar</button> 
          </div>
        </div>

        <h1>Mi información</h1>
        <section className="up-section">
          <div className="profile-picture">
            <img src={picture} alt="your profile picture" />
            <input type="file" accept="image/*" onChange={updateImg}/>
          </div>
          <div>
            <h3>{`${data.name} ${data.lastname}`}</h3>
            <p>Actualmente disfrutas de Foxbel Music Free.</p>
          </div>
        </section>
        <form className="login-form register-form" onSubmit={updateInfo}>
          <section>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                id="name"
              //   className={
              //     errors.name ? "form-input input-error" : "form-input"
              //   }
                value={input.name}
                onChange={handleInputChange}
              />
              {/* <span className="error">{errors.name}</span> */}
            </div>

            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Apellido *
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
              //   className={
              //     errors.lastname ? "form-input input-error" : "form-input"
              //   }
                value={input.lastname}
                onChange={handleInputChange}
              />
              {/* <span className="error">{errors.lastname}</span> */}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico *
              </label>
              <input
                type="text"
                name="email"
                id="email"
                // className={
                //   errors.email ? "form-input input-error" : "form-input"
                // }
                value={input.email}
                onChange={handleInputChange}
              />
              {/* <span className="error">{errors.email}</span> */}
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
              <div className="lock-password">
                <input
                  type={"password"}
                  name="password"
                  id="password"
                  disabled
                  // className={
                  //   errors.password ? "form-input input-error" : "form-input"
                  // }
                  value={newPass ? newPass : input.password}
                  onChange={handleInputChange}
                />
                <div onClick={() => { setLock(!lock)}}>Modificar</div>
              </div>
              {/* <span className="error">{errors.password}</span> */}
            </div>
          </section>
          <button type="submit">Guardar</button>
        </form>
      </main>
    </Layout>
  )
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const sendHeader = req.cookies['auth-token']
  const headers : any = {
    headers : {
        token : req.cookies['auth-token']
    }
  }
  const response = await fetch('http://localhost:4000/api/profile', headers);

  const data = await response.json();

  return { props: { data, sendHeader } };
}