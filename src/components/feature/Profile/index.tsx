import React, { useEffect, useState } from "react";
import { endPoints } from "~@/utils/api/route";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Divider,
  Chip,
  Button,
  Input,
  Textarea,
  Skeleton,
} from "@nextui-org/react";
import {
  FaHome,
  FaBriefcase,
  FaBirthdayCake,
  FaPhone,
  FaClock,
  FaCamera,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { putMethod } from "~@/utils/api/putMethod";
import CustomCalendar from "~@/components/elements/CustomCalender";
import { MdOutlineEditOff, MdOutlineManageAccounts } from "react-icons/md";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { AnimatePresence, motion } from "framer-motion";

type UserDetails = {
  name: string;
  phone: string;
  email: string;
  image: string | null;
  birthdaydate: string | undefined;
  homeaddress: string | null | undefined;
  officeadress: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

type SelectedImageType = {
  img: File | string | Blob | null;
  imgUrl: string;
  name: string;
};

type PropsType = {
  userDetails: UserDetails;
  loading: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<boolean>;
};

const ProfileComponent = ({
  userDetails,
  loading,
  isEditing,
  setIsEditing,
}: PropsType) => {
  const { session } = useCustomSession();
  const userId = Number(session?.user?.userId);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<SelectedImageType>({
    img: null,
    imgUrl: "",
    name: "",
  });
  const [selectedName, setSelectedName] = useState<string | undefined>("");
  const [selectedPhone, setSelectedPhone] = useState<string | undefined>("");
  const [selectedEmail, setSelectedEmail] = useState<string | undefined>("");
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState<
    string | undefined
  >(new Date().toISOString().split("T")[0]);
  const [selectedHomeAddress, setSelectedHomeAddress] = useState<
    string | undefined | null
  >("");
  const [selectedOfficeAddress, setSelectedOfficeAddress] = useState<
    string | undefined | null
  >("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<
    string | undefined | null
  >("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEdit(true);
    setSelectedName(userDetails?.name);
    setSelectedPhone(userDetails?.phone);
    setSelectedEmail(userDetails?.email);
    setSelectedBirthdayDate(userDetails?.birthdaydate);
    setSelectedHomeAddress(userDetails?.homeaddress);
    setSelectedOfficeAddress(userDetails?.officeadress);
    setUploadedImageUrl(userDetails?.image);
  };

  const handleCloseEditToggle = () => {
    setIsEdit(false);
    setSelectedName(undefined);
    setSelectedPhone(undefined);
    setSelectedEmail(undefined);
    setSelectedBirthdayDate(undefined);
    setSelectedHomeAddress(undefined);
    setSelectedOfficeAddress(undefined);
    setUploadedImageUrl(undefined);
  };

  const handleDateChange = (date: Date, formattedDate: string) => {
    setSelectedBirthdayDate(formattedDate);
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
        return uploadResponse?.data?.data?.url;
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

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    let uploadimageurl = null;
    if (selectedFile.img) {
      uploadimageurl = await handleImageUpload();
    }
    try {
      setIsEditing(true);
      const updatedData = {
        name: selectedName,
        phone: selectedPhone,
        email: selectedEmail,
        birthdaydate: selectedBirthdayDate,
        homeaddress: selectedHomeAddress,
        officeadress: selectedOfficeAddress,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: uploadimageurl ? uploadimageurl : uploadedImageUrl,
      };
      const response = await putMethod({
        route: endPoints?.user?.upDateUserDetails(userId),
        updateData: updatedData,
      });
      if (response?.data?.statusCode === 200) {
        setIsEdit(false);
        setIsEditing(false);
        setIsUpdating(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
        setIsEditing(false);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
      setIsEditing(false);
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const headerVariants = {
    view: {
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    edit: {
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const headerContentVariants = {
    view: { opacity: 1, y: 0 },
    edit: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const containerVariants = {
    view: { height: "auto", opacity: 1 },
    edit: { height: "auto", opacity: 1 },
  };

  const fieldVariants = {
    view: { opacity: 1, y: 0 },
    edit: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const renderField = (
    icon: React.ReactElement,
    viewContent: React.ReactNode,
    editContent: React.ReactNode
  ) => (
    <motion.div
      className="flex items-center overflow-hidden"
      variants={containerVariants}
      initial="view"
      animate={isEdit ? "edit" : "view"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {icon}
      <AnimatePresence mode="wait">
        <motion.div
          key={isEdit ? "edit" : "view"}
          variants={fieldVariants}
          initial="exit"
          animate={isEdit ? "edit" : "view"}
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ width: "100%" }}
        >
          {isEdit ? editContent : viewContent}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const renderBirthdayField = () => (
    <div className="flex items-center">
      <FaBirthdayCake className="text-default-400 mr-2 flex-shrink-0" />
      <AnimatePresence mode="wait">
        {isEdit ? (
          <motion.div
            key="edit-birthday"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <CustomCalendar
              defaultValue={selectedBirthdayDate}
              maxValue={new Date(2025, 11, 31)}
              onChange={handleDateChange}
              disablePastDates={false}
            />
          </motion.div>
        ) : (
          <motion.p
            key="view-birthday"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {userDetails.birthdaydate
              ? formatDate(userDetails.birthdaydate)
              : "Not provided"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  const ProfileSkeleton = () => (
    <div className="w-full m-2">
      <Card className="w-full shadow-lg">
        <CardHeader className="justify-between items-start">
          <div className="flex gap-5">
            <Skeleton className="rounded-full w-12 h-12" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <Skeleton className="rounded-full w-8 h-8" />
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="rounded-full w-5 h-5" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
              </div>
            ))}
            <Divider />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="rounded-full w-5 h-5" />
                <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className=" w-full flex justify-center">
      <Card className="w-full shadow-lg">
        <motion.div
          variants={headerVariants}
          initial="view"
          animate={isEdit ? "edit" : "view"}
        >
          <CardHeader className="justify-between items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={isEdit ? "edit" : "view"}
                variants={headerContentVariants}
                initial="exit"
                animate={isEdit ? "edit" : "view"}
                exit="exit"
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex gap-4 w-full"
              >
                <Avatar
                  isBordered
                  radius="full"
                  size={isEdit ? "lg" : "md"}
                  src={
                    selectedFile.imgUrl || userDetails.image || "/avatar.png"
                  }
                  className="transition-all duration-300 ease-in-out"
                />
                {isEdit && (
                  <>
                    <input
                      title="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload">
                      <Button
                        as="span"
                        isIconOnly
                        color="warning"
                        variant="faded"
                        aria-label="Change photo"
                        isLoading={uploading}
                        className="transition-all duration-300 ease-in-out hover:scale-105"
                      >
                        <FaCamera size={20} />
                      </Button>
                    </label>
                  </>
                )}
                <div className="flex flex-col gap-1 items-start justify-center">
                  <AnimatePresence mode="wait">
                    {isEdit ? (
                      <motion.div
                        key="edit-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          name="name"
                          value={selectedName}
                          onChange={(e) => setSelectedName(e.target.value)}
                          placeholder="Name"
                          className="max-w-[200px]"
                        />
                      </motion.div>
                    ) : (
                      <motion.h4
                        key="view-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl font-semibold leading-none text-default-600"
                      >
                        {userDetails.name}
                      </motion.h4>
                    )}
                  </AnimatePresence>
                  <h5 className="text-small tracking-tight text-default-400">
                    {userDetails.email}
                  </h5>
                </div>
              </motion.div>
            </AnimatePresence>
            <div>
              <AnimatePresence mode="wait">
                {isEdit ? (
                  <motion.div
                    key="close-edit"
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Button
                      color="danger"
                      isIconOnly
                      onClick={handleCloseEditToggle}
                      className="transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      <MdOutlineEditOff color="white" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open-edit"
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Button
                      color="primary"
                      isIconOnly
                      onClick={handleEditToggle}
                      className="transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      <FaEdit />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardHeader>
        </motion.div>
        <Divider />
        <CardBody>
          <motion.div
            className="space-y-4"
            layout
            transition={{ duration: 0.3 }}
          >
            {renderField(
              <FaPhone className="text-default-400 mr-2 flex-shrink-0" />,
              <p>{userDetails.phone}</p>,
              <Input
                name="phone"
                value={selectedPhone}
                onChange={(e) => setSelectedPhone(e.target.value)}
                placeholder="Phone"
              />
            )}
            {renderBirthdayField()}
            {renderField(
              <FaHome className="text-default-400 mr-2 flex-shrink-0" />,
              <p>{userDetails.homeaddress || "Not provided"}</p>,
              <Textarea
                name="homeaddress"
                value={selectedHomeAddress || ""}
                onChange={(e) => setSelectedHomeAddress(e.target.value)}
                placeholder="Home Address"
              />
            )}
            {renderField(
              <FaBriefcase className="text-default-400 mr-2 flex-shrink-0" />,
              <p>{userDetails.officeadress || "Not provided"}</p>,
              <Textarea
                name="officeadress"
                value={selectedOfficeAddress || ""}
                onChange={(e) => setSelectedOfficeAddress(e.target.value)}
                placeholder="Office Address"
              />
            )}
            <AnimatePresence>
              {isEdit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end overflow-hidden"
                >
                  <Button
                    color="secondary"
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                    isLoading={isUpdating}
                    endContent={<MdOutlineManageAccounts />}
                    className="transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <Divider />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaClock className="text-default-400 mr-2" />
                <p className="text-small text-default-400">Member since</p>
              </div>
              <Chip color="primary" variant="flat" size="sm">
                {formatDate(userDetails.createdAt)}
              </Chip>
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileComponent;
