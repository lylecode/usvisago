import { Metadata } from 'next';
import Hotels from './hotels';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '美国酒店',
};

const HotelsPage = async () => <Hotels />;

export default HotelsPage;
