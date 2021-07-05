import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Kaboodle Lets</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Featured</a>
            </Link>
          </li>
          <li>
            <Link href="/accommodation">
              <a>All</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
