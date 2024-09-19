import React, { useEffect, useState } from "react";
import { useLockedBody } from "./hooks/useBodyLock";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import FooterComponent from "../Footer";
import HeaderLandingPage from "../Header";
import { AllproductSidebarContext } from "./sidebar/sidebar-contex";
import AllProductSidebarWrapper from "./sidebar";
import AllCars from ".";

type CarType = {
  car_id: number;
  car_name: string;
  car_description: string;
  car_slug: string;
  car_image: string;
  car_pricePerHour: string;
  car_pricePerMile: string;
  car_model: string;
  car_year: number;
  car_make: string;
  car_seatingCapacity: number;
  car_hasChildSeat: 0 | 1;
  car_hasWifi: 0 | 1;
  car_luggageCapacity: number;
  car_mileagePerGallon: string;
  car_transmission: string;
  car_fuelType: string;
  car_features: string;
  car_categoryId: number;
  car_subCategoryId: number;
  car_createdAt: string;
  car_updatedAt: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
};

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

export const AllProductLayout = () => {
  //side bar open
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocked] = useLockedBody(false);
  // product filter
  const [products, setProducts] = useState<CarType[]>([]);
  const [filteredList, setFilteredList] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [
    searchQuery,
    priceRange,
    filterType,
    selectedCategories,
    selectedSubcategories,
    products,
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getMethod(
        endPoints?.cars?.getAllPublicCarList
      );
      if (response?.data?.statusCode === 200) {
        setProducts(response?.data?.data as CarType[]);
        setLoading(false);
      } else {
        console.error("Error Fetching Products");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getMethod(
        endPoints?.category?.getAllCategoryiesPublic
      );
      if (response?.data?.statusCode === 200) {
        setCategories(response?.data?.data);
      } else {
        console.error("Error Fetching Categories");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.car_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.car_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryName)
      );
    }

    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubcategories.includes(product.subcategoryName)
      );
    } 

    filtered = filtered.filter(
      (product) =>
        parseFloat(product.car_pricePerMile) >= priceRange[0] &&
        parseFloat(product.car_pricePerMile) <= priceRange[1]
    );

    if (filterType === "new") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.car_createdAt).getTime() -
          new Date(a.car_createdAt).getTime()
      );
    } else if (filterType === "old") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.car_createdAt).getTime() -
          new Date(b.car_createdAt).getTime()
      );
    }

    setFilteredList(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <AllproductSidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <div className=" h-14 md:h-10 ">
        <HeaderLandingPage />
      </div>
      <div className="flex w-full">
        <AllProductSidebarWrapper
          categories={categories}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
          priceRange={priceRange}
          handleCategoryChange={handleCategoryChange}
          handleSubcategoryChange={handleSubcategoryChange}
          setPriceRange={setPriceRange}
        />
        <div className="w-full">
          <div className="w-full">
            <AllCars
              filterType={filterType}
              setFilterType={setFilterType}
              filteredList={filteredList}
              loading={loading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <footer className="w-full">
            <FooterComponent />
          </footer>
        </div>
      </div>
    </AllproductSidebarContext.Provider>
  );
};
