import { useState } from "react";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import AccommodationItem from "@/components/AccommodationItem";
import Pagination from "@/components/Pagination";

export default function AccommodationsPage({ accommodations }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const indexOfLastAccommodation = currentPage * perPage;
  const indexOfFirstAccommodation = indexOfLastAccommodation - perPage;
  const currentAccommodation = accommodations.slice(
    indexOfFirstAccommodation,
    indexOfLastAccommodation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout title="Kaboodle Lets | All Accommodations">
      <h1>All</h1>
      {accommodations.length === 0 && <h3>No accommodations to show</h3>}

      {currentAccommodation.map((accommodation) => (
        <AccommodationItem
          key={accommodation.id}
          accommodation={accommodation}
        />
      ))}

      <Pagination
        perPage={perPage}
        totalAccommodations={accommodations.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/accommodation`);
  const accommodations = await res.json();

  return {
    props: { accommodations },
    revalidate: 1,
  };
}
