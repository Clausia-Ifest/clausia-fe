import type { Metadata } from "next";

type MetadataParams = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  canonical?: string;
  noIndex?: boolean;
};

export type GenerateMetadataOptions = {
  baseTitle?: string;
  titleSeparator?: string;
  baseDescription?: string;
  baseKeywords?: string[];
  defaultImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  baseUrl?: string;
};

export function customMetadataGenerator(
  params: MetadataParams,
  options: GenerateMetadataOptions = {}
): Metadata {
  const {
    baseTitle = "Clausia",
    titleSeparator = " | ",
    baseDescription = "Website resmi Clausia 2025 Departemen Teknik Informatika Fakultas Ilmu Komputer Universitas Brawijaya.",
    baseKeywords = [
      "teknik informatika",
      "filkom",
      "ub",
      "hmdtif",
      "universitas brawijaya",
      "fakultas ilmu komputer",
      "clausia",
      "clausia",
    ],
    defaultImage = {
      url: "/open-graph-image.png",
      alt: "INTRIVIA 2025",
    },
    baseUrl = "https://intrivia.ub.ac.id",
  } = options;

  const { title, description, keywords, image, canonical, noIndex } = params;

  // Construct full title
  const fullTitle = title ? `${title}${titleSeparator}${baseTitle}` : baseTitle;

  // Combine keywords
  const allKeywords = [...(keywords || []), ...baseKeywords];

  // Construct metadata object
  const metadata: Metadata = {
    title: fullTitle,
    description: description || baseDescription,
    keywords: allKeywords,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: fullTitle,
      description: description || baseDescription,
      images: [
        {
          url: image?.url || defaultImage.url,
          width: image?.width || defaultImage.width,
          height: image?.height || defaultImage.height,
          alt: image?.alt || defaultImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || baseDescription,
      images: [image?.url || defaultImage.url],
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
    robots: noIndex ? "noindex,nofollow" : "index,follow",
  };

  return metadata;
}
