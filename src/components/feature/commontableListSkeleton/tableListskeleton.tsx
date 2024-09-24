import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

const ListSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-2 py-2 dark:from-gray-900 dark:to-black">
      <Card className="mx-auto">
        <CardHeader className="flex flex-col items-center justify-between space-y-4 px-6 py-8 sm:flex-row sm:space-y-0">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex justify-between">
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
                <div className="w-1/4 space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ListSkeleton;