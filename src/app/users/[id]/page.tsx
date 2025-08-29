import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/brainly';
import type { Metadata } from 'next';
import { UserProfileDetails } from '@/components/user-profile-details';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await getUserById(params.id);

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.name}'s Profile | AskShiva`,
    description: `View the profile and stats for ${user.name}.`,
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return <UserProfileDetails user={user} />;
}
