import { Link } from "react-router-dom";

function Index() {
  const pagesList = [
    {
      location: "/auth",
      text: "Authorize",
    },
    {
      location: "/dashboard",
      text: "Dashboard"
    }
  ];

  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <nav>
        <ul>
          {pagesList.map((item) => (
            <li key={item.location}>
              <Link to={item.location}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Index;
