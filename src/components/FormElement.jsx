function FormElement(props) {
    const {
        name,
        type = "text",
        labelText,
        inputPlaceholder
    } = props;
    
    const computedLabelText = labelText ?? name[0].toUpperCase() + name.slice(1) + ": ";
    const computedPlaceholder = inputPlaceholder ?? `Enter your ${name}`;
    const format = type == "tel" ? 
    <div className="form-text">
        Enter a UK mobile number, e.g. <code>07123 456789</code> or <code>+447123456789</code>
    </div>
    : null;

    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={name}>{computedLabelText}</label>
            <input 
                type={type} 
                name={name}
                className="form-control"
                placeholder={computedPlaceholder} 
                required
            />
            <br></br>{format}
        </div>
    );
}

export default FormElement;
