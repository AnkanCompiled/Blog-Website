import { Client, Account } from "appwrite";

export const client = new Client().setProject(
  import.meta.env.VITE_GOOGLE_APPWRITE
);

export const account = new Account(client);
