interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email";
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}