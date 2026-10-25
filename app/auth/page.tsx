import { Suspense } from "react";
import Auth from "./_components/auth";
import { parseAuthMode } from "./auth-mode";

export const metadata = {
  title: "Authenticate | Devora - Developer Network",
  description: "Sign in, create an account, or recover your password on Devora.",
};

type LoginPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function AuthPageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-xs font-medium text-muted-foreground">
          Loading authentication...
        </p>
      </div>
    </div>
  );
}

async function AuthRoute({ searchParams }: LoginPageProps) {
  const { mode } = await searchParams;
  const initialMode = parseAuthMode(mode);

  return <Auth key={initialMode} initialMode={initialMode} />;
}

export default function Page({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthRoute searchParams={searchParams} />
    </Suspense>
  );
}
