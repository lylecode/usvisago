import { Metadata } from 'next';
import Evus from './evus';

export const metadata: Metadata = {
  title: 'EVUS 登记',
};

const EvusPage = () => <Evus />;

export default EvusPage;
