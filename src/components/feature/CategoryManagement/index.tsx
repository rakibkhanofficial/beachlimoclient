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

const CategoryManagementComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(
    null
  );
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [isChanging, setIsChanging] = useState<boolean>(false);
  console.log("Category", categories);
  useEffect(() => {
    fetchAllCategories();
  }, []);

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

  const handleCreateCategory = async () => {
    setIsChanging(true);
    try {
      const response = await postMethod({
        route: endPoints?.category?.createCategory,
        postData: newCategory,
      });
      if (response?.data?.statusCode === 200) {
        toast?.success(response?.data?.message);
        setNewCategory({ name: "", slug: "", description: "" });
        fetchAllCategories();
        setIsDrawerOpen(false);
        setIsChanging(false);
      } else {
        toast?.error(response?.data?.message);
        setIsChanging(false);
      }
    } catch (error) {
      setIsChanging(false);
      console.error("Error creating category", error);
    }
  };

  const handleEditCategory = (category: CategoryType) => {
    setEditingCategory(category);
    setIsDrawerOpen(true);
  };

  const handleUpdateCategory = async () => {
    setIsChanging(true);
    if (!editingCategory) return;
    try {
      const response = await putMethod({
        route: endPoints?.category?.updateCategory(editingCategory.id),
        updateData: editingCategory,
      });
      if (response?.data?.statusCode === 200) {
        toast?.success(response?.data?.message);
        setIsChanging(false);
        setEditingCategory(null);
        setIsDrawerOpen(false);
        fetchAllCategories();
      } else {
        toast?.error(response?.data?.message);
        setIsChanging(false);
      }
    } catch (error) {
      setIsChanging(false);
      console.error("Error updating category", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteMethod({
        route: `${endPoints?.category?.deleteCategory}/${id}`,
        deleteData: "",
      });
      fetchAllCategories();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const columns = [
    { key: "name", label: "NAME" },
    { key: "slug", label: "SLUG" },
    { key: "description", label: "DESCRIPTION" },
    { key: "actions", label: "ACTIONS" },
  ];

  const renderCell = (category: CategoryType, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-gray-900 dark:text-gray-100">
              {category.name}
            </p>
          </div>
        );
      case "slug":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {category.slug}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {category.description}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="secondary" content="Edit category">
              <span className="text-lg cursor-pointer active:opacity-50 text-blue-600 dark:text-blue-400">
                <FaEdit onClick={() => handleEditCategory(category)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete category">
              <span className="text-lg cursor-pointer active:opacity-50 text-red-600 dark:text-red-400">
                <FaTrash onClick={() => handleDeleteCategory(category.id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return category[columnKey as keyof CategoryType];
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
            Category Management
          </h1>
          <Button
            color="primary"
            endContent={<FaPlus />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add New Category
          </Button>
        </CardHeader>
        <Divider className="bg-gray-200 dark:bg-gray-600" />
        <CardBody>
          <Table aria-label="Category table" className="min-w-full">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={categories}
              emptyContent={
                <p className="text-gray-500 dark:text-gray-400">
                  No categories found
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
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DrawerHeader>
              <DrawerBody>
                <Input
                  label="Name"
                  placeholder="Enter category name"
                  value={editingCategory?.name || newCategory.name}
                  onChange={(e) =>
                    editingCategory
                      ? setEditingCategory((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      : setNewCategory((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                  }
                  className="mb-4"
                />
                <Input
                  label="Slug"
                  placeholder="Enter category slug"
                  value={editingCategory?.slug || newCategory.slug}
                  onChange={(e) =>
                    editingCategory
                      ? setEditingCategory((prev) => ({
                          ...prev!,
                          slug: e.target.value,
                        }))
                      : setNewCategory((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                  }
                  className="mb-4"
                />
                <Input
                  label="Description"
                  placeholder="Enter category description"
                  value={
                    editingCategory?.description || newCategory.description
                  }
                  onChange={(e) =>
                    editingCategory
                      ? setEditingCategory((prev) => ({
                          ...prev!,
                          description: e.target.value,
                        }))
                      : setNewCategory((prev) => ({
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
                    editingCategory
                      ? handleUpdateCategory
                      : handleCreateCategory
                  }
                >
                  {editingCategory ? "Update" : "Create"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>
      </Card>
    </div>
  );
};

export default CategoryManagementComponent;
