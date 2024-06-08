export const excludeFieldsFromArray = <T>(
  objArray: T[],
  fields: string[]
): Partial<T>[] => {
  return objArray.map((obj) => {
    const newObj: Partial<T> = { ...obj };
    fields.forEach((field) => {
      const [mainField, subField] = field.split(".");
      if (subField) {
        if (newObj[mainField as keyof T]) {
          const subObj = { ...newObj[mainField as keyof T] } as any;
          delete subObj[subField];
          newObj[mainField as keyof T] = subObj;
        }
      } else {
        delete newObj[mainField as keyof T];
      }
    });
    return newObj;
  });
};

export const excludeFieldsFromObject = <T>(
  obj: T,
  fields: string[]
): Partial<T> => {
  const newObj: Partial<T> = { ...obj };
  fields.forEach((field) => {
    const [mainField, subField] = field.split(".");
    if (subField) {
      if (newObj[mainField as keyof T]) {
        const subObj = { ...newObj[mainField as keyof T] } as any;
        delete subObj[subField];
        newObj[mainField as keyof T] = subObj;
      }
    } else {
      delete newObj[mainField as keyof T];
    }
  });
  return newObj;
};
