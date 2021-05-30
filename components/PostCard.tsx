import clsx from 'clsx';
import Link from 'next/link';
import { Page } from '../lib/notion';

type Props = Pick<Page, 'cover' | 'created_at' | 'title' | 'tags' | 'description'> & {
  index: number;
};

const PostCard: React.FC<Props> = ({ cover, created_at, title, tags, description, index }: Props) => {
  const postWrapperClassNames = clsx(
    'flex mb-4 lg:mb-8 lg:px-4 w-full postcard flex-col',
    index === 0 ? 'lg:flex-row' : 'lg:w-1/3 lg:flex-col'
  );
  const imageWrapperClassNames = clsx('mr-8 w-full', index !== 0 && 'w-full');
  const imageClassNames = clsx('w-full thumbnail');
  const contentWrapperClassNames = clsx('w-full', index !== 0 && 'w-full');
  const dateClassNames = clsx('dark:text-white-dark', index === 0 ? 'mb-1 lg:mb-4' : 'lg:mt-4 mb-1');

  return (
    <Link href={`/b/${title.split(' ').join('-')}`}>
      <div className={postWrapperClassNames}>
        {cover && (
          <div className={imageWrapperClassNames}>
            <img src={cover} className={imageClassNames} alt={title} />
          </div>
        )}
        <div className={contentWrapperClassNames}>
          <p className={dateClassNames}>{created_at}</p>
          <h2 className='text-2xl lg:text-3xl font-bold mb-1 lg:mb-4 text-primary-regular'>{title}</h2>
          {description && <h3 className='text-base lg:text-2xl dark:text-white-dark'>{description}</h3>}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
