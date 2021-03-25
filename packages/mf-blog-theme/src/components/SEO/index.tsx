import Helmet from 'react-helmet';
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export interface SEOProps {
    title: string;
    description: string;
    image: string;
    url: string;
    isArticle: boolean;
}

export function SEO({siteMetadata, title, description, image, isArticle, url  }) {

    return (
        <>
            <Helmet>
                {/* General Tags */}
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta name="image" content={image} />

                {/* Open Graph Tags */}
                <meta property="og:url" content={url}/>
                {isArticle ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="fb:app_id" content={siteMetadata.social.fb} />

                {/* Twitter Card Tags  */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:creator" content={siteMetadata.social.twitter}/>
                <meta name="twitter:title" content={title}/>
                <meta name="twitter:description" content={description}/>
                <meta name="twitter:image" content={image}/>
            </Helmet>
        </>
    )
}


export function SEOWithQuery (props : SEOProps) {
    const {site: siteMetadata} = useStaticQuery(graphql`
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
                    organization{
                        name
                        url
                        logo
                    }
                    social {
                        twitter,
                        fb,
                        youtube
                    }
                }
            }
        }
    
    `)
    console.log('site meta : ', siteMetadata)

    return <SEO siteMetadata={siteMetadata.siteMetadata} {...props} />
}