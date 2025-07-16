export interface customerAccount {
  type:        string;
  id:          string;
  balance:     number;
  createdAt:   Date;
  status:      string;
  customerDTO: CustomerDTO;
  overDraft:   number;
}

export interface CustomerDTO {
  id:    number;
  name:  string;
  email: string;
}
