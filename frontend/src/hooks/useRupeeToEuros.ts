const useRupeeToEuros = (price?: number): number | undefined => {
  const priceInEuros = price && Math.floor(price * 0.011);
  return priceInEuros;
};

export default useRupeeToEuros;
