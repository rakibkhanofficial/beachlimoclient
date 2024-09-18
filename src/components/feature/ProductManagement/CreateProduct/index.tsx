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

interface CarData {
  name: string;
  description: string;
  slug: string;
  pricePerHour: string;
  pricePerMile: string;
  model: string;
  year: string;
  make: string;
  seatingCapacity: string;
  isActive: boolean;
  hasChildSeat: boolean;
  hasWifi: boolean;
  luggageCapacity: string;
  mileagePerGallon: string;
  transmission: string;
  fuelType: string;
  features: string;
  isAvailable: boolean;
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
  categoryName?: string;
};

type SelectedImageType = {
  img: File | string | Blob | null;
  imgUrl: string;
  name: string;
};

const initialCarData: CarData = {
  name: "",
  description: "",
  slug: "",
  pricePerHour: "",
  pricePerMile: "",
  model: "",
  year: "",
  make: "",
  seatingCapacity: "",
  isActive: true,
  hasChildSeat: false,
  hasWifi: false,
  luggageCapacity: "",
  mileagePerGallon: "",
  transmission: "",
  fuelType: "",
  features: "",
  isAvailable: true,
};

const CreateCarComponent: React.FC = () => {
  const { session } = useCustomSession();
  const [carData, setCarData] = useState<CarData>(initialCarData);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
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
          endPoints?.subcategory?.getAllSubcategoryByCategoryId(categoryId),
        );
        if (response?.data?.statusCode === 200) {
          setSubcategories(response?.data?.data as SubCategoryType[]);
        } else {
          console.error(
            "Error fetching subcategories",
            response?.data?.message,
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
      setLoading(false);
    };
    if (categoryId !== null) {
      fetchAllSubcategories();
    }
  }, [categoryId]);

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value);
    setCategoryId(categoryId);
  };

  const handleSubCategoryChange = (value: string) => {
    const subcategoryId = parseInt(value);
    setSubCategoryId(subcategoryId);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setCarData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!imageTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please select a JPEG, PNG, or JPG file.",
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
        },
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
        ...carData,
        categoryId,
        subCategoryId,
        image: uploadedImageUrl,
        pricePerMile: parseFloat(carData.pricePerMile),
        pricePerHour: parseFloat(carData.pricePerHour),
        year: parseInt(carData.year),
        seatingCapacity: parseInt(carData.seatingCapacity),
        luggageCapacity: parseInt(carData.luggageCapacity),
        mileagePerGallon: parseFloat(carData.mileagePerGallon),
        features: carData.features
          .split(",")
          .map((feature: string) => feature.trim()),
      };

      const response = await postMethod({
        route: endPoints?.cars?.addCar,
        postData: dataToSubmit,
      });
      if (response?.data?.statusCode === 200) {
        setSuccessMessage("Car created successfully!");
        toast.success("Car created successfully!");
        setCarData(initialCarData);
        setSelectedFile({
          img: null,
          imgUrl: "",
          name: "",
        });
        setUploadedImageUrl("");
      } else {
        setErrorMessage(response?.data?.message);
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      setErrorMessage("An error occurred while creating the car.");
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto my-8 w-full max-w-7xl shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <h2 className="mr-2 text-2xl font-bold">Create New Car</h2>
        <p className="text-sm opacity-80">
          Fill in the details to add a new car to the fleet
        </p>
      </CardHeader>
      <CardBody className="p-6">
        {successMessage && (
          <div className="mb-6 rounded-md bg-green-100 p-4 text-green-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-md bg-red-100 p-4 text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Name"
                name="name"
                value={carData.name}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Slug"
                name="slug"
                value={carData.slug}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <Input
                type="number"
                label="Price Per Mile"
                name="pricePerMile"
                value={carData.pricePerMile}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Price Per Hour"
                name="pricePerHour"
                value={carData.pricePerHour}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Model"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <Input
              label="Description"
              name="description"
              value={carData.description}
              onChange={handleInputChange}
              variant="bordered"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Make"
                name="make"
                value={carData.make}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Year"
                name="year"
                value={carData.year}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Seating Capacity"
                name="seatingCapacity"
                value={carData.seatingCapacity}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                type="number"
                label="Luggage Capacity"
                name="luggageCapacity"
                value={carData.luggageCapacity}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Transmission"
                name="transmission"
                value={carData.transmission}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Fuel Type"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="number"
                label="Mileage Per Gallon"
                name="mileagePerGallon"
                value={carData.mileagePerGallon}
                onChange={handleInputChange}
                variant="bordered"
              />
              <Input
                label="Features (comma-separated)"
                name="features"
                value={carData.features}
                onChange={handleInputChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 text-black dark:text-white md:grid-cols-2">
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

          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
              <h3 className="mb-4 text-lg font-semibold">Car Image</h3>
              <div className="flex flex-col items-center">
                <Image
                  src={
                    selectedFile?.imgUrl || "/emptycarimage/emptycarimage.png"
                  }
                  alt={selectedFile?.name || "Car Image"}
                  width={200}
                  height={200}
                  className="mb-4 rounded-lg shadow-md"
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
                <div className="mt-3 flex w-full items-center justify-center">
                  <Button
                    color="success"
                    variant="bordered"
                    size="md"
                    className=" flex items-center justify-center"
                    isLoading={uploading}
                    endContent={<AiOutlineCloudUpload />}
                    onClick={handleImageUpload}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
              <h3 className="mb-4 text-lg font-semibold">Car Status</h3>
              <div className="grid grid-cols-2 gap-3">
                <Switch
                  isSelected={carData.isActive}
                  onValueChange={handleSwitchChange("isActive")}
                >
                  Active
                </Switch>
                <Switch
                  isSelected={carData.isAvailable}
                  onValueChange={handleSwitchChange("isAvailable")}
                >
                  Available
                </Switch>
                <Switch
                  isSelected={carData.hasChildSeat}
                  onValueChange={handleSwitchChange("hasChildSeat")}
                >
                  Has Child Seat
                </Switch>
                <Switch
                  isSelected={carData.hasWifi}
                  onValueChange={handleSwitchChange("hasWifi")}
                >
                  Has WiFi
                </Switch>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
            <h3 className="mb-4 text-lg font-semibold">Additional Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Image URL"
                name="imageUrl"
                value={uploadedImageUrl}
                variant="bordered"
                onChange={(e) => setUploadedImageUrl(e.target.value)}
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
            isDisabled={
              carData.name === "" ||
              carData.pricePerHour === "" ||
              carData.pricePerMile === ""
            }
          >
            {isLoading ? "Creating..." : "Create Car"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CreateCarComponent;
