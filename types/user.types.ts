
namespace UserTypes {

  export enum UserType {
    puplic = 'public',
    private = 'private',
  }

    export interface User {
        id: string;
        username: string;
        password: string;
        email: string;
      }

  
  export interface Permissions {
    id: string;
    name: string;
  } 
  
  export interface Role {
    id: string;
    name: string;
    permissions: number[];
  }

  export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }
 export interface UserRoles {
    id: string;
    roles: number[];
 
  }
}

export {UserTypes}