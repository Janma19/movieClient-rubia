import { useEffect, useState, useContext } from 'react';
import Movie from '../components/Movie';
import UserContext from '../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Movies() {
  const { user } = useContext(UserContext); 
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch('https://fitnessapp-api-ln8u.onrender.com/movies/getMyMovies', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.movies) {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (user && user.id !== null) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {user ? (
        movies.length > 0 ? (
          <>
            <h1 className='text-center mt-5'>My Movies</h1>
            <Row>
              {movies.map(movie => (
                <Col md={3} key={movie._id}>
                  <Movie movie={movie} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h1>No Movies</h1>
        )
      ) : (
        <>
          <h1>You are not logged in</h1>
          <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
        </>
      )}
    </>
  );
}