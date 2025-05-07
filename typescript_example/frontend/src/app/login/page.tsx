"use client";

import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        try {
            const { token } = await apiFetch<{user: Record<string, string>, token: string}>("auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem("token", token);

            router.push("/statements");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(String(error))
            }
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
            />
            <button
                type="submit"
                className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Sign In
            </button>
            </form>
            <div className="mt-6">
                <Link href="/signup" passHref>
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    Sign Up
                </button>
                </Link>
            </div>
        </main>
    )
}
