import { Client, Account } from "appwrite";

export const client = new Client().setProject("67387ee5002c4bd6cce6");

export const account = new Account(client);
