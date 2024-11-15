import moment from "moment";
import { Between, In, Not, IsNull, ILike } from "typeorm";

export const generateIndentityCode = (id) => {
  return String(id).padStart(6, "0");
};

export const convertColumnNotationToObject = (notation, nestedValue) => {
  const object = {};
  let pointer = object;
  notation.split(".").map((key, index, arr) => {
    pointer = pointer[key] = index == arr.length - 1 ? nestedValue : {};
  });
  return object;
};

export const columnDefToTypeORMCondition = (columnDef) => {
  const conditionMapping = [];
  for (var col of columnDef) {
    if (col.type === "date") {
      if (
        moment(new Date(col.filter), "MMM DD, YYYY", true).isValid() ||
        moment(new Date(col.filter), "MMMM DD, YYYY", true).isValid() ||
        moment(new Date(col.filter), "YYYY-MM-DD", true).isValid()
      ) {
        conditionMapping.push(
          convertColumnNotationToObject(
            col.apiNotation,
            moment(new Date(col.filter), "YYYY-MM-DD"),
          ),
        );
      }
    } else if (col.type === "date-range") {
      const range: any[] =
        col.filter && col.filter.split(",").length > 0
          ? col.filter.split(",").filter((x) => x)
          : [];
      range[1] = range.length === 1 ? range[0] : range[1];
      if (
        moment(new Date(range[0]), "YYYY-MM-DD", true).isValid() &&
        moment(new Date(range[1]), "YYYY-MM-DD", true).isValid()
      ) {
        conditionMapping.push(
          convertColumnNotationToObject(
            col.apiNotation,
            Between(range[0], range[1]),
          ),
        );
      }
    } else if (col.type === "option-yes-no") {
      if (
        col.filter &&
        col.filter !== "" &&
        ["yes", "no"].some(
          (x) =>
            x.toString().toLowerCase() ===
            col.filter.toString().toLowerCase().trim(),
        )
      ) {
        const value = col.filter.toString().toLowerCase().trim() === "yes";
        conditionMapping.push(
          convertColumnNotationToObject(col.apiNotation, In([value])),
        );
      }
    } else if (col.type === "number-range") {
      const range = col.filter.split("-").map((x) => x?.trim());

      conditionMapping.push(
        convertColumnNotationToObject(
          col.apiNotation,
          Between(range[0], range[1]),
        ),
      );
    } else if (col.type === "precise") {
      conditionMapping.push(
        convertColumnNotationToObject(col.apiNotation, col.filter),
      );
    } else if (col.type === "not" || col.type === "except") {
      conditionMapping.push(
        convertColumnNotationToObject(col.apiNotation, Not(col.filter)),
      );
    } else if (col.type === "in" || col.type === "includes") {
      conditionMapping.push(
        convertColumnNotationToObject(col.apiNotation, In(col.filter)),
      );
    } else if (col.type === "null") {
      conditionMapping.push(
        convertColumnNotationToObject(col.apiNotation, IsNull()),
      );
    } else {
      conditionMapping.push(
        convertColumnNotationToObject(
          col.apiNotation,
          ILike(`%${col.filter}%`),
        ),
      );
    }
  }
  const newArr = [];
  for (const item of conditionMapping) {
    const name = Object.keys(item)[0];
    if (newArr.some((x) => x[name])) {
      const index = newArr.findIndex((x) => x[name]);
      const res = Object.keys(newArr[index]).map((key) => newArr[index][key]);
      res.push(item[name]);
      newArr[index] = {
        [name]: Object.assign({}, ...res),
      };
      res.push(newArr[index]);
    } else {
      newArr.push(item);
    }
  }
  return Object.assign({}, ...newArr);
};
