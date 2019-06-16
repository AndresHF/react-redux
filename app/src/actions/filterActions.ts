export const filterItems = (
  activated: boolean,
  type: "availability" | "confirmed"
) => {
  console.log(`SET_${type.toUpperCase()}_FILTER`);
  return {
    type: `SET_${type.toUpperCase()}_FILTER`,
    activated
  };
};
