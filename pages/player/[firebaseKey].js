import { useRouter } from 'next/router';

const ViewPlayer = () => {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <>
      <p>{firebaseKey}</p>
    </>
  );
};

export default ViewPlayer;
