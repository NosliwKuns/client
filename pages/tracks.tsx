import type { NextPage } from "next";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { GetServerSideProps } from "next";

const Search: NextPage = ({ data, token, setToken }: any) => {

  const addZeroIfNeeded = (value: number) => {
    if (value < 10) {
      return "0" + value;
    } else {
      return "" + value;
    }
  }
  //value
  const secondsToMinuts = (seconds: number) => {
    const minuts: number = Math.floor(seconds / 60);
    seconds -= minuts * 60;
    return `${addZeroIfNeeded(minuts)}:${addZeroIfNeeded(seconds)}`;
  };
  
  return (
    <Layout>
      <SideBar token={token} />
      <Header token={token} setToken={setToken} />
      <main className="tracks-page">
        <section>
          <h3 className="number-of-tracks">{data.length} tracks</h3>
        </section>
        <section className="tracks-container">
          {data.map((item: any) => {
            return (
              <div className="track" key={item.id}>
                <img src={item.album_cover} alt="" />
                <h4>{item.title}</h4>
                <h4>{item.artist}</h4>
                <h4>{secondsToMinuts(item.duration)}</h4>
                <button>{'>'}</button>
                <button>{"<3"}</button>
              </div>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { search } = query;
  console.log("hola", req.cookies['auth-token']);
  const response = await fetch(
    `http://localhost:4000/api/music/search?q=${search}`
  );
  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
};
