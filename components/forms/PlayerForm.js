import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer, getPlayers } from '../../api/playerData';

const initialState = {
  first_name: '',
  last_name: '',
  position: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlayers(user.uid).then(setPlayers);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push(`/player/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Player Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* POSITION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player's Potition"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter IMG URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
