import { Link } from "react-router-dom";

const Page404 = () => (
  <div>
    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>Page does not exist</p>
    <Link
      style={{
        display: "block",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "24px",
        marginTop: "30px",
      }}
      to="/"
    >
      Back to main page
    </Link>
  </div>
);

export default Page404;
