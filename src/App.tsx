import "./App.scss";
import Pagination from "@mui/material/Pagination";
import { getAllComicStrips } from "./Api";
import { useEffect, useState } from "react";
import { Comic } from "./Components/Comic";
import { CircularProgress } from "@mui/material";

function App() {
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [comicsPerPage] = useState(100);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const loadStrips = async () => {
    const requestLoad = await getAllComicStrips();
    setComics(requestLoad);
  };

  useEffect(() => {
    loadStrips();
  }, []);

  const indexOfLastComic = page * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

  return (
    <div className="App">
      <header>XKCD Comic Strips</header>
      <main>
        <div className="strip-mosaic">
          {currentComics.length ? (
            currentComics.map((currentComic: any) => (
              <Comic key={currentComic?.data.num} comic={currentComic} />
            ))
          ) : (
            <CircularProgress />
          )}
        </div>
      </main>
      {currentComics.length ? (
        <Pagination
          className="pagination"
          count={Math.ceil(comics.length / 100)}
          page={page}
          onChange={handleChange}
        />
      ) : null}
    </div>
  );
}

export default App;
