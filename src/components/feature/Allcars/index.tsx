import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { servicesProptype } from "~@/types";
import { fetchservice } from "~@/utils/cms/fetchServices";

const AllCars = () => {
  const [Allcars, setAllcars] = useState<servicesProptype[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayServices, setdisplayservices] = useState(6);

  const showMoreProducts = () => {
    setdisplayservices(displayServices + 6);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const services = await fetchservice();
        setAllcars(services);
        setLoading(false);
      } catch (e) {
        console.log("Error", e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(Allcars);

  return (
    <div>
      {loading === true ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          {Allcars.map((data, index) => (
            <div key={index}>
              <Link href={`/${data ? data.slug.current : null}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCars;
