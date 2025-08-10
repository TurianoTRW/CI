import AuthRedirect from "@/components/AuthRedirect";

export const dynamic = 'force-dynamic';

export default function Home() {
  return <AuthRedirect />;
}