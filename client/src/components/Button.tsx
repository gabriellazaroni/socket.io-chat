import type { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode
  onClick?: VoidFunction
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div>

      <button
        className="bg-[#792CC7] mt-4 rounded-lg w-screen max-w-[150px] m-auto h-10 font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    </div>

  )
}