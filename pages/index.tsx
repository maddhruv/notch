import { NextPage } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import Title from '../components/Title';
import PostCard from '../components/PostCard';

import { getPages, Page } from '../lib/notion';
import { getSiteConfig, SiteConfig } from '../lib/siteConfig';

interface Props {
  pages: Page[];
  siteConfig: SiteConfig;
}

const Index: NextPage<Props> = ({ pages, siteConfig }) => {
  return (
    <div>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name='description' content={`${siteConfig.name} - Blog`} />
      </Head>
      <NextSeo
        title={siteConfig.name}
        description={siteConfig.name}
        openGraph={{
          title: siteConfig.name,
          url: `${siteConfig.siteURL}`,
          description: siteConfig.name,
          images: [{ url: siteConfig.logo }],
          site_name: siteConfig.name,
        }}
      />
      <Title title={siteConfig.name} />
      <div id='posts' className='flex flex-wrap'>
        {pages.map((page, index) => (
          <PostCard key={page.title} index={index} {...page} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const pages = await getPages();
  const siteConfig = getSiteConfig();

  return {
    props: {
      pages,
      siteConfig,
    },
  };
}
export default Index;
