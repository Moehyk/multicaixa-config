import McxValuesInput from "./McxValuesInput";

function Title({ title }: { title: string }) {
  return (
    <div className="text-white font-bold mt-20 mb-5 text-2xl">{title}</div>
  );
}

function Text({ text }: { text: string }) {
  return (
    <p className="text-white text-xl font-medium pt-4 w-4/5 text-center">
      {text}
    </p>
  );
}

export default function McxInput({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

McxInput.Title = Title;
McxInput.Text = Text;
McxInput.Input = McxValuesInput;
