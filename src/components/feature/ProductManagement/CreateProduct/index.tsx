import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Image,
  Button,
  Switch,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { endPoints } from "~@/utils/api/route";
import { FaCamera } from "react-icons/fa6";
import { getMethod } from "~@/utils/api/getMethod";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { postMethod } from "~@/utils/api/postMethod";

interface ProductData {
  name: string;
  description: string;
  slug: string;
  price: string;
  offerprice: string;
  packsize: string;
  sku: string;
  stockQuantity: string;
  brand: string;
  tags: string;
  isActive: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  allergens: string;
  expirationDate: string;
  barcode: string;
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type SubCategoryType = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  categoryName?: string; // Add this field
};

type SelectedImageType = {
  img: File | string | Blob | null;
  imgUrl: string;
  name: string;
};

const initialProductData: ProductData = {
  name: "",
  description: "",
  slug: "",
  price: "",
  offerprice: "",
  packsize: "",
  sku: "",
  stockQuantity: "",
  brand: "",
  tags: "",
  isActive: true,
  weight: "",
  dimensions: { length: "", width: "", height: "" },
  allergens: "",
  expirationDate: "",
  barcode: "",
  nutritionalInfo: { calories: "", protein: "", carbs: "", fat: "" },
};

const CreateProductComponent: React.FC = () => {
  const { session } = useCustomSession();
  const [productData, setProductData] =
    useState<ProductData>(initialProductData);
  const [categorId, setCaegoryId] = useState<number | null>(null);
  const [subcategorId, setSubCaegoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<SelectedImageType>({
    img: null,
    imgUrl: "",
    name: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoryType[]>([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const response = await getMethod(endPoints?.category?.getAllCategories);
        if (response?.data?.statusCode === 200) {
          setCategories(response?.data?.data as CategoryType[]);
        } else {
          console.error("Error fetching categories", response?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
      setLoading(false);
    };
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchAllSubcategories = async () => {
      setLoading(true);
      try {
        const response = await getMethod(
          endPoints?.subcategory?.getAllSubcategoryByCategoryId(categorId)
        );
        if (response?.data?.statusCode === 200) {
          setSubcategories(response?.data?.data as SubCategoryType[]);
        } else {
          console.error(
            "Error fetching subcategories",
            response?.data?.message
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
      setLoading(false);
    };
    if (categorId !== null) {
      fetchAllSubcategories();
    }
  }, [categorId]);

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value);
    setCaegoryId(categoryId);
  };

  const handleSubCategoryChange = (value: string) => {
    const subcategoryId = parseInt(value);
    setSubCaegoryId(subcategoryId);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProductData((prevData) => ({
      ...prevData,
      isActive: checked,
    }));
  };

  const handleDimensionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      dimensions: {
        ...prevData.dimensions,
        [name]: value,
      },
    }));
  };

  const handleNutritionalInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      nutritionalInfo: {
        ...prevData.nutritionalInfo,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!imageTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please select a JPEG, PNG, or JPG file."
        );
      } else {
        const imageUrl = URL.createObjectURL(file);
        setSelectedFile({ img: file, imgUrl: imageUrl, name: file.name });
      }
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile.img) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile.img);
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endPoints.uploadImage.uploadImageApi}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (uploadResponse?.data?.statusCode === 200) {
        setUploadedImageUrl(uploadResponse?.data?.data?.url);
      } else {
        toast.error("Failed to upload the image");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the image");
    } finally {
      setUploading(false);
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const dataToSubmit = {
        ...productData,
        // userId,
        categoryId: categorId,
        subCategoryId: subcategorId,
        prodimage: uploadedImageUrl,
        brand: productData.brand.toLowerCase(),
        expirationDate: productData.expirationDate,

        tags: productData.tags.split(",").map((tag: string) => tag.trim()),
        allergens: productData.allergens
          .split(",")
          .map((allergen: string) => allergen.trim()),
        price: parseFloat(productData.price),
        offerprice: parseFloat(productData.offerprice),
        stockQuantity: parseInt(productData.stockQuantity),
        weight: parseFloat(productData.weight),
        dimensions: {
          length: parseFloat(productData.dimensions.length),
          width: parseFloat(productData.dimensions.width),
          height: parseFloat(productData.dimensions.height),
        },
        nutritionalInfo: {
          calories: parseInt(productData.nutritionalInfo.calories),
          protein: parseFloat(productData.nutritionalInfo.protein),
          carbs: parseFloat(productData.nutritionalInfo.carbs),
          fat: parseFloat(productData.nutritionalInfo.fat),
        },
      };

      const response = await postMethod({
        route: endPoints?.cars?.addCar,
        postData: dataToSubmit,
      });
      if (response?.data?.statusCode === 200) {
        setSuccessMessage("Product created successfully!");
        toast.success("Product created successfully!");
        setProductData(initialProductData);
        setSelectedFile({
          img: null,
          imgUrl: "",
          name: "",
        });
        setUploadedImageUrl("")
      } else {
        setErrorMessage(response?.data?.message);
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      setErrorMessage("An error occurred while creating the product.");
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto my-8 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
        <h2 className="text-2xl mr-2 font-bold">Create New Product</h2>
        <p className="text-sm opacity-80">
          Fill in the details to create a premium product
        </p>
      </CardHeader>
      <CardBody className="p-6">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Slug"
                name="slug"
                value={productData.slug}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Offer Price"
                name="offerprice"
                value={productData.offerprice}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <Input
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              variant="bordered"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="SKU"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Stock Quantity"
                name="stockQuantity"
                value={productData.stockQuantity}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Pack Size"
                name="packsize"
                value={productData.packsize}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>
            <div className="grid text-black dark:text-white grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                isLoading={loading}
                label="Select Category"
                className="mb-4 text-black dark:text-white"
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map((data) => (
                  <SelectItem
                    className="text-black dark:text-white"
                    key={data.id}
                    value={data.id.toString()}
                  >
                    {data.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isLoading={loading}
                label="Select Sub-Category"
                className="mb-4 text-black dark:text-white"
                onChange={(e) => handleSubCategoryChange(e.target.value)}
              >
                {subcategories.map((data) => (
                  <SelectItem
                    className="text-black dark:text-white"
                    key={data.id}
                    value={data.id.toString()}
                  >
                    {data.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Product Image</h3>
              <div className="flex flex-col items-center">
                <Image
                  src={
                    selectedFile?.imgUrl ||
                    "/image/emptyprodimage/emptyprodimage.png"
                  }
                  alt={selectedFile?.name || "Product Image"}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md mb-4"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload">
                  <Button
                    as="span"
                    color="primary"
                    variant="flat"
                    isDisabled={uploading}
                    className="flex items-center gap-2"
                  >
                    <FaCamera size={16} />
                    {"Change Image"}
                  </Button>
                </label>
              </div>
              {selectedFile.img && (
                <div className="w-full flex justify-center mt-3 items-center">
                  <Button
                    color="success"
                    variant="bordered"
                    size="md"
                    className=" flex justify-center items-center"
                    isLoading={uploading}
                    endContent={<AiOutlineCloudUpload />}
                    onClick={handleImageUpload}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-gray-100 dark:bg-zinc-800  p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Product Status</h3>
              <Switch
                isSelected={productData.isActive}
                checked={productData.isActive}
                onValueChange={handleSwitchChange}
              >
                Active
              </Switch>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-100 dark:bg-zinc-800  p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Tags (comma-separated)"
                name="tags"
                value={productData.tags}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Weight"
                name="weight"
                value={productData.weight}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Allergens (comma-separated)"
                name="allergens"
                value={productData.allergens}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="date"
                label="Expiration Date"
                name="expirationDate"
                value={productData.expirationDate}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Barcode"
                name="barcode"
                value={productData.barcode}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Image url"
                name="imageUrl"
                value={uploadedImageUrl}
                variant="bordered"
                onChange={(e) => setUploadedImageUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-zinc-800  p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dimensions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="number"
                label="Length"
                name="length"
                value={productData.dimensions.length}
                onChange={handleDimensionsChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Width"
                name="width"
                value={productData.dimensions.width}
                onChange={handleDimensionsChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Height"
                name="height"
                value={productData.dimensions.height}
                onChange={handleDimensionsChange}
                variant="bordered"
              />
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-zinc-800  p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Nutritional Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                type="number"
                label="Calories"
                name="calories"
                value={productData.nutritionalInfo.calories}
                onChange={handleNutritionalInfoChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Protein"
                name="protein"
                value={productData.nutritionalInfo.protein}
                onChange={handleNutritionalInfoChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Carbs"
                name="carbs"
                value={productData.nutritionalInfo.carbs}
                onChange={handleNutritionalInfoChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Fat"
                name="fat"
                value={productData.nutritionalInfo.fat}
                onChange={handleNutritionalInfoChange}
                variant="bordered"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            color="primary"
            size="lg"
            isLoading={isLoading}
            onClick={handleSubmit}
            isDisabled={productData.packsize === ""}
          >
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CreateProductComponent;
