import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <h1 className="title">Choose an API</h1>
        <div className="button-container">
          <Link to="/weather-api">
            <button className="gray-button">Open Weather API</button>
          </Link>
          <Link to="/mateo-api">
            <button className="green-button">Open Mateo API</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
