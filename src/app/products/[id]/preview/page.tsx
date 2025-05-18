import React from "react";
import { getProductById } from "@/app/apis/product.api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Image from "next/image";
import LayoutContent from "@/app/layouts/layout-content";

// Utility to normalize image URLs
const normalizeImageUrl = (url: string) => {
  if (!url) return "https://placehold.co/1200x630.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://api.escuelajs.co${url}`;
  return `https://api.escuelajs.co/${url}`;
};

type PropsType = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { id } = (await params) as { id: string };
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: "noindex, nofollow",
    };
  }

  const imageUrl = normalizeImageUrl(product.images[0]);
  const canonicalUrl = `https://store-in-self.vercel.app/products/${id}/preview`;

  return {
    title: `${product.title} | Store In`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: canonicalUrl,
      siteName: "Store In",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "en_US",
      type: "website",
      determiner: "the",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [imageUrl],
    },
    robots: "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      "og:image:secure_url": imageUrl,
      "og:image:type": "image/jpeg",
      "og:image:width": "1200",
      "og:image:height": "630",
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        image: [imageUrl],
        description: product.description,
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "Store In",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: "https://schema.org/InStock",
        },
      }),
    },
  };
}

const ProductPreviewPage = async (props: PropsType) => {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <LayoutContent
      SubHeaderComponent={
        <Breadcrumbs aria-label="breadcrumb" maxItems={2}>
          <Link href="/products" color="inherit" underline="hover">
            Products
          </Link>
          <Link
            href={`/products/${product.id}`}
            color="inherit"
            underline="hover"
          >
            <Typography
              sx={{
                maxWidth: {
                  xs: "60px !important",
                  sm: "300px !important",
                  md: "calc(100%-450px) !important",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              color="inherit"
            >
              {product.title}
            </Typography>
          </Link>
          <Typography color="text.primary">Preview</Typography>
        </Breadcrumbs>
      }
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Product Images */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={product?.images[0] || "https://placehold.co/600x400.png"}
                  alt={product?.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
              {product?.images.length > 1 && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {product?.images.slice(1).map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "33.33%",
                        height: 100,
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 2}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.title}
                </Typography>
                <Chip
                  label={product.category.name}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ fontWeight: "bold", mb: 2 }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {product.description}
                </Typography>
              </Box>

              {/* Additional Details */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Product Details
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {product.category.name}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Product ID
                    </Typography>
                    <Typography variant="body1">{product.id}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </LayoutContent>
  );
};

export default ProductPreviewPage;
