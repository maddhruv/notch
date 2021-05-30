interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className='mb-8'>
      <h1 className='text-5xl text-primary-regular lg:text-6xl font-bold'>{title}</h1>
    </div>
  );
};

export default Title;
