import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'

import utilStyles from '../styles/utils.module.css'

interface Post {
  date: string
  title: string
  id: string
}

interface HomeProps {
  allPostsData: Post[]
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className={utilStyles.centerText}>Hello! I'm Artur. I'm software developer at Syberry.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
