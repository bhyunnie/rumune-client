const currencyUtil = {
  addComma: (original: number | null) => {
    if (!original) return null;
    return original
      .toString()
      .split("")
      .reverse()
      .map((e, idx) => (idx % 3 === 2 ? `,${e}` : e))
      .reverse()
      .join("");
  },
};

export default currencyUtil;
