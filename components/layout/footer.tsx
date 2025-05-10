import Container from './Container';

const Footer = () => {
  return (
    <>
      <div className="mt-16 border-b-1"></div>
      <Container className="mt-20 flex flex-col gap-4 pb-20 text-left">
        <span className="font-bold">深圳酷象科技有限公司（技术支持）</span>
        <span className="w-full text-sm text-neutral-600 lg:w-1/2">
          总部位于深圳，是一家高科技企业，专注软件研发，致力于通过人工智能、大数据和云计算等技术，为客户提供创新、高效的解决方案，助力数字化转型与产业升级。
        </span>
        <span className="text-sm text-neutral-500">@USAVisaGo 2021-2028</span>
      </Container>
    </>
  );
};

export default Footer;
