import { Card, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { useState } from 'react';

export default function Movie({ movie }) {
  const notyf = new Notyf();
  const { _id, name, duration, status } = movie;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  function updateMovieDetails(id) {
    const updatedMovie = {
      name: updatedName,
      duration: updatedDuration,
    };

    fetch(`https://fitnessapp-api-ln8u.onrender.com/movies/updateMovie/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 'Error in Saving') {
          notyf.error(`Unsuccessful Movie Update: ${data.message}`);
        } else {
          notyf.success('Movie Updated');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  function updateMovieStatus(id) {
    const updatedStatus = { status: 'Complete' };

    fetch(`https://fitnessapp-api-ln8u.onrender.com/movies/completeMovieStatus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error(`Failed to update status: ${data.message}`);
        } else {
          notyf.success('Movie status updated to Complete');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  function deleteMovie(id) {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/movies/deleteMovie/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 'Error in Saving') {
          notyf.error(`Unsuccessful Movie Deletion: ${data.message}`);
        } else {
          notyf.success('Movie Deleted');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          <Form.Control
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Movie Name"
            className="mb-2"
          />
        </Card.Title>
        <Card.Subtitle className="mb-1">Duration:</Card.Subtitle>
        <Form.Control
          type="text"
          value={updatedDuration}
          onChange={(e) => setUpdatedDuration(e.target.value)}
          placeholder="Duration (e.g., 30 mins)"
          className="mb-2"
        />
        <Card.Subtitle>Status:</Card.Subtitle>
        <Card.Text className="mb-3">{status}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => updateMovieDetails(_id)}
        >
          Update
        </button>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => updateMovieStatus(_id)}
        >
          Show
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteMovie(_id)}
        >
          Delete
        </button>
      </Card.Footer>
    </Card>
  );
}