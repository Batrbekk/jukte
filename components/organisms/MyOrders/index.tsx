import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { getCookie } from "cookies-next";
import { Orders } from "../Main/types/Orders";
import { MyOrder } from "../../atoms/MyOrder";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const MyOrdersView = () => {
  const token = getCookie('accessToken');
  const [archiveOrder, setArchiveOrder] = useState<Orders>();
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [countPage, setCountPage] = useState(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [showSuccessOrders, setShowSuccessOrders] = useState<boolean>(false);

  useEffect(() => {
    if (totalOrders>0) {
      setCountPage(Math.ceil(totalOrders/5));
    }
  },[totalOrders]);

  useEffect(() => {
    const getArchive = async () => {
      if (token) {
        const response = await fetch(`https://api.jukte.kz/orders/archive/?page=${paginationPage}`, {
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
        const response = await fetch(`https://api.jukte.kz/orders/archive/?page=${value}`, {
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
              Мои заявки
            </Typography>
            <Chip label={'Количество: ' + totalOrders} variant="outlined" />
          </div>
          <div className="mt-4">
            <Button
              variant="outlined"
              color="success"
              className="w-full mb-4"
              endIcon={showSuccessOrders ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              onClick={() => {
                setShowSuccessOrders(!showSuccessOrders);
              }}
            >
              Завершенные заявки
            </Button>
            {showSuccessOrders && (
              archiveOrder && archiveOrder.data.orders.filter(order => order.status === 'completed').length > 0 ? (
                archiveOrder.data.orders.filter(order => order.status === 'completed').map(filteredOrder => {
                  return <MyOrder order={filteredOrder} key={filteredOrder._id} />
                })
              ) : (
                <Typography variant="body1">
                  Завершенных заявок нету
                </Typography>
              )
            )}
          </div>
          <Divider className="my-4" />
          <div>
            <Typography variant="subtitle1" className="font-semibold mb-4">
              Не завершенные заявки
            </Typography>
            {archiveOrder && archiveOrder.data.orders.filter(order => order.status !== 'completed').length > 0 ? (
              archiveOrder.data.orders.filter(order => order.status !== 'completed').map(filteredOrder => {
                return <MyOrder order={filteredOrder} key={filteredOrder._id} />
              })
            ) : (
              <Typography variant="body1">
                Незавершенных заявок нету
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
