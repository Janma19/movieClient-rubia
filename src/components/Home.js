import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Container className="mt-5 text-center">
        <h1>Binge Boss</h1>
        <p>Welcome to Binge Boss—your ultimate movie marathon companion! Dive into a world where movies are not just watched; they’re binged. Whether you're hunting for hidden gems, rewatching classics, or exploring the latest blockbusters, Binge Boss has you covered. Ready to boss up your movie nights? Start your binge journey today!</p>
        {user.id !== null ? (
          <p>
            You're logged in. Head over to <Link to="/getMyMovies">My Movies</Link> to see your progress.
          </p>
        ) : (
          <p>
            New here? <Link to="/register">Sign up now</Link> and start your fitness journey!
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;
