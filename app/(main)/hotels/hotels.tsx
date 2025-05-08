import Container from '@/components/layout/Container';
import ReloadButton from '@/components/ReloadButton';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
export const dynamic = 'force-dynamic';

interface Hotel {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
const Hotels = async () => {
  const filePath = join(process.cwd(), 'public', 'us_hotels.csv');
  const records: Hotel[] = [];
  const parser = createReadStream(filePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }),
  );

  for await (const record of parser) {
    records.push(record);
  }

  const shuffledRecords = [...records].sort(() => Math.random() - 0.5);

  return (
    <Container>
      <h1 className="mb-1 mt-20 text-xl font-bold">美国酒店联系信息</h1>
      <h1 className="mb-8 mt-4 text-sm text-neutral-500">
        仅显示纽约、洛杉矶、旧金山、盐湖城、休斯敦、达拉斯、芝加哥、底特律、波士顿酒店信息
      </h1>

      <ReloadButton />
      {shuffledRecords.length === 0 ? (
        <p className="text-neutral-500">No hotels found.</p>
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-neutral-100">
                <th className="whitespace-nowrap border p-4 text-left">酒店名称</th>
                <th className="whitespace-nowrap border p-4 text-left">电话号码</th>
                <th className="whitespace-nowrap border p-4 text-left">地址</th>
                <th className="whitespace-nowrap border p-4 text-left">城市</th>
                <th className="whitespace-nowrap border p-4 text-left">邮编</th>
              </tr>
            </thead>
            <tbody>
              {shuffledRecords.map((hotel, index) => (
                <tr key={index} className="transition-colors even:bg-neutral-50">
                  <td className="whitespace-nowrap border p-4 text-neutral-500">{hotel.name}</td>
                  <td className="whitespace-nowrap border p-4 text-neutral-500">{hotel.phone}</td>
                  <td className="whitespace-nowrap border p-4 text-neutral-500">{hotel.address}</td>
                  <td className="whitespace-nowrap border p-4 text-neutral-500">{hotel.city}</td>
                  <td className="whitespace-nowrap border p-4 text-neutral-500">
                    {hotel.state} {hotel.zip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default Hotels;
