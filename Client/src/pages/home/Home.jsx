import { useContext, useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import { getMoviesRandom } from "../../movieContext/apiCalls";
import { MovieContext } from "../../movieContext/movieContext";
import "./Home.scss";
import Footer from "../../components/footer/Footer";

const Home = ({ type }) => {
  // const [lists, setLists] = useState([]);
  const { movies, dispatch, isFind } = useContext(MovieContext);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      await getMoviesRandom(type, genre, dispatch);
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <>
      <div className="home">
        <Navbar setGenre={setGenre} />

        {isFind ? (
          <List list={movies}></List>
        ) : (
          <>
            <Featured type={type} setGenre={setGenre} />
            {movies.length > 0 &&
              movies.map((list) => <List key={list._id} list={list} />)}
            {movies.length === 0 && (
              <h2 style={{ textAlign: "center" }}>Không có kết quả!</h2>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
