import Head from 'next/head'


class MyDocument extends Document {
/* rest */
render (
/* ... */
    <Head>
    {/* google adsense */}
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
    <script dangerouslySetInnerHTML={{
        __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "pub-4940106708988712",
            enable_page_level_ads: true
            });
            `,
            }} />
</Head>


)}
