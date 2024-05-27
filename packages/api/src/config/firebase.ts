import { getEnv } from "../helpers/getEnv";

export const firebaseConfigAdmin = {
    type: getEnv("type"),
    project_id: getEnv("project_id"),
    private_key_id: getEnv("private_key_id"),
    private_key: getEnv("private_key"),
    client_email: getEnv("client_email"),
    client_id: getEnv("client_id"),
    auth_uri: getEnv("auth_uri"),
    token_uri: getEnv("token_uri"),
    auth_provider_x509_cert_url: getEnv("auth_provider_x509_cert_url"),
    client_x509_cert_url: getEnv("client_x509_cert_url"),
    universe_domain: getEnv("universe_domain"),
  };
  
  export const firebaseConfigClient = {
    apiKey: process.env.apiKey!,
    authDomain: process.env.authDomain!,
    projectId: process.env.projectId!,
    storageBucket: process.env.storageBucket!,
    messagingSenderId: process.env.messagingSenderId!,
    appId: process.env.appId!,
  };