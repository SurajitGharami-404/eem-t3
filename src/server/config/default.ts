import { env } from "~/env";
import { baseUrl } from "~/utils/constants";

const customConfig: {
    port: number;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    origin: string;
    dbUri: string;
    accessTokenPrivateKey: string;
    refreshTokenPrivateKey: string;
    accessTokenPublicKey: string;
    refreshTokenPublicKey: string;
    redisCacheExpiresIn: number;
  } = {
    port: 8000,
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 60,
    origin:baseUrl,
    redisCacheExpiresIn: 60,
  
    dbUri: env.DATABASE_URL,
    accessTokenPrivateKey: env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: env.REFRESH_TOKEN_PUBLIC_KEY,
  };
  
  export default customConfig;