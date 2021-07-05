import styles from "@/styles/Pagination.module.css";

export default function Pagination({
  perPage,
  totalAccommodations,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAccommodations / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <a className="btn-secondary" onClick={() => paginate(currentPage - 1)}>
          Prev
        </a>
      )}

      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>

      {currentPage < 10 && (
        <a className="btn-secondary" onClick={() => paginate(currentPage + 1)}>
          Next
        </a>
      )}
    </nav>
  );
}
