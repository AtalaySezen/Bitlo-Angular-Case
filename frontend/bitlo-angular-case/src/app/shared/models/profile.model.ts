
export interface profile {
  country?: string;
  dateOfBirth?: string;
  firstName?: string;
  identityNumber?: string;
  lastName?: string;
  phoneNumber?: string;
  updateDate?: string;
}


export interface ProfileResponse {
  code: number;
  me: profile;
  message: string;
}
