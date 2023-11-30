interface ButtonProps {
  label: string
  secondary?: boolean
  withDelete?: boolean
  fullWidth?: boolean
  large?: boolean
  onClick: () => void
  disabled?: boolean
  outline?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, secondary, withDelete, fullWidth, onClick, large, disabled, outline }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : withDelete ? 'bg-red-700' : 'bg-sky-500'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
      `}>
      {label}
    </button>
  )
}

export default Button
