import Link from "next/link";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import AccommodationItem from "@/components/AccommodationItem";

export default function HomePage({ accommodations }) {
  return (
    <Layout title="Kaboodle Lets | Home">
      <h1>Featured</h1>
      {accommodations.length === 0 && <h3>No accommodations to show</h3>}

      {accommodations.map((accommodation) => (
        <AccommodationItem
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}

      {accommodations.length > 0 && (
        <Link href="/accommodation">
          <a className="btn-secondary">View all accommodations</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/accommodation`);
  const accommodations = await res.json();

  return {
    props: { accommodations: accommodations.slice(0, 5) },
    revalidate: 1,
  };
}
