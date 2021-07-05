import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Accommodation.module.css";

export default function AccommodationPage({ accommodation }) {
  const id = `${accommodation.id}`;

  const createMarkup = () => {
    return { __html: `${accommodation.description}` };
  };

  return (
    <Layout>
      <div className={styles.accommodation}>
        <h1>{accommodation.name}</h1>
        <span>
          {accommodation.rating.label} {accommodation.type.name}
        </span>
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

        <h3>Description: </h3>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
        <h3>Facilities: </h3>
        {accommodation.facilities.map(({ id, label }) => (
          <p key={id}>{label}</p>
        ))}

        <h3>Rooms: </h3>
        <div className="rooms-container">
          {accommodation.rooms.map((room) => (
            <Link href={`/accommodation/${id}/room/${room.id}`} key={room.id}>
              <a>{room.name}</a>
            </Link>
          ))}
        </div>

        <Link href="/accommodation">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/accommodation/${id}`);
  const accommodations = await res.json();

  return {
    props: {
      accommodation: accommodations[0],
    },
  };
}
