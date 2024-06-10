import CredentialDTO from "./credentials-dto";
export default interface DTO extends CredentialDTO {
  id: string;
  firstName: string;
  lastName: string;
  role: number;
}

export enum Roles {
    ADMIN = 1,
    USER = 2
}
