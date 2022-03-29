import {FieldState} from "final-form";
// import {t} from "@lingui/macro";

const t = (thing: any) => thing

export type ValidatorFunction = ((value: any, allValues: Object, meta?: FieldState<any>) => any)

const required = (value: any) => value ? undefined : t`Required`;


const mustBeANumber = (value: any) => isNaN(value) ? t`Must be a number` : undefined;


const minValue = (min: any) => (value: any) =>
  isNaN(value) || value >= min ? undefined : t`Must be greater than`


const maxValue = (max: any, customString?: string) => (value: any) => {
  const stringToReturn = customString ? customString : t`Must be less than`
  return isNaN(value) || value <= max ? undefined : stringToReturn
}

const exactLength = (length: any) => (value: string) =>
  value.length === length ? undefined : t`Must be characters long`

const maxDecimalPlaces = (max: number) => (value: any) => {
  const decimals = value.toString().split(".")[1]
  if (decimals) {
    if (decimals.length > max) {
      return t`Max precision places`
    }
  }
  return undefined
}

const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)


export {
  required,
  mustBeANumber,
  minValue,
  maxValue,
  exactLength,
  composeValidators,
  maxDecimalPlaces
}
