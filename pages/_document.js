import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="smooth-scroll dark">
      <Head />
      <body className="bg-black text-white">
        <Main />
        <NextScript />
        <div id="modal-backdrop" />
        <div id="toast-backdrop" />
      </body>
    </Html>
  );
}
