'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./chat-widget').then(mod => ({ default: mod.ChatWidget })), {
  ssr: false,
  loading: () => null,
});

export function LazyChatWidget() {
  return <ChatWidget />;
}
