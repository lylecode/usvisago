import CountUp from 'react-countup';

interface Props {
  title: string;
  data: number;
}
const DataShow = ({ title, data }: Props) => {
  const showPlus = title !== '成立于';

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start">
        <h2 className="flex items-center gap-2 text-lg font-bold md:text-4xl">
          <span>{showPlus ? <CountUp end={data} duration={1} enableScrollSpy /> : data}</span>
          {showPlus && <span className="relative top-[-0.1em]">+</span>}
        </h2>
        <h3 className="mt-3 text-sm">{title}</h3>
      </div>
    </div>
  );
};

export default DataShow;
