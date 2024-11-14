export const getFullName = (
  firstName: string,
  middleInitial = "",
  lastName: string,
) => {
  if (middleInitial && middleInitial !== "") {
    return `${firstName} ${middleInitial} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
};
