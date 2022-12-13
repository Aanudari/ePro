export const arraySearch = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter((value) => {
    return (
      value.complainType.toLowerCase().match(new RegExp(searchTerm, "g")) ||
      value.description.toLowerCase().match(new RegExp(searchTerm, "g")) ||
      value.rule.toLowerCase().match(new RegExp(searchTerm, "g"))
    );
  });
};
