import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://next-js-course-fetching-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    const transformedSalesToArray = [];
    //   transform data from firebase to an array
    for (const key in data) {
      transformedSalesToArray.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setSales(transformedSalesToArray);
  }, [data]);
  // //  
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://next-js-course-fetching-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         const transformedSalesToArray = [];
  //         for (const key in data) {
  //           transformedSalesToArray.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSalesToArray);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     <h1>Loading...</h1>;
  //   }

  //   if (!sales) {
  //     <h1>No data yet...</h1>;
  //   }

  if (error) {
    <h1>Failed Load data SWR</h1>;
  }

  if (!sales && !sales) {
    <p>Loading..</p>;
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

export async function getServerSideProps(context) {
  const response = await fetch(
    "https://next-js-course-fetching-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSalesToArray = [];

  for (const key in data) {
    transformedSalesToArray.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: { sales: transformedSalesToArray },
      revalidate: 10,
    },
  };
}

export default LastSalesPage;
