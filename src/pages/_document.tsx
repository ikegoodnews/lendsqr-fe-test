import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
