import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Accommodation.module.css";

export default function RoomPage({ accommodation, availability }) {
  const router = useRouter();

  const id = router.query.id;
  const roomId = router.query.roomId;
  const rooms = accommodation.rooms.filter(
    (room) => room.id.toString() === roomId
  );
  const room = rooms[0];

  const available = availability.filter(
    (available) => available.id.toString() === roomId
  );

  return (
    <Layout>
      <div className={styles.accommodation}>
        <h3>{room.name}</h3>
        <p>{room.type} room</p>

        {accommodation.images && (
          <div className={styles.image}>
            <Image
              src={accommodation.images[0].filename}
              width={960}
              height={600}
              alt={accommodation.images[0].alt}
            />
          </div>
        )}

        <h3>Occupancy:</h3>
        <span>
          {room.min_occupancy}&#40;min&#41; - {room.max_occupancy}&#40;max&#41;
          people
        </span>
        <h3>Facilities: </h3>
        {room.facilities ? (
          <div>
            {room.facilities.map(({ id, label }) => (
              <p key={id}>{label}</p>
            ))}
          </div>
        ) : (
          <p>No facilities available</p>
        )}

        <div>
          <h3>Total price:</h3>
          {room.price ? (
            <span>
              {room.price.price} - {room.number_of_nights} nights
            </span>
          ) : (
            <p>Not available</p>
          )}
        </div>

        <h3>Availability:</h3>
        {available[0] ? (
          <p>
            {available[0].available} - {available[0].total} spaces available
          </p>
        ) : (
          <p>Sold out</p>
        )}

        <Link href={`/accommodation/${id}`}>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const accommodationRes = await fetch(`${API_URL}/api/accommodation/${id}`);
  const accommodations = await accommodationRes.json();

  const availabilityRes = await fetch(`${API_URL}/api/availability`);
  const availability = await availabilityRes.json();

  return {
    props: {
      accommodation: accommodations[0],
      availability: availability,
    },
  };
}
