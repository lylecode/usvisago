import Container from '@/components/layout/Container';
import Footer from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import type { Metadata } from 'next';
import Navigation from '../components/layout/navigation/navigation';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.usvisago.com'),
  title: {
    default: '美签申请 - 全中文DS160表格填写',
    template: '%s | 美签申请 - 全中文DS160表格填写',
  },
  description:
    '全中文美国签证DS160表格填写，10分钟快速完成，支持EVUS注册、美国酒店预订及美签面谈时间查询，无需中介，轻松DIY。',
  keywords: [
    '美签申请',
    '美国签证',
    'DS160表格',
    'EVUS注册',
    '美国酒店预订',
    '美签面谈时间查询',
    '美国旅游签证',
    'B1/B2签证',
    'visa application',
    'US visa',
    'EVUS registration',
    'US hotel booking',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: {
      default: '美签申请 - 全中文DS160表格填写',
      template: '%s | 美签申请 - 全中文DS160表格填写',
    },
    description:
      '全中文申请，简化美国签证DS160表格填写，预设自动填充选项，最短10分钟即可完成申请，无需找中介，自己DIY也可完成。',
    url: 'https://www.usvisago.com',
    siteName: 'USVisaGo',

    type: 'website',
    locale: 'zh_CN',
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
