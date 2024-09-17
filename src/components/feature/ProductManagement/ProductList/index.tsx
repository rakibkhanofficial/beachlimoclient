import React, { useEffect, useState } from "react";
import { deleteMethod } from "~@/utils/api/deleteMethod";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Chip,
  Skeleton,
  Image,
  CardHeader,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Product {
  id: number;
  userId: number;
  name: string;
  description: string;
  slug: string;
  prodimage: string;
  price: string;
  offerprice: string;
  packsize: string;
  sku: string;
  stockQuantity: number;
  brand: string;
  category: string;
  tags: string[];
  isActive: boolean;
  weight: string;
  dimensions: Dimensions;
  allergens: string[];
  expirationDate: string;
  barcode: string;
  nutritionalInfo: NutritionalInfo;
  createdAt: string;
  updatedAt: string;
}

const EnlistedProductListComponent = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredList, setFilteredList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProdId, setSelectedProdId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, filterType, productList]);

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const response = await getMethod(endPoints?.cars?.getAllCars);
      if (response?.data?.statusCode === 200) {
        setProductList(response?.data?.data as Product[]);
      } else {
        console.error("Error fetching product list:", response?.data?.message);
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = productList;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === "new") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filterType === "old") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFilteredList(filtered);
  };

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteMethod({
        route: endPoints?.cars?.deleteCar(id),
        deleteData: "",
      });
      if (response?.data?.statusCode === 200) {
        setProductList((prevList) =>
          prevList.filter((product) => product.id !== id)
        );
        toast.success("Product deleted successfully!");
      } else {
        console.error("Error deleting product:", response?.data?.message);
        toast.error(response?.data?.message as string);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    onOpen();
  };

  const handleSaveEdit = async (updatedProduct: Product) => {
    // Implement the API call to update the product here
    // For now, we'll just update the local state
    setProductList((prevList) =>
      prevList.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    onClose();
    toast.success("Product updated successfully!");
  };

  const renderSkeletons = () => {
    return Array(6).fill(null).map((_, index) => (
      <Card key={index} className="max-w-sm">
        <Skeleton className="h-48" />
        <CardBody>
          <Skeleton className="h-6 mb-2" />
          <Skeleton className="h-4" />
        </CardBody>
      </Card>
    ));
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl text-center text-black dark:text-white font-bold mb-6 text-gradient">
        Enlisted Product List
      </h1>

      <div className="w-full flex-col justify-center md:flex md:justify-between mb-4">
        <Skeleton
          className="flex justify-center mx-auto rounded-lg"
          isLoaded={!loading}
        >
          <Input
            startContent={<CiSearch className="text-gray-400" />}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Skeleton>
        <Skeleton className="rounded-lg w-[20%] my-3" isLoaded={!loading}>
          <Tabs
            aria-label="Filter options"
            selectedKey={filterType}
            onSelectionChange={(key) => setFilterType(key as string)}
          >
            <Tab key="all" title="All" />
            <Tab key="new" title="Newest" />
            <Tab key="old" title="Oldest" />
          </Tabs>
        </Skeleton>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-2 2xl:gap-6">
        {loading
          ? renderSkeletons()
          : filteredList.map((product) => (
              <Card
                key={product.id}
                className="w-full hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:gradient-to-br dark:from-slate-800 dark:to-slate-900"
              >
                <CardHeader className="bg-slate-100 dark:bg-slate-800">
                  <div className="flex justify-between">
                    <Image
                      width={25}
                      height={25}
                      src={product.prodimage || "/placeholder-image.jpg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Chip color="primary" variant="shadow">
                        {product.category}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className=" md:p-4 bg-slate-50 dark:bg-gray-800">
                  <div className="my-2 flex justify-center">
                    <Image
                      width={250}
                      height={250}
                      src={product.prodimage || "/placeholder-image.jpg"}
                      alt={product.name}
                      className="object-cover w-full h-auto max-w-[150px] md:max-w-[250px] max-h-[150px] md:max-h-[250px]"
                    />
                  </div>

                  <h2 className="text-xs md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">
                    {product.name}
                  </h2>

                  <p className="text-sm md:text-base hidden md:inline text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg md:text-2xl font-bold text-primary">
                      ${product.price}
                    </span>

                    <Chip
                      color={product.stockQuantity > 0 ? "success" : "danger"}
                      variant="flat"
                    >
                      {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                    </Chip>
                  </div>

                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    SKU: {product.sku} | Brand: {product.brand}
                  </p>
                </CardBody>

                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-4">
                  <Tooltip color="primary" content="View Details">
                    <Button
                      isIconOnly={true}
                      color="primary"
                      variant="light"
                      className="text-lg"
                    >
                      <FiEye />
                    </Button>
                  </Tooltip>

                  <Tooltip color="warning" content="Edit Product">
                    <Button
                      isIconOnly={true}
                      color="warning"
                      variant="light"
                      onPress={() => handleEditProduct(product)}
                      className="text-lg"
                    >
                      <FaEdit />
                    </Button>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete Product">
                    <Button
                      isIconOnly={true}
                      color="danger"
                      variant="light"
                      onPress={() => handleDeleteProduct(product.id)}
                      className="text-lg"
                    >
                      <IoMdTrash />
                    </Button>
                  </Tooltip>
                </CardFooter>
              </Card>
            ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Product</ModalHeader>
              <ModalBody>
                {editingProduct && (
                  <div>
                    <Input
                      label="Name"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      className="mb-2"
                    />
                    <Input
                      label="Price"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      className="mb-2"
                    />
                    <Input
                      label="Stock Quantity"
                      type="number"
                      value={editingProduct.stockQuantity.toString()}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stockQuantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSaveEdit(editingProduct!)}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EnlistedProductListComponent;
