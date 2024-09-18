import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import { usePathname } from "next/navigation";
import HeaderLandingPage from "~@/components/feature/Header";
import FooterComponent from "~@/components/feature/Footer";
import PremiumCarDetails from "~@/components/feature/CarDetailsByslugCompoenent";
// import ProductDetailsComponenet from "@/components/features/productdetailsbyslug";

type CarDetails = {
  id: number;
  userId: number;
  name: string;
  description: string;
  slug: string;
  image: string;
  pricePerHour: string;
  pricePerMile: string;
  model: string;
  year: number;
  make: string;
  seatingCapacity: number;
  hasChildSeat: boolean;
  hasWifi: boolean;
  luggageCapacity: number;
  mileagePerGallon: string;
  transmission: string;
  fuelType: string;
  features: string[];
  isAvailable: boolean;
  isActive: boolean;
  categoryId: number;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
};

const ProductDetails: React.FC = () => {
  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const slug = pathname?.split("/")[1] || null;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      if (slug) {
        try {
          const response = await getMethod(
            endPoints?.cars?.getPublicCardetailsBySlug(slug as string),
          );

          if (response?.data?.statusCode === 200) {
            setCar(response?.data?.data as CarDetails);
          } else {
            setError("Error fetching Car details");
          }
        } catch (error) {
          console.error(error);
          setError("An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No Car slug provided");
      }
    };

    fetchProductDetails();
  }, [slug]);

  return (
    <div className=" bg-gray-100 text-black dark:bg-slate-800 dark:text-gray-100 ">
      <div className=" h-16 md:h-10 ">
        <HeaderLandingPage />
      </div>
      <PremiumCarDetails error={error} loading={loading} car={car} />
      <footer className="w-full">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default ProductDetails;
