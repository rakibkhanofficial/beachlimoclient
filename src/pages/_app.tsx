import { type Session } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "~@/_redux/store/store";
import { useEffect } from "react";
import { endPoints } from "~@/utils/api/route";
import { postMethod } from "~@/utils/api/postMethod";
import { useAppDispatch } from "~@/_redux/hooks/hooks";
import { handleErros } from "~@/modules/auth/_redux/actions/login-auth-actions";
import Head from "next/head";
import { RecoilRoot } from 'recoil'
import "../styles/globals.css";
// import metaData from '../../public/meta.json'
import manifest from '../../public/manifest.json'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <RecoilRoot>

        <Head>

        {/* pwa start from here */}
        <meta name="application-name" content={manifest.name} />
        <meta name="description" content={manifest.description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/pwaimage/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        {/* Add to home screen for iOS */}
        <meta name="apple-mobile-web-app-title" content={manifest.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/pwaimage/appleicon/60.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pwaimage/appleicon/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/pwaimage/appleicon/152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/pwaimage/appleicon/120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/pwaimage/appleicon/76.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/pwaimage/appleicon/1024.png" />

        {/* apple splash screen images */}
        <link rel="apple-touch-startup-image" href="/pwaimage/appleicon/60.png" />
        {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
        <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}

        {/* Add to home screen for Android */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={manifest.name} />
        <link rel="icon" sizes="192x192" href="/pwaimage/icon192.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/pwaimage/icon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pwaimage/icon16.png" />

        {/* web app manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Safari Pinned Tab icon */}
        <link rel="mask-icon" href="/pwaimage/icon32.png" color="#5bbad5" />

        {/* Shortcut icon */}
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Twitter meta tag */}
        <meta name="twitter:card" content={manifest.short_name} />
        <meta name="twitter:url" content={manifest.url} />
        <meta name="twitter:title" content={manifest.name} />
        <meta name="twitter:description" content={manifest.description} />
        <meta name="twitter:image" content="https://www.beachlimofl.com/pwaimage/icon192.png" />
        <meta name="twitter:creator" content="Beachlimofl" />
        </Head>
    <SessionProvider session={session}>
      <NextThemesProvider defaultTheme="system" attribute="class">
        <NextUIProvider>
          <Provider store={store}>
            <Main>
              <Component {...pageProps} />
            </Main>
            <Toaster />
          </Provider>
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
    </RecoilRoot>
  );
};

export default MyApp;

const Main = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        if (session?.user.id) {
          const response = await postMethod({
            route: endPoints.auth.login,
            postData: {
              email: session?.user.email,
              password: session?.user.id,
            },
          });
          if (response?.data?.statusCode === 200) {
            await signIn("credentials", {
             ...response?.data?.user,
              redirect: false,
            });
          }
          else{
            dispatch(handleErros("loginError", ""));
            await signOut({
              callbackUrl: "/login",
            });
            return;
          }
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    handleLogin();
  }, [session, dispatch]);

  return <div>{children}</div>;
};
