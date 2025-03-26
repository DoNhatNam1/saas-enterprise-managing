declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      UPLOADTHING_SECRET: string
      UPLOADTHING_APP_ID: string
      UPLOADTHING_URL: string
      RESEND_API_KEY: string
      APPID: string
      KEY1: string
      BLOB_READ_WRITE_TOKEN: string
      KEY2: string
      ZLP_MERCHANT_CALLBACK_URL: string
      KINDE_CLIENT_ID: string
      KINDE_CLIENT_SECRET: string
      KINDE_ISSUER_URL: string
      KINDE_SITE_URL: string
      KINDE_POST_LOGOUT_REDIRECT_URL: string
      KINDE_POST_LOGIN_REDIRECT_URL: string
      RESEND_SENDER_NAME: string
      RESEND_SENDER_EMAIL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
