import Helmet from "react-helmet";
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import genRecipeSchema from "./utils/genRecipeSchema";
import {log} from "../../utils";

export interface SEOQueryProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    isArticle: boolean;
    schemas?: Array<{
        type: "recipe" | "articles" | "list";
        schema: any;
    }>;
}

type TSiteMeta = {
    title: string;
    image: string;
    canonicalUrl: string;
    description: string;
    social: {
        twitter: string;
        fb: string;
        youtube: string;
    };
    author: {
        name: "Married Friends";
    };
    organization: {
        name: string;
    };
};

interface SEOProps extends SEOQueryProps {
    siteMetadata: TSiteMeta;
}

export function SEO({
    siteMetadata,
    title,
    description,
    image,
    isArticle,
    url,
    schemas,
}: SEOProps) {
    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: "en",
                }}
            >
                {/* General Tags */}
                <title>{title || siteMetadata.title}</title>
                <meta
                    name="google-site-verification"
                    content="yCe73Z8VUJVnF41KE21Jt7W44RD1ACHXqFHKzDpF2io"
                />
                <meta
                    name="description"
                    content={description || siteMetadata.description}
                ></meta>
                <meta name="image" content={image || siteMetadata.image} />
                <link
                    rel="icon"
                    type="image/png"
                    href="https://backend.marriedfriends.in/wp-content/uploads/2021/03/logo_transparent.png"
                    sizes="16x16"
                />

                {/* Open Graph Tags */}
                <meta
                    property="og:url"
                    content={url || siteMetadata.canonicalUrl}
                />
                {isArticle ? (
                    <meta property="og:type" content="article" />
                ) : null}
                <meta
                    property="og:title"
                    content={title || siteMetadata.title}
                />
                <meta
                    property="og:description"
                    content={description || siteMetadata.description}
                />
                <meta
                    property="og:image"
                    content={image || siteMetadata.image}
                />
                <meta
                    property="og:image:alt"
                    content={title || siteMetadata.title}
                />
                <meta property="fb:app_id" content={siteMetadata.social.fb} />

                {/* Twitter Card Tags  */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:creator"
                    content={siteMetadata.social.twitter}
                />
                <meta
                    name="twitter:title"
                    content={title || siteMetadata.title}
                />
                <meta
                    name="twitter:description"
                    content={description || siteMetadata.description}
                />
                <meta
                    name="twitter:image"
                    content={image || siteMetadata.image}
                />
                {schemas &&
                    schemas.map((schemaObj) => (
                        <script type="application/ld+json">
                            {JSON.stringify(schemaObj.schema, null, 2)}
                        </script>
                    ))}
            </Helmet>
        </>
    );
}

export function SEOWithQuery(props: SEOQueryProps) {
    const { site: siteMetadata } = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    canonicalUrl
                    image
                    author {
                        name
                    }
                    organization {
                        name
                        url
                        logo
                    }
                    social {
                        twitter
                        fb
                        youtube
                    }
                }
            }
        }
    `);
    log("site meta : ", siteMetadata);

    return <SEO siteMetadata={siteMetadata.siteMetadata} {...props} />;
}
