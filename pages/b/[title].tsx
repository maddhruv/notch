import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";

import Title from "../../components/Title";
import { useDarkMode } from "../../components/DarkMode";

import { getPage, PageRenderer } from "../../lib/notion";
import { getSiteConfig, SiteConfig } from "../../lib/siteConfig";
import { isSSR } from "../../lib/utils";

interface Props {
  page: PageRenderer;
  siteConfig: SiteConfig;
}

const BlogPost: NextPage<Props> = ({ page, siteConfig }) => {
  const {
    pageProperties: { title, created_at, desription },
  } = page;

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (!isSSR) {
      const notionViewport =
        document.getElementsByClassName("notion-viewport")[0];
      if (notionViewport) {
        notionViewport.remove();
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          {title} - {siteConfig.name}
        </title>
        <meta name="description" content={desription} />
      </Head>
      <Title title={title} />
      <p className="mb-8 dark:text-white-dark">{created_at}</p>
      <NotionRenderer recordMap={page.recordMap} darkMode={isDarkMode} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const title = context.params.title;

  const page = await getPage(title);
  const siteConfig = getSiteConfig();

  return { props: { page, siteConfig } };
}

export default BlogPost;
