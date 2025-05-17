import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Rating } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProductDialog from "components/molecules/ProductDialog";
import { getRelationships, toCurrency } from "utils";
import { useGetFetchQuery } from "utils/hooks";
import LoadingBackdrop from "components/mui/LoadingBackdrop";
import Link from "next/link";

export default function ProductCard(props: any) {
  const getProducts: any = useGetFetchQuery(["products"]);
  const [state, setState] = React.useState({
    rating: [],
  });
  const root = React.useMemo(() => getProducts?.data, [getProducts]);
  return (
    <>
      <Card {...props} sx={{ maxWidth: 200 }}>
        <CardMedia
          component="img"
          classes={{
            img: "!object-fit !h-[154px]",
          }}
          image={
            props.product.images?.length > 0
              ? props.product.images[0].path
              : "/blah.png"
          }
        />
        <CardContent
          classes={{
            root: "!px-3 py-1",
          }}
        >
          <div className="">
            <h3 className="text-md font-semibold hover:underline">
              {props.product.attributes.name} ({props.product.attributes.code})
              <IconButton
                size="small"
                title="Terverifikasi Oleh Million Candles"
              >
                <VerifiedIcon fontSize="small" color="primary" />
              </IconButton>
            </h3>
            <div className="text-green-600 font-bold text-lg mb-2">
              {toCurrency(props.product.attributes.price)}
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2">★ 5.0</span>
              <span className="text-green-500 mr-2">1rb+ terjual</span>
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
}
