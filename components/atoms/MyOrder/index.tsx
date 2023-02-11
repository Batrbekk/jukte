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
import { getCookie } from "cookies-next";

export const MyOrder = ({order}: MyOrderProps) => {
  const token = getCookie('accessToken');
  const myPhone = getCookie('myPhone');
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
        <div className="flex items-center">
          <PaidIcon className="mr-2 fill-[#00abc2]" />
          <Typography variant="body1">
            {order.price} ₸
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
            {order.distance} км
          </Typography>
        </div>
        {order.description !== '' && (
          <div className="flex items-center">
            <AccessTimeFilledIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.description}
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
            Детали перевозок: {order.product}
          </Typography>
        </div>
        <div className="mt-4 flex flex-col gap-y-3">
          {myPhone === order.ownerPhone && (
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
          {myPhone !== order.ownerPhone && order.status === 'inProgress' && (
            <LoadingButton
              variant="outlined"
              loading={loading}
              color="success"
              className="w-full"
              onClick={() => {
                console.log('finish')}}
            >
              Завершить поездку
            </LoadingButton>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
