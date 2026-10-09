"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getId,
} from "@/lib/api";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setError("");
      setEmployees(await getEmployees());
    } catch (err) {
      setError(
        `${err.message}. Is the backend running and is CORS enabled?`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (body) => {
    setSaving(true);
    try {
      setError("");
      if (editing) {
        await updateEmployee(getId(editing), body);
        setEditing(null);
      } else {
        await createEmployee(body);
      }
      await load();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (emp) => {
    if (!confirm(`Delete ${emp.name ?? "this employee"}?`)) return;
    try {
      setError("");
      await deleteEmployee(getId(emp));
      if (editing && getId(editing) === getId(emp)) setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) =>
      Object.values(e).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [employees, search]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">
            Employee Record Manager
          </h1>
          <p className="text-sm text-slate-300">
            {employees.length} employee{employees.length === 1 ? "" : "s"}
          </p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
        />
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <EmployeeForm
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
        saving={saving}
      />

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <EmployeeTable
          employees={filtered}
          onEdit={(emp) => {
            setEditing(emp);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}