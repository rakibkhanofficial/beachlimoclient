import React from "react";
import { usePathname } from "next/navigation";
import { useAllProductSidebarContext } from "./sidebar-contex";
import FilterCategorySidebar from "../filtercategorysidebar";

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

type PropsType = {
  categories: Category[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  priceRange: number[];
  handleCategoryChange: (category: string) => void;
  handleSubcategoryChange: (subcategory: string) => void;
  setPriceRange: (range: number[]) => void;
};

const AllProductSidebarWrapper = ({
  categories,
  selectedCategories,
  selectedSubcategories,
  priceRange,
  handleCategoryChange,
  handleSubcategoryChange,
  setPriceRange,
}: PropsType) => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useAllProductSidebarContext();

  return (
    <aside  className="sticky top-0 z-50 h-screen text-sm">
      {collapsed ? (
        <div
          className="fixed inset-0 z-50 bg-[rgb(15_23_42/0.3)] opacity-80 transition-opacity md:z-auto md:hidden md:opacity-100"
          onClick={setCollapsed}
        />
      ) : null}
      <div
        className={`fixed h-full  transition-transform ${
          collapsed ? "ml-0 translate-x-0" : "-translate-x-full"
        } z-[202] 2xl:w-[22rem] w-[14rem] lg:w-[16rem] shrink-0 flex-col border-divider  bg-gray-50 px-3  py-6 border-r-1 dark:bg-gray-800 lg:dark:bg-gray-800 md:static md:ml-0 md:flex md:h-screen md:translate-x-0`}
      >
        <FilterCategorySidebar
          categories={categories}
          selectedCategories={selectedCategories}
          selectedSubcategories={selectedSubcategories}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          onPriceRangeChange={setPriceRange}
        />
      </div>
    </aside>
  );
};

export default AllProductSidebarWrapper;
