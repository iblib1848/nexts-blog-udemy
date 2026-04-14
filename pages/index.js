import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import Link from "next/link";
import { getPostsData } from "../lib/post";
import Head from "next/head";

//SSGの場合
//ビルドされる時に一度だけ、外部ページも併せて読み込む。
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はJava講師です。言語はJava/SpringBootです。</p>
        <section>
          <h2>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                </Link>
                <Link href={`/posts/${id}`} className={utilStyle.boldText}>
                  {title}
                </Link>
                <br />
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
