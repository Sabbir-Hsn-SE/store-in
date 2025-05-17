import { Product } from "@/app/types";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";

const useColumnDef = () => {
  const router = useRouter();
  const columns: GridColDef<Product>[] = [
    {
      field: "title",
      headerName: "Product Name",
      resizable: false,
      flex: 2,
      editable: false,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              src={params.row.images[0] || "https://placehold.co/32x32"}
              alt={params.row.title}
              width={32}
              height={32}
              style={{ borderRadius: "8px" }}
            />
            {params.row.title}
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      resizable: false,
      flex: 1,
      width: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return <>{params.row.category.name}</>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      resizable: false,
      align: "center",
      headerAlign: "center",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",

      resizable: false,
      flex: 2,
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      headerAlign: "right",
      resizable: false,
      width: 100,
      editable: false,
      renderCell: (params: GridRenderCellParams<Product>) => {
        return (
          <IconButton
            size="small"
            onClick={() => {
              router.push(`/products/${params.row.id}`);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];
  return { columns };
};

export default useColumnDef;
