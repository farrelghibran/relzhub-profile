import Head from "next/head";
import Script from "next/script";

export default function LinkvertiseLink() {
  return (
    <div>
      <Head>
        <Script
          src="https://publisher.linkvertise.com/cdn/linkvertise.js"
          strategy="afterInteractive"
        />
        <Script id="linkvertise-init" strategy="afterInteractive">
          {`linkvertise(541263, { whitelist: ["localhost"], blacklist: [] });`}
        </Script>
      </Head>
      <a href={"localhost:3000/getkey"}>Process</a>
    </div>
  );
}
