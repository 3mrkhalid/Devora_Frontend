import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center
      bg-slate-50 px-6 text-slate-900
      dark:bg-background dark:text-white">

      <div className="mx-auto flex max-w-lg flex-col items-center
        text-center">

        <div className="mb-6 flex h-24 w-24 items-center
          justify-center rounded-3xl bg-indigo-100
          text-indigo-600 dark:bg-indigo-500/15
          dark:text-indigo-400">
          <FileQuestion size={48} strokeWidth={1.5} />
        </div>

        <p className="text-7xl font-bold tracking-tight
          text-indigo-600 dark:text-indigo-400">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 max-w-md leading-7 text-slate-600
          dark:text-slate-400">
          The page you’re looking for doesn’t exist
          or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2
            rounded-xl bg-indigo-600 px-6 py-3 font-medium
            text-white transition hover:bg-indigo-700
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-indigo-500
            focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-slate-950"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <p className="mt-8 text-sm text-slate-500
          dark:text-slate-400">
          Lost your way?<span className="ml-2">Let’s get you back on track.</span>
        </p>
      </div>
    </main>
  );
}
