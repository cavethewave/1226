import styles from "./page.module.css";
import Guestbook from "./components/Guestbook";
import Snow from "./components/Snow";

export default function Home() {
  const products = [
    { id: 1, name: "크리스마스 트리 장식 세트", price: "25,000원", emoji: "🎄" },
    { id: 2, name: "산타클로스 인형", price: "32,000원", emoji: "🎅" },
    { id: 3, name: "루돌프 머리띠", price: "8,900원", emoji: "🦌" },
    { id: 4, name: "크리스마스 리스", price: "45,000원", emoji: "🎀" },
    { id: 5, name: "눈사람 무드등", price: "18,000원", emoji: "⛄" },
    { id: 6, name: "겨울 털장갑", price: "15,000원", emoji: "🧤" },
  ];

  return (
    <div className={styles.page}>
      <Snow />
      <header className={styles.hero}>
        <h1>Merry Christmas!</h1>
        <p>
          특별한 크리스마스를 위해 준비한<br />
          마법 같은 선물들을 만나보세요.
        </p>
        <button className={styles.ctaButton}>선물 보러가기</button>
      </header>

      <main className={styles.productSection}>
        <h2 className={styles.sectionTitle}>추천 상품</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.cardImage}>
                {product.emoji}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardPrice}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Guestbook />
    </div>
  );
}
