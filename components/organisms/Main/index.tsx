import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../molecules/Navbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCookie, setCookie } from "cookies-next";
import { UserInfoProps } from "./types/UserInfo";
import { ItemTypeProps } from "../../molecules/NavList/type/itemType";
import { MainComponent } from "./libs/MainComponent";
import { Faq } from "../Faq";
import { useRouter } from "next/router";
import { Profile } from "../Profile";
import { MyOrdersView } from "../MyOrders";

export const MainView = () => {
  const token = getCookie('accessToken');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [currentStep, setCurrentStep] = useState<ItemTypeProps>(ItemTypeProps.MAIN);

  const setStep = useCallback((item: ItemTypeProps) => {
    if (item === ItemTypeProps.SUPPORT) {
      setLoading(true);
      router.push('https://telegram.me/jukte/');
    } else if (item === ItemTypeProps.INSURANCE) {
      setLoading(true);
      router.push('https://wa.me/77054051303');
    } else if (item === ItemTypeProps.PAY) {
      setLoading(true);
      router.push('https://api.paybox.money/payment.php?pg_merchant_id=546728&pg_amount=5000&pg_currency=KZT&pg_description=%D0%A3%D1%81%D0%BB%D1%83%D0%B3%D0%B8+%D1%81%D0%B0%D0%B9%D1%82%D0%B0&pg_salt=vDZOYGx9r3JhaI4o&pg_language=ru&pg_sig=e0ce8a46ebb56822b103c791333b996e');
    } else if (item === ItemTypeProps.EXIT) {
      setExitModal(!exitModal);
    } else {
      setCurrentStep(item);
    }
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

    getUser().then(r => {
      setCookie('myPhone', r.phone);
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
          </div>
          ) : userInfo && (
          <MainComponent
            onSetStep={setStep}
            name={userInfo.name}
            surname={userInfo.surname}
            role={userInfo.role} />
        )
      )}
      {currentStep === ItemTypeProps.FAQ && (
        <Faq />
      )}
      {currentStep === ItemTypeProps.USER_DATA && (
        <Profile />
      )}
      {currentStep === ItemTypeProps.MY_ORDERS && (
        <MyOrdersView />
      )}
      <Modal open={exitModal} onClose={() => {
        setExitModal(false);
      }}>
        <Paper
          elevation={3}
          className="absolute left-2/4 top-2/4 w-11/12 h-1/6 translate-y-[-50%] translate-x-[-50%] border-[#00abc2] p-4 flex flex-col justify-between"
        >
          <div className="text-center flex items-center justify-center">
            <Typography variant="h6">
              Вам точно хотите выйти ?
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-8">
            <LoadingButton
              variant="outlined"
              color="success"
              className="w-full"
              loading={loading}
              onClick={() => {
                setExitModal(false);
                setLoading(true);
                router.push('/');
              }}
            >
              Да
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              color="error"
              className="w-full"
              loading={loading}
              onClick={() => {
                setExitModal(false);
              }}
            >
              Нет
            </LoadingButton>
          </div>
        </Paper>
      </Modal>
    </>
  )
};
