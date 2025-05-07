interface InputFormProps {
  type?: string
  placeHolder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ type, placeHolder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      onChange={onChange}
      className="w-full bg-[#fff] text-[#000] border-3 border-[#792CC7] rounded-lg h-10 px-2"
    />
  )
}