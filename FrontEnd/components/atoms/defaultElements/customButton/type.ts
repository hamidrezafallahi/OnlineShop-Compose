export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  model?: "primary" | "ghost" | "text" | "lightBlue";
  className?: string;
}
