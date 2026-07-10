'use client';

import dynamic from 'next/dynamic';

const TabBarClient = dynamic(
  () => import('../entities/tab-bar/tab-bar-client'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="py-2 w-full">
      <TabBarClient />
    </div>
  );
}
