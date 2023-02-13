import React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UploadIcon from '@mui/icons-material/Upload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserMainCard } from "../types/UserMainCard";
import { ProfileType } from "../../../molecules/NavList/type/profileType";
import { MyOrdersSection } from "../../../molecules/MyOrdersSection";
import { CargoOrderSection } from "../../../molecules/CargoOrderSection";
import { ItemTypeProps } from "../../../molecules/NavList/type/itemType";

export const MainComponent = ({name, surname, role, onSetStep} : UserMainCard) => {
  const onClickButton = (item: ItemTypeProps) => {
    onSetStep(item);
  };
  return (
    <>
      <div className="px-4">
        <div className="flex items-center mt-2">
          <Typography variant="h6">
            Главная страница
          </Typography>
        </div>
        <div className="mt-2 rounded relative overflow-hidden p-4">
          <div className="absolute w-[204px] h-[134px] top-[-72px] left-[6px] bg-[#00abc2] opacity-50 blur-[100px] rotate-[41deg]" />
          <div className="absolute w-[115px] h-[63px] top-[-6px] left-[258px] bg-[#00abc2] opacity-50 blur-[100px] rotate-[-26deg]" />
          <Typography className="text-[#A2A2A2]">
            {role === ProfileType.DRIVER ? "Водитель" : "Грузоотправитель"}
          </Typography>
          <Typography variant="h5" className="font-medium">
            {name + ' ' + surname}
          </Typography>
        </div>
        <div className="flex items-start justify-center gap-x-8 mt-8">
          <div className="text-center w-1/3">
            <IconButton className="rounded-full bg-black dark:bg-white">
              <UploadIcon className="fill-white dark:fill-black" />
            </IconButton>
            <Typography className="mt-2 text-xs" variant="body2">
              Добавить груз
            </Typography>
          </div>
          <div className="text-center w-1/3" onClick={(event) => {
            onClickButton(ItemTypeProps.ADD_TRUCK)
          }}>
            <IconButton className="rounded-full bg-[#00abc2]">
              <LocalShippingIcon className="fill-white" />
            </IconButton>
            <Typography className="mt-2 text-xs" variant="body2">
              Добавить машину
            </Typography>
          </div>
          <div className="text-center w-1/3" onClick={(event) => {
            onClickButton(ItemTypeProps.USER_DATA)
          }}>
            <IconButton className="rounded-full bg-black dark:bg-white">
              <AccountBoxIcon className="fill-white dark:fill-black" />
            </IconButton>
            <Typography className="mt-2 text-xs" variant="body2">
              Профиль
            </Typography>
          </div>
        </div>
      </div>
      <Divider className="my-4 dark:border-white" />
      <MyOrdersSection onSetStep={() => {
        onClickButton(ItemTypeProps.MY_ORDERS);
      }} />
      <Divider className="my-4 dark:border-white" />
      <CargoOrderSection onSetStep={() => {
        onClickButton(ItemTypeProps.CARGO_ORDERS);
      }} />
      <Divider className="my-4 dark:border-white" />
    </>
  )
}
