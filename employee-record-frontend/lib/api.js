// All backend calls live here. Change the URL in .env.local, not in code.
const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.message || data.error || message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json().catch(() => null);
}

// In-memory array uses `id`, MongoDB uses `_id`. This handles both.
export const getId = (emp) => emp._id ?? emp.id;

export async function getEmployees() {
  const data = await request("/employees");
  // Works whether your API returns [..] or { employees: [..] } or { data: [..] }
  if (Array.isArray(data)) return data;
  return data?.employees ?? data?.data ?? [];
}

export const createEmployee = (body) =>
  request("/employees", { method: "POST", body: JSON.stringify(body) });

export const updateEmployee = (id, body) =>
  request(`/employees/${id}`, { method: "PUT", body: JSON.stringify(body) });

export const deleteEmployee = (id) =>
  request(`/employees/${id}`, { method: "DELETE" });