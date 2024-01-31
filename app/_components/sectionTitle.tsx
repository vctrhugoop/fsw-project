interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <span className="text-xs uppercase text-gray-400">{title}</span>;
}
