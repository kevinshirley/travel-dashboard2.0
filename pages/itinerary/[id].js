import { useRouter } from 'next/router';

const Itinerary = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Itinerary: {id}</h1>;
}

export default Itinerary;
