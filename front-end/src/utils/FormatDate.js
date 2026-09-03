export const formatProductDate = (date) => {
  const productDate = new Date(date);

  return productDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};