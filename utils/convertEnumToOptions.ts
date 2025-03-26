import {lowerCase, startCase} from "lodash";
import type {OPTION} from "~/app.types";

export default function (enumToConvert: any): OPTION[] {
  return Object.entries(enumToConvert).map(([key, value]) => {
    return {
      label: startCase(lowerCase(key)),
      value: value as unknown as string | number | null,
    };
  });
}
