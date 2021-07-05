import Link from "next/link";
import Image from "next/image";
import styles from "../styles/AccommodationItem.module.css";

export default function AccommodationItem({ accommodation }) {
  return (
    <div className={styles.accommodation}>
      <div className={styles.img}>
        <Image
          src={
            accommodation.images
              ? accommodation.images[0].filename
              : "/images/image-preview.png"
          }
          alt={accommodation.images[0].alt}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <h3>{accommodation.name}</h3>
        <h3>{accommodation.resort.name}</h3>
        <span>{accommodation.rating.label}</span>
      </div>

      <div className={styles.link}>
        <Link href={`/accommodation/${accommodation.id}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
