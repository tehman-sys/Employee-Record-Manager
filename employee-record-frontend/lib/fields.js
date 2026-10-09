// Change these to match your backend's employee schema.
// `key` must match the field name your API expects/returns.
export const FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "role", label: "Role", type: "text", required: true },
];

export const emptyForm = () =>
  Object.fromEntries(FIELDS.map((f) => [f.key, ""]));