import Container from '@/components/layout/Container';
import { cityCountryMap } from '@/constants/cityMapping';
import api from '@/lib/ky';
import { addMonths, format } from 'date-fns';
import { parse } from 'node-html-parser';
export const dynamic = 'force-dynamic';

const getCityInfo = (cityName: string) => cityCountryMap[cityName] ?? '';
const parseTableWithNodeHtmlParser = (html: string): string[][] => {
  const root = parse(html);
  const table = root.querySelector('table');
  if (!table) return [];
  const rows: string[][] = [];
  table.querySelectorAll('tr').forEach((tr) => {
    const cells: string[] = [];
    tr.querySelectorAll('td').forEach((td) => {
      const text = td.textContent?.trim();
      if (text) cells.push(text);
    });
    if (cells.length > 0) {
      rows.push(cells);
    }
  });
  return rows;
};
const InterviewPage = async () => {
  const url =
    'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html';
  const html = await api.get(url).text();
  const parse = parseTableWithNodeHtmlParser(html);
  parse.forEach((val) => console.log(val[0]));
  return (
    <Container>
      <h1 className="mb-1 mt-20 text-xl font-bold">全球美国签证（B1/B2）面谈等待时间</h1>
      <h1 className="mb-8 mt-4 text-sm text-neutral-500">
        该数据来源于
        <a
          className="mx-2 text-blue-500 hover:text-blue-400"
          href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html">
          Travel.State.Gov
        </a>
        ，并对数据进行优化显示，请已官方数据为准。
      </h1>
      {parse.length === 0 ? (
        <p className="text-neutral-500">No hotels found.</p>
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-neutral-100">
                <th className="whitespace-nowrap border p-4 text-left">城市</th>
                <th className="whitespace-nowrap border p-4 text-left">国家</th>
                <th className="whitespace-nowrap border p-4 text-left">排期（月）</th>
                <th className="whitespace-nowrap border p-4 text-left">最近可约</th>
              </tr>
            </thead>
            <tbody>
              {parse
                .filter((val) => val[0] !== 'Department' && val[0] !== 'Mexicali Tpf')
                .sort((a, b) => {
                  const countryA = getCityInfo(a[0]).countryEnglish.toLowerCase();
                  const countryB = getCityInfo(b[0]).countryEnglish.toLowerCase();

                  if (countryA === 'china' && countryB !== 'china') return -1;
                  if (countryB === 'china' && countryA !== 'china') return 1;

                  if (countryA === 'taiwan' && countryB !== 'taiwan') return -1;
                  if (countryB === 'taiwan' && countryA !== 'taiwan') return 1;

                  return 0;
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    className="relative transition-colors even:bg-neutral-50 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-blue-500 hover:after:content-['']">
                    <td className="whitespace-nowrap border p-4 text-neutral-500">
                      {item[0]}（{getCityInfo(item[0]).cityChinese}）
                    </td>
                    <td className="whitespace-nowrap border p-4 text-neutral-500">
                      {getCityInfo(item[0]).countryEnglish}（{getCityInfo(item[0]).countryChinese}）
                    </td>
                    <td className="whitespace-nowrap border p-4 text-neutral-500">
                      {item[2].trim().replace('months', '').replace('month', '')}
                    </td>
                    <td className="whitespace-nowrap border p-4 text-neutral-500">
                      {item[2].trim() === 'NA'
                        ? '无可约'
                        : format(addMonths(new Date(), parseFloat(item[2].trim())), 'yyyy-MM-dd')}
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

export default InterviewPage;
