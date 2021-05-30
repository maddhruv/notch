import Link from 'next/link';
import { getSearch } from '../lib/notion';
import { getSiteConfig } from '../lib/siteConfig';

const Search = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((page) => {
        const { title, description } = page;
        return (
          <Link key={title} href={`/b/${title.split(' ').join('-')}`}>
            <div className='postcard'>
              <h2 className='text-2xl lg:text-3xl font-bold mb-1 lg:mb-2 text-primary-regular'>{title}</h2>
              {description && <h3 className='text-base lg:text-xl dark:text-white-dark'>{description}</h3>}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const query = context.query.q;

  const searchResults = await getSearch(query);
  const siteConfig = getSiteConfig();

  return { props: { searchResults, siteConfig } };
}

export default Search;
