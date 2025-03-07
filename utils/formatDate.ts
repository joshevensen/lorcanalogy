export default function (dateToFormat: string | Date | undefined) {
  if (!dateToFormat) return null;

  return new Date(String(dateToFormat))
    .toLocaleDateString('en-US', {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
}
