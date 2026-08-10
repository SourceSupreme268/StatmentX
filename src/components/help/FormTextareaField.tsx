interface FormTextareaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextareaField({
  label,
  name,
  placeholder,
  required,
  rows = 5,
}: FormTextareaFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="mt-1.5 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}