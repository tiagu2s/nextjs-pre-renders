import path from "path";
import fs from "fs/promises";

import Link from "next/link";

const HomePage = (props) => {
  const { products } = props;

  return (
    <>
      <Link href={`/3`}>
        <h1>teste </h1>
      </Link>
      <ul>
        {products.map((product) => {
          <li key={product.id}>
            {" "}
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>;
        })}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  console.log("Regenrating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, //in development this doesn´t metter(INCREMENTAL STATIC GENERATION ISR)
    // notFound: true, no data received go 404 page
    // redirect: "/no-data", problems getting data from data base,etc; go to that page
  };
}

export default HomePage;
