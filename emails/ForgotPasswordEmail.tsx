import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text } from "@react-email/components";
import * as React from "react";

export function ForgotPasswordEmail({ url }: { url?: string }) {
  return (
  <Html>
    <Head />
    <Preview>Quay lại</Preview>
    <Body className="bg-white">
      <Container className="px-3 mx-auto">
        <Heading className="text-2xl font-bold text-gray-900 my-10">WeldingStore hỗ trợ đổi mật khẩu</Heading>
        <Link
          href={url || "https://notion.so"}
          target="_blank"
          className="text-blue-600 underline block mb-4"
        >
          Click here to log in with this magic link
        </Link>
        <Text className="text-gray-900 mb-4">
          Or, copy and paste this temporary login code:
        </Text>
        <code className="inline-block p-4 w-9/10 bg-gray-100 rounded-md border border-gray-300 text-gray-900">
          {url}
        </code>
        <Text className="text-gray-500 mt-4 mb-4">
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text>
        <Text className="text-gray-500 mt-3 mb-10">
          Hint: You can set a permanent password in Settings & members → My
          account.
        </Text>
        <Img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/static/notion-logo.png`}
          width="32"
          height="32"
          alt="Notion's Logo"
        />
        <Text className="text-xs text-gray-500 mt-3 mb-6">
          <Link
            href="https://notion.so"
            target="_blank"
            className="text-gray-600"
          >
            Notion.so
          </Link>
          , the all-in-one-workspace
          <br />
          for your notes, tasks, wikis, and databases.
        </Text>
      </Container>
    </Body>
  </Html>
  );
};


export default ForgotPasswordEmail;
