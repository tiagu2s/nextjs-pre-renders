function UserProfilePage(props) {
  return <h1>{props.userName}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  //res and req default nodeJS objects
  const { params, req, res } = context;

  console.log("server side code");
  return {
    props: {
      userName: "Tiago Server Side prop",
    },
  };
}
