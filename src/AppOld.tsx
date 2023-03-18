import { useEffect, useReducer, useState } from "react";
import "./App.css";

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await res.text();
  return +numberString;
};


const AppOld = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forRefetch] = useReducer((num) => num + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumber()
      .then((num) => setNumber(num))
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className="App">
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        !error && <h2>Numero aleatorio: {number}</h2>
      )}
      {!isLoading && error && <h3>{error}</h3>}
      <button onClick={forRefetch} disabled={isLoading}>
        {" "}
        {isLoading ? "..." : "New Number"}
      </button>
    </div>
  );
};

export default AppOld;
