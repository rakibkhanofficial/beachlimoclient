import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { ProductDetailsType } from "~@/types";
import { urlForThumbnail } from "~@/utils/cms/imageProcess";

const CarDetails = ({ product }: ProductDetailsType) => {
//   console.log(product);
  return (
    <div>
      {product === undefined ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <h1>Car Details</h1>
          <div>
            <h1>{product?.title}</h1>
            <Image
              src={urlForThumbnail(product?.companyImage)}
              width={250}
              height={250}
              alt={product?.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
