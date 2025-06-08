type ButtonProps = {
  onSubmit: () => void;
};

export default function Button({ onSubmit }: ButtonProps) {
  return (
    <button
      onClick={onSubmit}
      type="submit"
      className="bg-[#EB0C0C] hover:bg-[#c00909] text-white rounded-[12px] cursor-pointer w-full sm:w-auto"
      style={{ width: "5.125rem", height: "3rem" }}
    >
      Искать
    </button>
  );
}
