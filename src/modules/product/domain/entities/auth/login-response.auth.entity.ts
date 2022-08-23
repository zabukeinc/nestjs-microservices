interface Role {
  role_id: number;
}

interface Company {
  company_id: number;
  company_name: string;
}

export interface LoginResponseAuthEntity {
  token: string;
  passwordExpired: boolean;
  userName: string;
  roles: Role[];
  acls: any[];
  packageId: number;
  trialLeft: number;
  showGettingStarted: boolean;
  currentCompany: number;
  companies: Company[];
  isOwner: boolean;
}
