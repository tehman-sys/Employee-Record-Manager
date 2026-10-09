"use client";

import { FIELDS } from "@/lib/fields";
import { getId } from "@/lib/api";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
    if (employees.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No employees found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                    <tr>
                        <th className="px-4 py-3 font-medium">ID</th>
                        {FIELDS.map((f) => (
                            <th key={f.key} className="px-4 py-3 font-medium">
                                {f.label}
                            </th>
                        ))}
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                        <tr key={getId(emp)} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-slate-500">{getId(emp)}</td>
                            {FIELDS.map((f) => (
                                <td key={f.key} className="px-4 py-3 text-slate-700">
                                    {emp[f.key] ?? "-"}
                                </td>
                            ))}
                            <td className="px-4 py-3 text-right">
                                <button
                                    type="button"
                                    onClick={() => onEdit(emp)}
                                    className="mr-2 cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0 active:scale-95"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(emp)}
                                    className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md active:translate-y-0 active:scale-95"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}