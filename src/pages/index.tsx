import Head from "next/head";
import FooterComponent from "~@/components/feature/Footer";
import HomeComponent from "~@/components/feature/Header";
import metaData from "../../public/meta.json";
import Main from "~@/Layouts/Main";
import GoToTopButton from "~@/components/elements/GoToTopButton/GoToTopButton";
import WhatsAppChatbot from "~@/components/feature/WhatsAppChatbot/WhatsAppChatbot";

export default function Home() {
  return (
    <>
      <Head>
        <Head>
          <title>Beach Limo : Car Rental Services</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <meta property="og:title" content={metaData.title} />
          <meta property="og:description" content={metaData.description} />
          <meta property="og:url" content={metaData.url} />
          <meta property="og:type" content={metaData.type} />
          <meta property="og:image" content={metaData.image} />
          <meta
            name="google-site-verification"
            content="K81iN0RCpi5NOoiQmvPbDGfFInM19PeDj0yrYEM3P-8"
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WL5ZCCVS');
        `,
            }}
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
      </Head>
      <HomeComponent />
      <main>
        <Main />
        <GoToTopButton />
        <WhatsAppChatbot />
      </main>
      <FooterComponent />
    </>
  );
}
