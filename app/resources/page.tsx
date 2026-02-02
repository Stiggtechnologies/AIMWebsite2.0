import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'Resources | Alberta Injury Management',
  description: 'Educational resources and information about injury management and rehabilitation.',
};

export default function ResourcesPage() {
  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Resources
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Educational information and tools to support your recovery journey.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-lg text-aim-slate">
            Resources coming soon. Contact us for information about your specific condition or injury.
          </p>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
