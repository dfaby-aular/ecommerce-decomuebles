const Input = ({ title, value, type, onChange, error }) => {

    const handleValue = (e) => {
        onChange(e);
    };

    return (
        <>
            <div className="mb-3">
                <label className="form-label">{title}</label>
                <input
                    name={title}
                    className="form-control"
                    type={type ?? 'text'}
                    defaultValue={value}
                    onChange={handleValue}
                    required
                />
                {
                    error &&
                    <span className="font-weight-bold font-size-sm my-1 text-danger">
                        This field is required
                    </span>
                }
            </div>
        </>
    )
}
export default Input;