import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="form-label">{props.title}
      </label>
      <input
        type={props.type}
        className={props.className}
        id={props.id}
        ref={ref}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>

  )
});

export default Input