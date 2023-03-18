import { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await res.text();
  return +numberString;
};

const App = () => {
  const query = useQuery(["randomNumber"], getRandomNumber);

  return (
    <div className="App">
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        !query.isError && <h2>Numero aleatorio: {query.data}</h2>
      )}
      {!query.isLoading && query.isError && <h3>{`${query.isError}`}</h3>}
      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {" "}
        {query.isFetching ? "..." : "New Number"}
      </button>
    </div>
  );
};

export default App;
