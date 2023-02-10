import React, { useEffect, useState } from 'react';
import { Button, Chip, Typography } from "@mui/material";
import { MyOrdersSectionProps } from "./types";
import { MyOrder } from "../../atoms/MyOrder";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const MyOrdersSection = ({archive}: MyOrdersSectionProps) => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  useEffect(() => {
    console.log(archive);
    setTotalOrders(archive.pagination.total)
  }, [archive]);
  return (
    <>
      <div className="px-4">
        <div className="flex -items-center justify-between">
          <Typography variant="h6" className="font-medium">
            Мои заявки
          </Typography>
          <Chip label={'Количество: ' + totalOrders} variant="outlined" />
        </div>
        <div className="mt-4">
          {archive.data.orders.slice(0, 1).map((order,index) => (
            <MyOrder order={order} key={index}  />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outlined"
            endIcon={
              <KeyboardArrowRightIcon />
            }
            className="border-[#00abc2] text-[#00abc2]"
          >
            Посмотреть все
          </Button>
        </div>
      </div>
    </>
  )
}
