"use client";

import { MantineProvider } from '@mantine/core';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Router } from "next/router";
import { ReactNode, useEffect } from 'react';

export default function ClientMantineProvider ({children}:{children:ReactNode}){
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <RouterTransition />
            {children}
        </MantineProvider>
    )
}

function RouterTransition() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      const routeUrl = pathname + searchParams.toString();

      const handleStart = (url: string) => url !== routeUrl && nprogress.start();
      const handleComplete = () => nprogress.complete();
      
      Router.events.on('routeChangeStart', handleStart);
      Router.events.on('routeChangeComplete', handleComplete);
      Router.events.on('routeChangeError', handleComplete);
  
      return () => {
        Router.events.off('routeChangeStart', handleStart);
        Router.events.off('routeChangeComplete', handleComplete);
        Router.events.off('routeChangeError', handleComplete);
      };
    }, [pathname, searchParams]);
  
    return <NavigationProgress autoReset={true} progressLabel="Loading Page" />;
  }