import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Drawer, {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "~@/components/elements/drawer";
import { endPoints } from "~@/utils/api/route";
import { getMethod } from "~@/utils/api/getMethod";
import { postMethod } from "~@/utils/api/postMethod";
import { putMethod } from "~@/utils/api/putMethod";
import { deleteMethod } from "~@/utils/api/deleteMethod";
import toast from "react-hot-toast";

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

const SubCategoryManagementComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategoryType | null>(null);
  const [newSubCategory, setNewSubCategory] = useState({
    categoryId: 0,
    name: "",
    slug: "",
    description: "",
  });
  const [isChanging, setIsChanging] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSubcategories();
    fetchAllCategories();
  }, []);

  const fetchAllSubcategories = async () => {
    setLoading(true);
    try {
      const response = await getMethod(
        endPoints?.subcategory?.getAllSubcategories
      );
      if (response?.data?.statusCode === 200) {
        setSubcategories(response?.data?.data as SubCategoryType[]);
      } else {
        console.error("Error fetching subcategories", response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
    setLoading(false);
  };

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

  useEffect(() => {
    if (categories.length > 0 && subcategories.length > 0) {
      const updatedSubcategories = subcategories.map(subcategory => ({
        ...subcategory,
        categoryName: categories.find(category => category.id === subcategory.categoryId)?.name || 'Unknown'
      }));
      setSubcategories(updatedSubcategories);
    }
  }, [categories]);

  const handleCreateSubCategory = async () => {
    setIsChanging(true);
    try {
      const response = await postMethod({
        route: endPoints?.subcategory?.createSubCategory,
        postData: newSubCategory,
      });
      if (response?.data?.statusCode === 200) {
        toast?.success(response?.data?.message);
        setNewSubCategory({
          name: "",
          slug: "",
          description: "",
          categoryId: 0,
        });
        fetchAllSubcategories();
        setIsDrawerOpen(false);
        setIsChanging(false);
      } else {
        toast?.error(response?.data?.message);
        setIsChanging(false);
      }
    } catch (error) {
      setIsChanging(false);
      console.error("Error creating subcategory", error);
    }
  };

  const handleEditSubCategory = (subcategory: SubCategoryType) => {
    setEditingSubCategory(subcategory);
    setIsDrawerOpen(true);
  };

  const handleUpdateCategory = async () => {
    setIsChanging(true);
    if (!editingSubCategory) return;
    try {
      const response = await putMethod({
        route: endPoints?.subcategory?.updateSubCategory(editingSubCategory.id),
        updateData: editingSubCategory,
      });
      if (response?.data?.statusCode === 200) {
        toast?.success(response?.data?.message);
        setIsChanging(false);
        setEditingSubCategory(null);
        setIsDrawerOpen(false);
        fetchAllSubcategories();
      } else {
        toast?.error(response?.data?.message);
        setIsChanging(false);
      }
    } catch (error) {
      setIsChanging(false);
      console.error("Error updating subcategory", error);
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    try {
      const response = await deleteMethod({
        route: endPoints?.subcategory?.deleteSubCategory(id),
        deleteData: "",
      });
      if (response?.data?.statusCode === 200) {
        toast?.success(response?.data?.message);
        fetchAllSubcategories();
      } else {
        toast?.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting subcategory", error);
      toast?.error("Failed to delete subcategory");
    }
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value, 10);
    if (editingSubCategory) {
      setEditingSubCategory((prev) => ({
        ...prev!,
        categoryId: categoryId,
      }));
    } else {
      setNewSubCategory((prev) => ({
        ...prev,
        categoryId: categoryId,
      }));
    }
  };

  const columns = [
    { key: "name", label: "NAME" },
    { key: "slug", label: "SLUG" },
    { key: "description", label: "DESCRIPTION" },
    { key: "categoryName", label: "CATEGORY" }, // Add this line
    { key: "actions", label: "ACTIONS" },
  ];

  const renderCell = (subcategory: SubCategoryType, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-gray-900 dark:text-gray-100">
              {subcategory.name}
            </p>
          </div>
        );
      case "slug":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {subcategory.slug}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {subcategory.description}
            </p>
          </div>
        );
      case "categoryName":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {subcategory.categoryName}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="secondary" content="Edit Sub-category">
              <span className="text-lg cursor-pointer active:opacity-50 text-blue-600 dark:text-blue-400">
                <FaEdit onClick={() => handleEditSubCategory(subcategory)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Subcategory">
              <span className="text-lg cursor-pointer active:opacity-50 text-red-600 dark:text-red-400">
                <FaTrash
                  onClick={() => handleDeleteSubCategory(subcategory.id)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return subcategory[columnKey as keyof SubCategoryType];
    }
  };

  const SkeletonRow = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.key}>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="min-h-[80vh] flex justify-center items-center p-4 bg-gray-100 dark:bg-neutral-800">
      <Card className="w-full min-h-[75vh] max-w-[1200px] shadow-lg">
        <CardHeader className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sub Category Management
          </h1>
          <Button
            color="primary"
            endContent={<FaPlus />}
            onClick={() => {
              setEditingSubCategory(null);
              setNewSubCategory({
                categoryId: 0,
                name: "",
                slug: "",
                description: "",
              });
              setIsDrawerOpen(true);
            }}
          >
            Add New Sub Category
          </Button>
        </CardHeader>
        <Divider className="bg-gray-200 dark:bg-gray-600" />
        <CardBody>
          <Table aria-label="Subcategory table" className="min-w-full">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={subcategories}
              emptyContent={
                <p className="text-gray-500 dark:text-gray-400">
                  No Subcategories found
                </p>
              }
              loadingContent={
                <>
                  {[...Array(5)].map((_, index) => (
                    <SkeletonRow key={index} />
                  ))}
                </>
              }
              loadingState={loading ? "loading" : "idle"}
            >
              {(item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>

        <Drawer
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          position="right"
          blurBackground={true}
        >
          {(onClose) => (
            <DrawerContent>
              <DrawerHeader className="flex flex-col gap-1 text-gray-900 dark:text-white">
                {editingSubCategory
                  ? "Edit Sub-Category"
                  : "Add New Sub-Category"}
              </DrawerHeader>
              <DrawerBody>
                <Select
                  label="Select Category"
                  className="mb-4"
                  selectedKeys={[
                    (editingSubCategory?.categoryId || newSubCategory.categoryId).toString(),
                  ]}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((data) => (
                    <SelectItem key={data.id} value={data.id.toString()}>
                      {data.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Name"
                  placeholder="Enter Sub-category name"
                  value={editingSubCategory?.name || newSubCategory.name}
                  onChange={(e) =>
                    editingSubCategory
                      ? setEditingSubCategory((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      : setNewSubCategory((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                  }
                  className="mb-4"
                />
                <Input
                  label="Slug"
                  placeholder="Enter Sub category slug"
                  value={editingSubCategory?.slug || newSubCategory.slug}
                  onChange={(e) =>
                    editingSubCategory
                      ? setEditingSubCategory((prev) => ({
                          ...prev!,
                          slug: e.target.value,
                        }))
                      : setNewSubCategory((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                  }
                  className="mb-4"
                />
                <Input
                  label="Description"
                  placeholder="Enter Sub-category description"
                  value={
                    editingSubCategory?.description ||
                    newSubCategory.description
                  }
                  onChange={(e) =>
                    editingSubCategory
                      ? setEditingSubCategory((prev) => ({
                          ...prev!,
                          description: e.target.value,
                        }))
                      : setNewSubCategory((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                  }
                />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isChanging}
                  isDisabled={isChanging}
                  onPress={
                    editingSubCategory
                      ? handleUpdateCategory
                      : handleCreateSubCategory
                  }
                >
                  {editingSubCategory ? "Update" : "Create"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>
      </Card>
    </div>
  );
};

export default SubCategoryManagementComponent;