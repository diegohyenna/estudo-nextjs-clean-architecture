export const formatDate = (date: Date | null) => {
  if (!date) return;
  return `${date.getFullYear()}-${("00" + (date.getMonth() + 1)).slice(-2)}-${(
    "00" + date.getDate()
  ).slice(-2)}`;
};
