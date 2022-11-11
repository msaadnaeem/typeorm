declare namespace NodeJS {
   export interface ProcessEnv {
        SECRET_TYPE:string;
        SECRET_HOST:string;
        SECRET_PORT:number;
        SECRET_USERNAME:string;
        SECRET_PASSWORD:string | undefined;
        SECRET_DATABASE:string;
    }
  }
