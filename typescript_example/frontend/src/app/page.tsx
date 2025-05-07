import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Income and Expenditure Tracker</h1>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
