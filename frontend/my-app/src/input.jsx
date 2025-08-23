const Input = ({ name, value, label, onChange, type, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type={type}
        className={`form-input ${error ? 'invalid' : ''}`}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;
