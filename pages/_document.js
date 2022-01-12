import Head from 'next/head'

export default function Doc () {
/* rest */
return (
/* ... */
    <Head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
    <script dangerouslySetInnerHTML={{
        __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "YOUR_CLIENT_ID",
            enable_page_level_ads: true
            });
            `,
            }} />
</Head>


)}
