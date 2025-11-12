export interface User {
    id:           string;
    fullName:     string;
    role:         string;
    email:        string;
    phoneNumber:  string;
    referralCode: null;
    createdAt:    Date;
}

export interface registerForm {
    first_name: string;
    last_name:  string;
    email:      string;
    phone:      string;
    password:   string;
    isChecked:  boolean;
}