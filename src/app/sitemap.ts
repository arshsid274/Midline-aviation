import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://midline-aviation.com"; // change to your domain

  return [
    { url: baseUrl, priority: 1 },

    { url: `${baseUrl}/fleet`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.6 },
    { url: `${baseUrl}/contact`, priority: 0.6 },

    { url: `${baseUrl}/services/charter`, priority: 0.8 },
    { url: `${baseUrl}/services/aircraft-management`, priority: 0.8 },
    { url: `${baseUrl}/services/aircraft-sales`, priority: 0.8 },
    { url: `${baseUrl}/services/cargo-transport`, priority: 0.8 },
    { url: `${baseUrl}/services/mro`, priority: 0.8 },
  ];
}
