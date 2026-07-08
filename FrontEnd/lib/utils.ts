export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
