import Head from 'next/head';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (event) => {
    const query = event.target.value;

    if (event.keyCode === 13) {
      router.push(`/search?q=${query}`);
    }
  };
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div className='mr-4'>
        <input className='rounded px-1 shadow' type='search' placeholder='Search' onKeyUp={handleSearch} />
      </div>
    </>
  );
};

export default SearchBar;
