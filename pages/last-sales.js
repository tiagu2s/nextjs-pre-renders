import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://next-js-course-fetching-default-rtdb.firebaseio.com/sales.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
        const transformedSalesToArray = [];
        for (const key in data) {
          transformedSalesToArray.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSalesToArray);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  if (!sales) {
    <h1>No data yet...</h1>;
  }
  return (
    <>
      <ul>
        {sales.map((sale) => {
          console.table(sale);
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>;
        })}
      </ul>
    </>
  );
}

export default LastSalesPage;
