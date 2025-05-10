'use client';
import DataShow from '@/components/home/DataShow';
import Container from '@/components/layout/Container';
import { homeAdvantage } from '@/constants';
import { Button } from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowDropright } from 'react-icons/io';

export default function Home() {
  return (
    <div className="h-full">
      <Container className="mt-28 flex justify-between">
        <div className="flex w-1/2 justify-center">
          <Image
            src="/images/us.png"
            alt="USAVISAGO"
            width={0}
            height={0}
            sizes="100vw"
            className="h-80 w-auto max-w-full"
          />
        </div>
        <div className="flex h-80 w-2/5 flex-col">
          <span className="text-3xl font-bold">只需10分钟完成美签申请</span>
          <span className="mt-10 hidden text-left leading-loose text-neutral-500 md:block">
            全中文申请，简化美国签证DS160表格填写，预设自动填充选项，最短10分钟即可完成申请，无需找中介，自己DIY也可完成。
          </span>

          <div className="mb-8 grid h-full w-full grid-cols-1 content-end gap-4 text-left">
            {/* <StartButton /> */}

            <Button size="lg" color="primary" className="md:w-[70%]" radius="sm" as={Link} href="/term">
              开始在线申请
            </Button>
            <span className="flex items-center gap-1 text-neutral-500">
              <IoIosArrowDropright className="h-4 w-4" />
              <Link href="evus" className="text-sm">
                变更 / 注册EVUS
              </Link>
            </span>
          </div>
        </div>
      </Container>
      <div className="h-full bg-blue-50">
        <Container className="grid grid-cols-2 content-between items-center gap-16 p-14 md:grid-cols-3">
          {homeAdvantage.map((item, index) => (
            <div key={index} className="bg-slate-0 flex flex-col gap-3">
              <div className="relative h-11 w-11">
                <Image src={`/images/${item.icon}.png`} alt="language" fill sizes="100vw" className="object-contain" />
              </div>
              <h3 className="text-lg">{item.title}</h3>
              <h4 className="text-sm leading-loose text-neutral-500">{item.content}</h4>
            </div>
          ))}
        </Container>
      </div>
      <Container className="mt-20 h-full pb-20 text-center">
        <h1 className="h-20 text-neutral-500">每一次服务，我们都以真心相待，用心助您顺利办理美签！</h1>
        <div className="grid grid-cols-4 items-center justify-center">
          <DataShow title="成立于" data={2021} />
          <DataShow title="咨询" data={10000} />
          <DataShow title="申请" data={6000} />
          <DataShow title="通过" data={4000} />
        </div>
      </Container>
    </div>
  );
}
