'use client';
import { useState, useEffect } from 'react';
import { signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

interface UserAttributes {
  email?: string;
  filteredCountryList?: string[];
  emailVerified?: boolean;
  userId?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserAttributes>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Auth guard — redirect to /login if not authenticated
        await getCurrentUser();
      } catch {
        router.push('/login');
        return;
      }

      try {
        const attributes = await fetchUserAttributes();
        const currentUser = await getCurrentUser();

        setUser({
          email: attributes.email,
          filteredCountryList: attributes['custom:filteredCountryList']?.split(','),
          emailVerified: attributes['email_verified']?.toLowerCase() === 'true',
          userId: currentUser.userId,
        });

        // Fetch JWT and call BFF
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        if (token) {
          const res = await fetch('/api/external-data', {
            headers: { Authorization: 'Bearer ' + token },
          });
          if (res.ok) {
            const data: Post[] = await res.json();
            setPosts(data.slice(0, 5));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [router]);

  return (
    <div>
      <div>
        <h2>Dashboard</h2>
        <p>Email: {user.email}</p>
        <p>Filtered Country List: {user.filteredCountryList}</p>
        <p>Email Verified: {user.emailVerified ? 'true' : 'false'}</p>
        <p>User ID: {user.userId}</p>
      </div>

      <h3>Posts (via BFF)</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
