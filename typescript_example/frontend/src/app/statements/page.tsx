"use client"

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Transaction {
    id: number;
    createdAt: Date;
    amount_in_cents: number;
    description: string;
    label: string;
}

interface Statement {
    id: number;
    name: string;
    createdAt: Date;
    transactions: Transaction[]
}

interface User {
    id: number;
    name: string;
}

export default function StatementsPage() {
    const router = useRouter();

    const [statements, setStatements] = useState<Statement[]>([]);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        apiFetch<Statement[]>("statements")
        .then(data => setStatements(data))
        .catch(() => router.push("/login"))
    }, [router])


    async function handleAddStatement(event: FormEvent) {
        event.preventDefault();
        const name = newName.trim()

        if (!name) return

        try {
            const createdStatement = await apiFetch<Statement>("statements", {
                method: "POST",
                body: JSON.stringify({ name }),
            });

            setStatements( prev => [createdStatement, ...prev]);
            setNewName("");
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <main className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Statements & Transactions</h1>
    
          {/* Add Statement Form */}
          <form onSubmit={handleAddStatement} className="flex mb-6">
            <input
              type="text"
              placeholder="Name of Statement"
              value={newName}
              onChange={event => setNewName(event.target.value)}
              className="flex-1 px-3 py-2 border rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700 transition"
            >
              Add Statement
            </button>
          </form>
    
          {statements.length === 0 ? (
            <p className="italic text-gray-500">No statements found.</p>
          ) : (
            statements.map((s, idx) => (
              <section key={s.id} className="mb-8">
                <h2 className="text-xl font-semibold mb-1">
                  {idx + 1}. {s.name}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Created at: {new Date(s.createdAt).toLocaleString()}
                </p>
    
                {s.transactions.length === 0 ? (
                  <p className="italic text-gray-500">No transactions.</p>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-1 text-left">#</th>
                        <th className="border px-3 py-1 text-left">Date</th>
                        <th className="border px-3 py-1 text-left">Description</th>
                        <th className="border px-3 py-1 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.transactions.map((t, i) => (
                        <tr
                          key={t.id}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="border px-3 py-1">{i + 1}</td>
                          <td className="border px-3 py-1">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </td>
                          <td className="border px-3 py-1">{t.description}</td>
                          <td className="border px-3 py-1 text-right">
                            {(t.amount_in_cents / 100)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>
            ))
          )}
        </main>
      )
}