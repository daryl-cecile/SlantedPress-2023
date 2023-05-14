import { MantineProvider } from '@mantine/core';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { useRouter } from 'next/router';
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
    const router = useRouter();
  
    useEffect(() => {
      const handleStart = (url: string) => url !== router.asPath && nprogress.start();
      const handleComplete = () => nprogress.complete();
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
  
      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }, [router.asPath]);
  
    return <NavigationProgress autoReset={true} progressLabel="Loading Page" />;
  }