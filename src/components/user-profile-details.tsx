'use client';

import type { UserProfile, SubjectAnswers } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-sm text-primary">{`Answers: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export function UserProfileDetails({ user }: { user: UserProfile }) {
  const chartData = user.answersBySubject.slice(0, 10);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <header className="flex flex-col sm:flex-row items-center gap-6 mb-12">
        <Avatar className="h-24 w-24 text-3xl">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          {user.description && (
            <p className="mt-2 text-muted-foreground">{user.description}</p>
          )}
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard title="Points" value={user.stats.points.toLocaleString()} />
          <StatCard title="Answers" value={(user.answersBySubject.reduce((acc, s) => acc + s.answers, 0)).toLocaleString()} />
          <StatCard title="Questions" value={user.stats.totalQuestions.toLocaleString()} />
          <StatCard title="Thanks Received" value={user.stats.totalThanks.toLocaleString()} />
          <StatCard title="Best Answers" value={user.stats.bestAnswers.toLocaleString()} />
          <StatCard title="Followers" value={user.stats.followers.toLocaleString()} />
          <StatCard title="Following" value={user.stats.following.toLocaleString()} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Answers by Subject</h2>
        {chartData.length > 0 ? (
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="subject"
                    type="category"
                    width={120}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }} />
                  <Bar dataKey="answers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="answers" position="right" className="fill-foreground font-semibold"/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground">This user hasn't answered any questions yet.</p>
        )}
      </section>
    </div>
  );
}
