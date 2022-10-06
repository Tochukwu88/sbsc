interface ICommon {
  modifiedOn?: string;
  deletedFlag?: string;
  deletedOn?: string;
  createdOn?: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface ICompanySignup extends ICommon {
  name: string;
  workDays?: string;
  workHours?: string;
}
export interface IuserSignup extends ICommon {
  fullName?: string;
}
