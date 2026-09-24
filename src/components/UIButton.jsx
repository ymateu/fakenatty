function UIButton({
  children,
  icon,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`bi bi-${icon} me-2`} />}
      {children}
    </button>
  );
}

export default UIButton;
