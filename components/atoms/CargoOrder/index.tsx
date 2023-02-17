import React, { useCallback, useState } from 'react';
import { getCookie } from "cookies-next";
import { CargoOrderProps } from "./types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaidIcon from '@mui/icons-material/Paid';
import ScaleIcon from '@mui/icons-material/Scale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

export const CargoOrder = ({order}: CargoOrderProps) => {
  const token = getCookie('accessToken');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const handleModal = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const matchOrder = async () => {
    setLoading(true);
    if (token) {
      const response = await fetch(`https://api.jukte.kz/orders/match/${order._id}`, {
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

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange} className="mt-2">
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
            <ProductionQuantityLimitsIcon className="mr-2 fill-[#00abc2]" />
            <Typography variant="body1">
              {order.product}
            </Typography>
          </div>
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
          {order.detail !== '' && (
            <div className="flex items-center">
              <AccessTimeFilledIcon className="mr-2 fill-[#00abc2]" />
              <Typography variant="body1">
                {order.detail}
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
              Детали перевозок: {order.description}
            </Typography>
          </div>
          <div className="mt-4 flex flex-col gap-y-3">
            <LoadingButton
              href={'tel:+' + order.ownerPhone}
              onClick={handleModal}
              variant="outlined"
              className="w-full border-[#00abc2] text-[#00abc2]"
              endIcon={
                <LocalPhoneIcon />
              }
            >
              Позвонить отправителю
            </LoadingButton>
          </div>
        </AccordionDetails>
      </Accordion>
      <Modal open={open} onClose={handleModal}>
        <Paper
          elevation={3}
          className="absolute left-2/4 top-2/4 w-11/12 h-1/6 translate-y-[-50%] translate-x-[-50%] border-[#00abc2] p-4 flex flex-col justify-between"
        >
          <div className="text-center flex items-center justify-center">
            <Typography variant="h6">
              Вам удалось договорится ?
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-8">
            <LoadingButton
              variant="outlined"
              color="success"
              className="w-full"
              loading={loading}
              onClick={matchOrder}
            >
              Да
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              color="error"
              className="w-full"
              loading={loading}
              onClick={handleModal}
            >
              Нет
            </LoadingButton>
          </div>
        </Paper>
      </Modal>
    </>
  )
}
