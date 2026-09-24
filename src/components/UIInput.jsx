function UIInput({
  label,
  name,
  value,
  onChange,
  type = "number",
  placeholder,
  help,
  min,
  step,
  options,
  required = true,
}) {
  return (
    <div className="input-panel">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <label className="form-label mb-0 fw-semibold" htmlFor={name}>
          {label}
        </label>
        <details className="help-details">
          <summary aria-label={`Informações sobre ${label}`}>
            <i className="bi bi-question-lg" />
          </summary>
          <div className="help-popover">{help}</div>
        </details>
      </div>
      <div className="input-group input-group-lg">
        {options ? (
          <select
            className="form-select"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="form-control"
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            step={step}
            required={required}
          />
        )}
        {!options && name !== "age" && (
          <span className="input-group-text">
            {name === "weight" ? "kg" : "cm"}
          </span>
        )}
      </div>
    </div>
  );
}

export default UIInput;
