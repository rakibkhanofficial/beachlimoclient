import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  ScrollShadow,
} from "@nextui-org/react";
import dynamic from "next/dynamic";

const Slider = dynamic(
  () => import("@nextui-org/react").then((mod) => mod.Slider),
  {
    ssr: false,
  }
);

interface Category {
  id: string;
  name: string;
  subCategories: { id: string; name: string }[];
}

interface FilterCategorySidebarProps {
  categories: Category[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  permilepriceRange: number[];
  perhourpriceRange: number[];
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  setPermilePriceRange: (value: number[]) => void;
  setPerhourPriceRange: (value: number[]) => void;
}

const FilterCategorySidebar: React.FC<FilterCategorySidebarProps> = ({
  categories,
  selectedCategories,
  selectedSubcategories,
  permilepriceRange,
  perhourpriceRange,
  onCategoryChange,
  onSubcategoryChange,
  setPermilePriceRange,
  setPerhourPriceRange
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full lg:p-10">
      <h1 className="font-semibold mb-4 dark:text-white">Filters</h1>
      <ScrollShadow className="h-[300px] custom-scrollbar">
      <Accordion>
          {categories?.map((category) => (
            <AccordionItem
              key={category.id}
              aria-label={category.name}
              title={
                <div className="flex items-center">
                  <Checkbox
                    value={category.name}
                    isSelected={selectedCategories.includes(category.name)}
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent accordion from toggling
                      onCategoryChange(category.name);
                    }}
                    className="mr-2"
                  >
                    {category.name}
                  </Checkbox>
                </div>
              }
            >
              <div className="ml-4 flex flex-col gap-2 mt-2">
                {category.subCategories?.map((subcategory) => (
                  <Checkbox
                    key={subcategory.id}
                    value={subcategory.name}
                    isSelected={selectedSubcategories.includes(
                      subcategory.name
                    )}
                    onChange={() => onSubcategoryChange(subcategory.name)}
                    className="mb-2"
                  >
                    {subcategory.name}
                  </Checkbox>
                ))}
              </div>
            </AccordionItem>
          ))}
      </Accordion>
      </ScrollShadow>
      <div className="mt-6">
        <h2 className="font-semibold mb-2 dark:text-white">Price Per Mile Range</h2>
        {mounted && (
          <Slider
            label="Price"
            step={10}
            minValue={0}
            maxValue={1000}
            value={permilepriceRange}
            onChange={(value) => setPermilePriceRange(value as number[])}
            className="mb-4"
          />
        )}
        <div className="flex justify-between">
          <span>${permilepriceRange[0]}</span>
          <span>${permilepriceRange[1]}</span>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-2 dark:text-white">Price Per Hour Range</h2>
        {mounted && (
          <Slider
            label="Price"
            step={10}
            minValue={0}
            maxValue={1000}
            value={perhourpriceRange}
            onChange={(value) => setPerhourPriceRange(value as number[])}
            className="mb-4"
          />
        )}
        <div className="flex justify-between">
          <span>${perhourpriceRange[0]}</span>
          <span>${perhourpriceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterCategorySidebar;
