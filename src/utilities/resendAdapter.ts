import axios from 'axios';
import * as cheerio from 'cheerio'; 
import { EmailAdapter, SendEmailOptions } from 'payload';

const resendAdapter = (): EmailAdapter => {
  const adapter = () => ({
    name: "resend",
    defaultFromName: process.env.RESEND_SENDER_NAME as string,
    defaultFromAddress: process.env.RESEND_SENDER_EMAIL as string,
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      if (!process.env.RESEND_EMAILS_ACTIVE) {
        console.log("Emails disabled, logging to console");
        console.log(message);
        return;
      }

      try {
        // Sử dụng cheerio để trích xuất URL từ nội dung HTML
        const $ = cheerio.load(message.html || "");
        const url = $('a').attr('href');

        if (!url) {
          throw new Error("No URL found in the provided email content");
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`, {
          email: message.to,
          subject: message.subject,
          url,
        });

        return response.data;
      } catch (error) {
        console.error("Error sending email via API route:", error);
        throw error;
      }
    },
  });

  return adapter;
};

export default resendAdapter;
