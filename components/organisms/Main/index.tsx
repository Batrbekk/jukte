import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../molecules/Navbar";
import { Divider, IconButton, Skeleton, Typography, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCookie } from "cookies-next";
import { UserInfoProps } from "./types/UserInfo";
import { ItemTypeProps } from "../../molecules/NavList/type/itemType";
import { MainComponent } from "./libs/MainComponent";
import { ArchiveOrders } from "./types/Orders";

export const MainView = () => {
  const token = getCookie('accessToken');
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [archiveOrder, setArchiveOrder] = useState<ArchiveOrders>();
  const [currentStep, setCurrentStep] = useState<ItemTypeProps>(ItemTypeProps.MAIN);

  const setStep = useCallback((item: ItemTypeProps) => {
    setCurrentStep(item);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const response = await fetch('https://api.jukte.kz/user/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            token: token.toString()
          },
        });
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
        return await response.json();
      }
    };
    const getArchive = async () => {
      if (token) {
        const response = await fetch('https://api.jukte.kz/orders/archive', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            token: token.toString()
          },
        });
        if (response.ok) {
          setLoading(false);
        } else {
          setLoading(false);
        }
        return await response.json();
      }
    };
    getArchive().then(r => {
      setArchiveOrder(r);
    })
    getUser().then(r => {
      setUserInfo(r);
    });
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="w-full px-4">
          <Skeleton animation="wave" variant="rounded" height={32} className="dark:bg-[#232323]" />
        </div>
        ) : (
        <div className="w-full">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              {userInfo && (
                <Navbar
                  role={userInfo.role}
                  onSetStep={setStep}
                  currentStep={currentStep}
                />
              )}
            </div>
            <IconButton className="p-0" href="#">
              <SearchIcon />
            </IconButton>
          </div>
          <div>
          </div>
        </div>
      )}
      <Divider className="my-2 dark:border-white" />
      {currentStep === ItemTypeProps.MAIN && (
        loading ? (
          <div className="w-full mt-2 px-4">
            <Skeleton animation="wave" variant="rounded" height={120} className="dark:bg-[#232323]" />
            <div className="flex items-start justify-center mt-4 gap-x-16">
              <Skeleton animation="wave" variant="circular" width={68} height={68} className="dark:bg-[#232323]" />
              <Skeleton animation="wave" variant="circular" width={68} height={68} className="dark:bg-[#232323]" />
              <Skeleton animation="wave" variant="circular" width={68} height={68} className="dark:bg-[#232323]" />
            </div>
            <Divider className="my-4 dark:border-white" />
            <Skeleton animation="wave" variant="rounded" height={32} className="dark:bg-[#232323]" />
            <Skeleton animation="wave" variant="rounded" height={56} className="dark:bg-[#232323] mt-4" />
            <div className="mt-4 flex justify-end">
              <Skeleton animation="wave" variant="rounded" width={192} height={36} className="dark:bg-[#232323] mt-4" />
            </div>
          </div>
          ) : userInfo && archiveOrder && (
          <MainComponent
            archive={archiveOrder}
            name={userInfo.name}
            surname={userInfo.surname}
            role={userInfo.role} />
        )
      )}
    </>
  )
};
