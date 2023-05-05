const Input = ({
    placeHolder,
    value = '',
    onChange,
    ref,
    type = 'text',
    className,
    required = false,
    min,
    disabled
}) => {
    return (
        <input
            className={"placeholder:italic placeholder:text-slate-400 block  w-full border border-primary-900 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none bg-primary-900/[0.2] focus:border-primary-900 focus:ring-primary-500 focus:ring-1 text-sm " + className}
            placeholder={placeHolder}
            type={type}
            value={value ?? ''}
            ref={ref}
            onChange={onChange}
            required={required}
            disabled={disabled}
            min={min}
        />
    )
}

export default Input