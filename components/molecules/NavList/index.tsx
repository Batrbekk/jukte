import React, { useEffect, useState } from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UploadIcon from '@mui/icons-material/Upload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import GppGoodIcon from '@mui/icons-material/GppGood';
import PaidIcon from '@mui/icons-material/Paid';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import { ProfileType } from "./type/profileType";
import { ItemTypeProps } from './type/itemType';
import { NavListProps } from "./type/props";

export const NavList = ({role, onSetStep, currentStep}: NavListProps) => {
  const [selectedItem, setSelectedItem] = useState<ItemTypeProps>();

  useEffect(() => {
    setSelectedItem(currentStep);
  }, []);

  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedItem === ItemTypeProps.MAIN}
          onClick={() => {
            setSelectedItem(ItemTypeProps.MAIN);
            onSetStep(ItemTypeProps.MAIN);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Главная страница" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === ItemTypeProps.MY_ORDERS}
          onClick={() => {
            setSelectedItem(ItemTypeProps.MY_ORDERS);
            onSetStep(ItemTypeProps.MY_ORDERS);
          }}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Мои заявки" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === ItemTypeProps.USER_DATA}
          onClick={() => {
            setSelectedItem(ItemTypeProps.USER_DATA);
            onSetStep(ItemTypeProps.USER_DATA);
          }}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === ItemTypeProps.ADD_CARGO}
          onClick={() => {
            setSelectedItem(ItemTypeProps.ADD_CARGO);
            onSetStep(ItemTypeProps.ADD_CARGO);
          }}
        >
          <ListItemIcon>
            <UploadIcon />
          </ListItemIcon>
          <ListItemText primary="Добавить груз" />
        </ListItemButton>
        {role === ProfileType.DRIVER && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.SEARCH_CARGO}
            onClick={() => {
              setSelectedItem(ItemTypeProps.SEARCH_CARGO);
              onSetStep(ItemTypeProps.SEARCH_CARGO);
          }}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Найти груз" />
          </ListItemButton>
        )}
        {role === ProfileType.DRIVER && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.ADD_TRUCK}
            onClick={() => {
              setSelectedItem(ItemTypeProps.ADD_TRUCK);
              onSetStep(ItemTypeProps.ADD_TRUCK);
          }}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Добавить машину" />
          </ListItemButton>
        )}
        {role === ProfileType.DRIVER && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.INSURANCE}
            onClick={() => {
              setSelectedItem(ItemTypeProps.INSURANCE);
              onSetStep(ItemTypeProps.INSURANCE);
          }}
          >
            <ListItemIcon>
              <GppGoodIcon />
            </ListItemIcon>
            <ListItemText primary="Застраховать транспорт" />
          </ListItemButton>
        )}
        {role === ProfileType.DRIVER && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.SPARES}
            onClick={() => {
              setSelectedItem(ItemTypeProps.SPARES);
              onSetStep(ItemTypeProps.SPARES);
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Купить автозапчасти" />
          </ListItemButton>
        )}
        {role === ProfileType.DRIVER && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.PAY}
            onClick={() => {
              setSelectedItem(ItemTypeProps.PAY);
              onSetStep(ItemTypeProps.PAY);
          }}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Оплатить услуги сайта" />
          </ListItemButton>
        )}
        {role === ProfileType.LOG && (
          <ListItemButton
            selected={selectedItem === ItemTypeProps.SEARCH_TRUCK}
            onClick={() => {
              setSelectedItem(ItemTypeProps.SEARCH_TRUCK);
              onSetStep(ItemTypeProps.SEARCH_TRUCK);
          }}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Найти машину" />
          </ListItemButton>
        )}
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedItem === ItemTypeProps.FAQ}
          onClick={() => {
            setSelectedItem(ItemTypeProps.FAQ);
            onSetStep(ItemTypeProps.FAQ);
          }}
        >
          <ListItemIcon>
            <LiveHelpIcon />
          </ListItemIcon>
          <ListItemText primary="Вопросы и ответы" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === ItemTypeProps.SUPPORT}
          onClick={() => {
            setSelectedItem(ItemTypeProps.SUPPORT);
            onSetStep(ItemTypeProps.SUPPORT);
          }}
        >
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText primary="Техническая поддержка" />
        </ListItemButton>
        <ListItemButton
          className="bg-red-400 text-white"
          selected={selectedItem === ItemTypeProps.EXIT}
          onClick={() => {
            setSelectedItem(ItemTypeProps.EXIT);
            onSetStep(ItemTypeProps.EXIT);
          }}
        >
          <ListItemIcon>
            <LogoutIcon className="fill-white" />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItemButton>
      </List>
    </>
  )
}
