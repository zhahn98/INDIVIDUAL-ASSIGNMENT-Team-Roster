import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Click the buttons to Create, Read, Update, and Delete team members!</p>
      <Link href="/player/players" passHref>
        <Button variant="info">View Team</Button>
      </Link>
      <br />
      <Link href="/player/new" passHref>
        <Button variant="info">Add Member</Button>
      </Link>
    </div>
  );
}

export default Home;
