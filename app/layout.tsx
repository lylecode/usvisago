import Container from '@/components/layout/Container';
import Footer from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import type { Metadata } from 'next';
import Navigation from '../components/layout/navigation/navigation';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.usvisago.com'),
  keywords: ['美签申请', 'evus注册', '美国酒店', '美签面谈时间查询'],
  title: {
    default: '美签申请',
    template: '&s | 美签申请',
  },
  openGraph: {
    description:
      '全中文申请，简化美国签证DS160表格填写，预设自动填充选项，最短10分钟即可完成申请，无需找中介，自己DIY也可完成。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <Providers>
          <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <Container>
              <Navigation />
            </Container>
          </header>
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
