import type { NextPage } from "next";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Layout from "./../components/Layout";
import { useState } from 'react';

const Home: NextPage = ({ data, token, setToken }: any) => {
  const infocardData = data[3];
  console.log(token, 'token');

  return (
    <Layout>
      <Header token={token} setToken={setToken}/>
      <SideBar token={token} />
      <main>

        {/* infocard-section */}
        <section className="infocard-container">
          <div className="infocard-cover">
            <img src={infocardData.cover} alt="" />
            <span></span>
          </div>
          <div className="infocard-content">
            <div className="infocard-text">
              <h4 className="infocard-title">
                {infocardData.title}
              </h4>
              <span className="infocard-artist">
                Lo mejor de Twenty One Pilot
              </span>
              <span className="infocard-followers">
                450,060 seguidores
              </span>
              <p className="infocard-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis omnis eveniet exercitationem itaque iure illo dolores
                praesentium fuga tempore, totam quo soluta impedit distinctio
                sit officia beatae nobis eaque vero!
              </p>
            </div>
            <div className="infocard-buttons">
              <button className="play">Reproducir</button>
              <button className="follow">Seguir</button>
              <span className="dots">...</span>
            </div>
          </div>
        </section>

        <section className="albums-container">
          <h4 className="results"> Resultados </h4>
          <div className="albums-grid">
            {data.map((item: any) => {
              return (
                <div className="album stacked" key={item.id}>
                  <div className="album-cover-container">
                    <img src={item.cover} alt={`${item.title} album cover`} className="album-cover"/>
                    <button className="pause">
                    </button>
                  </div>
                  <div className="album-content">
                    <h5 className="album-title">{item.title}</h5>
                    <p className="album-artist">Twenty One Pilot</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/api/artist/album`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
