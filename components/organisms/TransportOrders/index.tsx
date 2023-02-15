import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { getCookie } from "cookies-next";
import { Orders } from "../Main/types/Orders";
import { TransportOrder } from "../../atoms/TransportOrder";

export const TransportOrdersView = () => {
  const token = getCookie('accessToken');
  const [archiveOrder, setArchiveOrder] = useState<Orders>();
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [countPage, setCountPage] = useState(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);

  useEffect(() => {
    if (totalOrders>0) {
      setCountPage(Math.ceil(totalOrders/5));
    }
  },[totalOrders]);

  useEffect(() => {
    const getArchive = async () => {
      if (token) {
        const response = await fetch(`https://api.jukte.kz/orders/?page=${paginationPage}`, {
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
      setTotalOrders(r.pagination.total);
    })
  }, [token]);

  const handlePagination = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationPage(value);
    setLoading(true);
    const getArchive = async () => {
      if (token) {
        const response = await fetch(`https://api.jukte.kz/orders/?page=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            token: token.toString(),
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
  };

  return (
    <div className="w-full px-4 mt-4">
      {loading ? (
        <>
          <Skeleton animation="wave" variant="rounded" height={32} className="dark:bg-[#232323]" />
          <Skeleton animation="wave" variant="rounded" height={56} className="dark:bg-[#232323] mt-4" />
          <Skeleton animation="wave" variant="rounded" height={56} className="dark:bg-[#232323] mt-4" />
          <Skeleton animation="wave" variant="rounded" height={56} className="dark:bg-[#232323] mt-4" />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Typography variant="h6">
              Свободные машины
            </Typography>
            <Chip label={'Количество: ' + totalOrders} variant="outlined" />
          </div>
          <div className="mt-4">
            {archiveOrder && archiveOrder.data.orders.length > 0 ? (
              archiveOrder.data.orders.map((order,index) => (
                <TransportOrder order={order} key={index}  />
              ))
            ): (
              <Typography variant="body1">
                Пожалуйста посмотрите позже, свободных машин нет.
              </Typography>
            )}
          </div>
          {totalOrders > 5 && (
            <div className='flex justify-center mt-8'>
              <Pagination
                count={countPage}
                color='primary'
                page={paginationPage}
                onChange={handlePagination}
                shape="rounded"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
