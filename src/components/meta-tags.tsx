import React from "react";
import { baseUrl } from "~/utils/constants";
import Head from "next/head";



type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const MetaTags: React.FC<Props> = ({
  title,
  description,
  url = baseUrl,
  image,
}) => {


  const DEFAULT_DESCRIPTION = "Empowering Education Management is a school management application";
  const LOGO_PATH = `${baseUrl}/static/Original.png`;
  const favicon = `${baseUrl}/static/Favicon_Logo.png`;

  const currentDescription = description ?? DEFAULT_DESCRIPTION;

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={favicon} />
      <meta name="title" content={title} />
      <meta name="description" content={currentDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={image ?? LOGO_PATH} />
    </Head>
  );
};

export default MetaTags;