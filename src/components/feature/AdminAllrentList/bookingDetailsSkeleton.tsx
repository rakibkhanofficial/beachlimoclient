import React from "react";
import {
  Card,
  CardBody,
  Skeleton,
  Divider,
  Tabs,
  Tab
} from "@nextui-org/react";

const BookingDetailsSkeleton = () => {
  return (
    <div className="py-6">
      <Skeleton className="rounded-lg">
        <div className="h-8 w-3/4 mx-auto mb-6"></div>
      </Skeleton>

      <Card className="mb-6">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="rounded-lg">
                <div className="h-6 w-40 mb-2"></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-4 w-32"></div>
              </Skeleton>
            </div>
            <Skeleton className="rounded-full">
              <div className="h-6 w-24"></div>
            </Skeleton>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div key={i}>
                <Skeleton className="rounded-lg">
                  <div className="h-5 w-24 mb-2"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-4 w-full mb-1"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-4 w-3/4"></div>
                </Skeleton>
              </div>
            ))}
          </div>
          <Divider className="my-4" />
          <div className="flex justify-between items-center">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="rounded-lg">
                  <div className="h-5 w-24 mb-2"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-6 w-20"></div>
                </Skeleton>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Tabs aria-label="Booking Information">
        {["User Information", "Car Information"].map((tabTitle, index) => (
          <Tab key={index} title={
            <Skeleton className="rounded-lg">
              <div className="h-6 w-32"></div>
            </Skeleton>
          }>
            <Card>
              <CardBody>
                <Skeleton className="rounded-lg">
                  <div className="h-6 w-40 mb-4"></div>
                </Skeleton>
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="rounded-lg">
                    <div className="h-4 w-full mb-2"></div>
                  </Skeleton>
                ))}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>

      <div className="mt-6">
        <Skeleton className="rounded-lg">
          <div className="h-10 w-full"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default BookingDetailsSkeleton;