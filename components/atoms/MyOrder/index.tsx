import React, { useCallback, useState } from 'react';
import { MyOrderProps } from "./types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import { LoadingButton } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaidIcon from '@mui/icons-material/Paid';
import ScaleIcon from '@mui/icons-material/Scale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { getCookie } from "cookies-next";
import Looks3Icon from "@mui/icons-material/Looks3";

export const MyOrder = ({order}: MyOrderProps) => {
  const token = getCookie('accessToken');
  const myPhone = getCookie('myPhone');
  const role = getCookie('role');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteOrder = async () => {
    setLoading(true);
    if (token) {
      const response = await fetch(`https://api.jukte.kz/orders/delete/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          token: token.toString()
        },
      });
      if (response.ok) {
        setLoading(false);
        location.reload();
      } else {
        setLoading(false);
        location.reload();
      }
      return await response.json();
    }
  };

  const handleChange = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Accordion expanded={expanded} onChange={handleChange} className="w-full mt-2">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className="px-2"
      >
        <div className="flex items-center">
          {order.status === 'open' && (
            <Chip label="Открытая" variant="outlined" className="border-[#00abc2] text-[#00abc2] mr-2" />
          )}
          {order.status === 'inProgress' && (
            <Chip label="В процессе" variant="outlined" color="warning" className="mr-2" />
          )}
          <Typography variant="body2" className="">
            {order.from} - {order.to}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-2">
        <div className="flex items-center">
          <AccountCircleIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.ownerCompany}
          </Typography>
        </div>
        {role !== 'driver' && (
          <div className="flex items-center">
            <ProductionQuantityLimitsIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.product}
            </Typography>
          </div>
        )}
        <div className="flex items-center">
          <PaidIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.price}
          </Typography>
        </div>
        {order.weight !== "NaN" && (
          <div className="flex items-center">
            <ScaleIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.weight} тонн
            </Typography>
          </div>
        )}
        {order.cubProduct !== "NaN" && (
          <div className="flex items-center">
            <Looks3Icon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.cubProduct} м<sup>3</sup>
            </Typography>
          </div>
        )}
        <div className="flex items-center">
          <CalendarMonthIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.date}
          </Typography>
        </div>
        <div className="flex items-center">
          <LocalShippingIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.type}
          </Typography>
        </div>
        <div className="flex items-center">
          <RouteIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.distance}
          </Typography>
        </div>
        {order.description !== '' && (
          <div className="flex items-center">
            <AccessTimeFilledIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {role === 'driver' ? order.description :order.detail }
            </Typography>
          </div>
        )}
        {order.loadType !== '' && (
          <div className="flex items-center">
            <RvHookupIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.loadType}
            </Typography>
          </div>
        )}
        <div>
          <Typography>
            Детали перевозок: {role === 'driver' ? order.product : order.description}
          </Typography>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          {myPhone === order.ownerPhone && order.status !== 'inProgress' && (
            <>
              <LoadingButton
                variant="outlined"
                loading={loading}
                color="error"
                className="w-full"
                onClick={deleteOrder}
              >
                Удалить
              </LoadingButton>
              <LoadingButton variant="outlined" className="w-full border-[#00abc2] text-[#00abc2]">
                Редактировать
              </LoadingButton>
            </>
          )}
          {myPhone === order.ownerPhone && order.status === 'inProgress' && (
            <LoadingButton
              variant="outlined"
              loading={loading}
              color="success"
              className="w-full"
              onClick={() => {
                console.log('finish')
              }}
            >
              Завершить поездку
            </LoadingButton>
          )}
          {myPhone !== order.ownerPhone && order.status === 'inProgress' && role === order.ownerRole && (
            <LoadingButton
              variant="outlined"
              loading={loading}
              color="success"
              className="w-full"
              onClick={() => {
                console.log('finish')
              }}
            >
              Завершить поездку
            </LoadingButton>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
