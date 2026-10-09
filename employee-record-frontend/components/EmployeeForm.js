"use client";

import { useEffect, useState } from "react";
import { FIELDS, emptyForm } from "@/lib/fields";

export default function EmployeeForm({ editing, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(emptyForm());

  // When "Edit" is clicked, fill the form. When cleared, reset it.
  useEffect(() => {
    if (editing) {
      const filled = emptyForm();
      FIELDS.forEach((f) => (filled[f.key] = editing[f.key] ?? ""));
      setForm(filled);
    } else {
      setForm(emptyForm());
    }
  }, [editing]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form };
    FIELDS.forEach((f) => {
      if (f.type === "number" && body[f.key] !== "") body[f.key] = Number(body[f.key]);
    });
    const ok = await onSubmit(body);
    if (ok && !editing) setForm(emptyForm());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {editing ? "Edit employee" : "Add employee"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.key} className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-600">
              {f.label}
              {f.required && <span className="text-red-500"> *</span>}
            </span>
            <input
              name={f.key}
              type={f.type}
              value={form[f.key]}
              onChange={handleChange}
              required={f.required}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {saving ? "Saving..." : editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
           className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}