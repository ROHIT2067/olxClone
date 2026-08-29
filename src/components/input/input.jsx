

const Input = (props) => {
    const {setInput, placeholder, error, type = 'text', inputMode} = props
    const inputId = placeholder.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full pt-2">
      <div className="relative">
        <input
          onChange={(event) => setInput(event.target.value)}
          type={type}
          inputMode={inputMode}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`peer w-full rounded-md border-2 p-3 pb-2 pt-4 focus:outline-none ${error ? 'border-red-600' : 'border-black'}`}
          required
        />
        <label htmlFor={inputId} className="absolute left-2.5 top-0 bg-white pl-1 pr-1 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">{placeholder}</label>
      </div>
      {error && <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input
