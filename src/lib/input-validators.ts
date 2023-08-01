export function validateText(val: string, minLength: number, maxLength: number) {
  return {
    required: !isNull(val),
    len: lengthInRange(val, minLength, maxLength),
  };
}

export function validateEmail(val: string) {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return {
    required: !isNull(val),
    matches: emailRegEx.test(val),
  };
}

export function lengthInRange(val: string, min: number, max: number) {
  return minLength(val, min) && maxLength(val, max);
}

export function minLength(val: string, length: number) {
  return val.length < length ? false : true;
}

export function maxLength(val: string, length: number) {
  return val.length > length ? false : true;
}

export function isNull(val: string) {
  return (
    [null, 'null', NaN, 'NaN', undefined, 'undefined', false, 'false', ''].includes(
      val
    ) || val.length === 0
  );
}

interface ValidateBodyOptions {
  body: { [key: string]: any };
  expectedPropertys: string[];
  allowNull?: boolean;
}

export function validateBody({
  body,
  expectedPropertys,
  allowNull = false,
}: ValidateBodyOptions) {
  if (!body) return false;
  if (Object.keys(body).length !== expectedPropertys.length) return false;
  if (!Object.keys(body).every((key) => expectedPropertys.includes(key))) return false;
  if (allowNull) return true;
  else if (
    !Object.values(body).every((val) => {
      let result = false;
      if (
        ![null, 'null', NaN, 'NaN', undefined, 'undefined', false, 'false', ''].includes(
          val
        )
      ) {
        result = true;
      }
      if (val.length === 0) result = false;
      return result;
    })
  )
    return false;
  return true;
}
