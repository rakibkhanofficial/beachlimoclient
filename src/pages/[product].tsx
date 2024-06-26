import Head from "next/head";
import type { ProductDetailsType } from "~@/types";
import type { servicesProptype } from "~@/types";
import HeaderLandingPage from "~@/components/feature/Header";
import FooterComponent from "~@/components/feature/Footer";
import metaData from "../../public/meta.json";
import CarDetails from "~@/components/feature/Allcars/Cardetails";
import { fetchservice } from "~@/utils/cms/fetchServices";

const Product = ({ product }: ProductDetailsType) => {
  // product id for testing: 00a6f3c5-6877-4f49-a1cf-dbcf554f7d62

  return (
    <>
      <Head>
        <title>Beach Limo:: Cars Details</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:url" content={metaData.url} />
        <meta property="og:type" content={metaData.type} />
        <meta property="og:image" content={metaData.image} />
        <meta name="google-site-verification" content="K81iN0RCpi5NOoiQmvPbDGfFInM19PeDj0yrYEM3P-8" />
        <script dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WL5ZCCVS');
        `,
      }} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderLandingPage />
      <CarDetails product={product} />
      <FooterComponent />
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  const productData = await fetchservice();
  const paths = productData.map((product: servicesProptype) => {
    return {
      params: {
        product: product.slug.current,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const productData = await fetchservice();
  const product = productData.find(
    (product: servicesProptype) => product.slug.current === params.product
  );
  return {
    props: {
      product,
      revalidate: 10,
    },
  };
}
