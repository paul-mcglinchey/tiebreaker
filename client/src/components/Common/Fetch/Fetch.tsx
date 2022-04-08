export default function Fetch({ render, fetchOutput }: any) {
  console.log(typeof render);
  return render(fetchOutput);
}