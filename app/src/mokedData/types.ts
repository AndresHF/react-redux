interface WithTitle {
  title: string;
}

export type TitleType = {
  title: string;
  cost: string;
  units: string;
  taxes: string;
  average: string;
  availabilty: string;
  confirmed: string;
};

export interface DataType extends WithTitle {
  key: number;
  cost: number;
  units: number;
  taxes: number;
  average: number;
  availabilty: boolean;
  confirmed: boolean;
}
