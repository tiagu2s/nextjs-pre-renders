import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { loadedProduct } = props;
  //WAITING FOR SERVER Callback function
  if (!loadedProduct) {
    return <h1>loading....</h1>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  console.log(context);
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { pid: "p1" },
      },
    ],
    fallback: true, // even pages isn´t listed here they will be presnted when visited
    // OR
    // fallback: "blocking", // and dont´t need validation to waiting for response however takes more time to user
  };
}

export default ProductDetailPage;
