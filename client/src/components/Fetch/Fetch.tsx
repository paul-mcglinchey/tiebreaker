import { IFetchProps } from "../../models";

export default function Fetch({ render, fetchOutput }: IFetchProps) {
  return render(fetchOutput);
}