import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { getRelationships } from "utils";
import { useGetFetchQuery } from "utils/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMutation } from "@tanstack/react-query";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Pagination } from "swiper";
import api from "utils/api";
import {
  BottomNavigation,
  BottomNavigationAction,
  ButtonBase,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import { toast } from "sonner";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsI {
  open: boolean;
  handleClose: any;
  product: any;
}

export default function ProductDialog(props: PropsI) {
  const router = useRouter();
  const [getDocuments, setDocuments] = React.useState([]);
  const createCart = useMutation((payload: any) => {
    return api.post(`carts`, payload);
  });
  const queryClient: any = useGetFetchQuery(["products"]);

  React.useEffect(() => {
    if (queryClient.data) {
      setDocuments(
        getRelationships(queryClient.data, props.product, "documents")
      );
    }
  }, []);

  const handleCreateCart = async () => {
    const payload = {
      data: {
        type: "carts",
        attributes: {
          quantity: 1,
        },
        relationships: {
          products: {
            data: {
              type: "products",
              id: props.product.id,
            },
          },
        },
      },
    };

    await createCart.mutate(payload);
    toast.success("Produk Berhasil Ditambahkan ke Keranjang");
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div>
      <Dialog
        scroll="body"
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detail Produk
            </Typography>
          </Toolbar>
        </AppBar>
        {getDocuments.length > 0 ? (
          <>
            <Swiper
              slidesPerView="auto"
              pagination={true}
              modules={[Pagination]}
            >
              {getDocuments.map((document: any) => (
                <SwiperSlide key={document.id} className=" p-1">
                  <img
                    className="max-h-64 mx-auto"
                    key={document.id}
                    src={document.attributes.filename}
                    onError={(e: any) =>
                      (e.target.src = "/assets/image-1@2x.jpg")
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : null}

        <article className="mx-2">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>
                  {props.product.attributes.name}{" "}
                  <Checkbox
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Harga</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(props.product.attributes.price)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ verticalAlign: "top" }}>
                  <p>Deskripsi</p>
                </TableCell>
                <TableCell>{props.product.attributes.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kategori</TableCell>
                <TableCell>Lilin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </article>
        <List className="fixed px-4 bg-white border-2 flex-col sm:flex-row flex w-screen justify-center bottom-0">
          <Button
            onClick={handleCreateCart}
            size="medium"
            variant="contained"
            className="bg-blue-500 w-full m-1"
            color="primary"
          >
            <AddIcon /> Keranjang
          </Button>
        </List>
      </Dialog>
    </div>
  );
}
