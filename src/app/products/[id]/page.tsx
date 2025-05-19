import { getProductById } from "@/app/apis/product.api";
import { notFound } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Breadcrumbs,
  Link,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import LayoutContent from "@/app/layouts/layout-content";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Metadata } from "next";

type PropsType = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | Store In`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
    },
  };
}

const ProductDetailPage = async (props: PropsType) => {
  const params = await props.params;
  const id = params.id;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <LayoutContent
      SubHeaderComponent={
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link
            sx={{ lg: { width: "fit-content" }, md: { width: "60px" } }}
            href="/products"
            color="inherit"
            underline="hover"
          >
            Products
          </Link>
          <Typography
            sx={{
              maxWidth: {
                xs: "90px",
                sm: "300px",
                md: "calc(100%-450px)",
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            color="text.primary"
          >
            {product.title}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon />}
            href="/products"
            variant="outlined"
            sx={{ fontSize: { xs: "12px", md: "14px" } }}
          >
            Back to Products
          </Button>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            href={`/products/${id}/preview`}
            variant="contained"
            target="_blank"
            sx={{ fontSize: { xs: "12px", md: "14px" } }}
          >
            Preview
          </Button>
        </Stack>

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
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
              {product.images.length > 1 && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {product.images.slice(1).map((image, index) => (
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

export default ProductDetailPage;
