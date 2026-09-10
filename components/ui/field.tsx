/**
 * Поле формы: подпись, звёздочка обязательности и одинаковый вид у всех
 * инпутов. Отдельным файлом, потому что формы будет больше одной, а поле,
 * скопированное во второй раз, всегда расходится с первым.
 */
export function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12.5px] font-medium text-snow-2">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-[#0f151e] px-3.5 py-2.5 text-[14px] text-snow placeholder:text-snow-3/70 focus:border-primary focus:outline-none"
      />
    </div>
  );
}
