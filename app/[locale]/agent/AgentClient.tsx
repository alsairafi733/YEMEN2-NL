'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';

const INITIAL_MESSAGES = [
  { role: 'assistant', text: 'مرحباً أحمد! أنا وكيل YEMEN2 الذكي. كيف يمكنني مساعدتك اليوم؟ / Hello Ahmed! I am the YEMEN2 AI Agent. How can I help you today?' },
  { role: 'user',      text: 'كم عدد العمال النشطين؟' },
  { role: 'assistant', text: '✅ لديك حالياً **18 عاملاً نشطاً** في منصة Y2Flex. منهم 3 في Rotterdam، 2 في Amsterdam، والباقون موزعون على باقي المدن. هل تريد تفصيلاً أكثر؟' },
];

const ACTIVITIES = [
  { time: '07:45', action: 'Processed 3 job applications from Y2Flex portal', type: 'success' },
  { time: '07:30', action: 'Sent 5 contract reminders via WhatsApp', type: 'info' },
  { time: '07:00', action: 'Published 12 articles across 100 sites (AI-generated)', type: 'success' },
  { time: '06:30', action: 'Responded to 23 customer inquiries (Arabic/English)', type: 'success' },
  { time: '00:00', action: 'Daily report generated and sent to ahmed@yemen2.nl', type: 'info' },
];

export function AgentClient({ locale }: { locale: string }) {
  const t = useTranslations('agent');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setLoading(true);
    const userMsg = input;
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `✅ تم استلام طلبك: "${userMsg}"\n\nأنا أعالج هذا الطلب الآن وسأنفذه آلياً. ستصلك نتيجة التنفيذ خلال دقيقة. / Your request has been received and is being processed automatically.`,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header">
        <h1 className="page-title">{t('title')}</h1>
        <p className="page-subtitle">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('agent_status')}      value={t('online')}     icon="🤖" color="bg-purple-600" />
        <StatCard title={t('tasks_today')}        value="147"              icon="✅" color="bg-green-600" />
        <StatCard title={t('messages_handled')}   value="89"               icon="💬" color="bg-blue-600"  />
        <StatCard title={t('auto_responses')}     value="72"               icon="⚡" color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2 card flex flex-col" style={{ height: '520px' }}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">🤖</div>
            <div>
              <p className="font-semibold text-sm">YEMEN2 AI Agent</p>
              <p className="text-xs text-green-500">● {t('online')}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                  ${m.role === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 text-sm text-gray-400">
                  ⏳ Processing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              className="input flex-1"
              placeholder={t('chat_placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button className="btn-primary px-5" onClick={send}>{t('send')}</button>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="section-title">{t('capabilities')}</h3>
            <ul className="space-y-2">
              {[t('cap1'), t('cap2'), t('cap3'), t('cap4'), t('cap5'), t('cap6')].map((cap, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="section-title">{t('recent_activity')}</h3>
            <div className="space-y-2">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <span className="text-gray-400 whitespace-nowrap">{a.time}</span>
                  <span className={`leading-relaxed ${a.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                    {a.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
