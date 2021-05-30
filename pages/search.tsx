import Link from 'next/link';

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

Search.getInitialProps = async (context) => {
  const query = context?.query?.q;
  const siteConfig = getSiteConfig();

  const response = await fetch(`${siteConfig.siteURL}/api/search/${Array.isArray(query) ? query[0] : query}`);

  const searchResults = await response.json();

  return { searchResults };
};

export default Search;
