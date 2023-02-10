import React, {ReactElement, useCallback, useState} from 'react';
import { NavList } from "../NavList";
import {IconButton, Drawer, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavbarProps} from "./type/props";
import {ItemTypeProps} from "../NavList/type/itemType";

export const Navbar = ({role, onSetStep, currentStep}: NavbarProps): ReactElement => {
  const [navState, setNavState] = useState<boolean>(false);

  const toggleDrawer = useCallback(() => {
    setNavState(!navState);
  }, [navState]);

  const sendCurrentStep = useCallback((item: ItemTypeProps) => {
    setNavState(false);
    onSetStep(item);
  }, []);

  return (
    <>
      <IconButton
        className="p-0"
        onClick={toggleDrawer}
      >
        <MenuIcon />
        <Typography variant="h6" className="ml-2">
          Меню
        </Typography>
      </IconButton>
      <Drawer
        anchor="left"
        open={navState}
        onClose={toggleDrawer}
      >
        <img src="image/logo.svg" alt="logo" className="my-4 w-28 h-6"/>
        <NavList
          role={role}
          onSetStep={sendCurrentStep}
          currentStep={currentStep}
        />
      </Drawer>
    </>
  )
}
