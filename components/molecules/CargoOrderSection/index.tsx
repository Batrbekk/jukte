import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getCookie } from "cookies-next";
import { Orders } from "../../organisms/Main/types/Orders";
import { CargoOrder } from "../../atoms/CargoOrder";

export const CargoOrderSection = () => {
  const token = getCookie('accessToken');
  const [cargoOrders, setCargoOrders] = useState<Orders>();
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getOrders = async () => {
      if (token) {
        const response = await fetch('https://api.jukte.kz/orders/', {
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

    getOrders().then(r => {
      setCargoOrders(r);
      setTotalOrders(r.pagination.total);
    })
  }, [token]);

  return (
    <div className="px-4">
      {loading ? (
        <>
          <Skeleton animation="wave" variant="rounded" height={32} className="dark:bg-[#232323]" />
          <Skeleton animation="wave" variant="rounded" height={56} className="dark:bg-[#232323] mt-4" />
          <div className="mt-4 flex justify-end">
            <Skeleton animation="wave" variant="rounded" width={192} height={36} className="dark:bg-[#232323] mt-4" />
          </div>
        </>
        ) : (
        <>
          <div className="flex -items-center justify-between">
            <Typography variant="h6" className="font-medium">
              Грузы
            </Typography>
            <Chip label={'Количество: ' + totalOrders} variant="outlined" />
          </div>
          <div className="mt-4">
            {cargoOrders && cargoOrders.data.orders.length > 0 ? (
              cargoOrders.data.orders.slice(0, 1).map((order,index) => (
                <CargoOrder order={order} key={index}  />
              ))
            ) : (
              <Typography variant="body1">
                Пожалуйста посмотрите позже, грузов временно нет.
              </Typography>
            )}
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
        </>
      )}
    </div>
  )
}
