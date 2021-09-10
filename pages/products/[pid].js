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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  console.log(context);
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  // NO PRODUCT ID SHOW 404 PAGE
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}
{
}
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true, // even pages isn´t listed here they will be presnted when visited
    // OR
    // fallback: "blocking", // and dont´t need validation to waiting for response however takes more time to user
  };
}

export default ProductDetailPage;
