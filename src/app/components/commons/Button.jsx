const Button = ({
    style = {},
    click = null,
    type = 'button',
    className = "",
    disabled = false,
    textButton = '',
    variant = 'primary'
}) => {

    return (
        <>
            <button
                style={style}
                disabled={disabled}
                type={type}
                className={`btn btn-${variant} ${className}`}
                onClick={(event) => {
                    event.preventDefault();
                    click();
                }}
            >
                {textButton}
            </button>
        </>
    )
}
export default Button;