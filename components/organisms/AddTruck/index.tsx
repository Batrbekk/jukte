import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { OrderRoute } from "../../molecules/OrderRoute";
import { OrderDesc } from "../../molecules/OrderDesc";
import { getCookie } from "cookies-next";
import { AddTruckProps } from "./types";
import { ItemTypeProps } from "../../molecules/NavList/type/itemType";

export const AddTruck = ({onSetStep}: AddTruckProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const myCompany = getCookie('companyName');
  const token = getCookie('accessToken');
  const maxSteps = 3;

  //Map setState
  const [from, setFrom] = useState<string>('');
  const [transfer, setTransfer] = useState<string>('');
  const [transfer2, setTransfer2] = useState<string>('');
  const [transfer3, setTransfer3] = useState<string>('');
  const [transfer4, setTransfer4] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [freeCar, setFreeCar] = useState<boolean>(false);

  //OrderDesc setState
  const [cargoDesc, setCargoDesc] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cargoLoad, setCargoLoad] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [cub, setCub] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [transport, setTransport] = useState<string>('');

  const [disabledNext, setDisableNext] = useState<boolean>(false);
  const [loadOrder, setLoadOrder] = useState<boolean>(false);

  const getInfoFromMap = (
    duration: string,
    distance: string,
    from: string,
    transfer: string,
    transfer2: string,
    transfer3: string,
    transfer4: string,
    to: string,
  ) => {
    setDuration(duration);
    setDistance(distance);
    setFrom(from);
    setTransfer(transfer);
    setTransfer2(transfer2);
    setTransfer3(transfer3);
    setTransfer4(transfer4);
    setTo(to);
  };

  const getProduct = (product: string) => {
    setProduct(product);
  };

  const getTransport = (transport: string) => {
    setTransport(transport);
  };

  const getOrderDesc = (orderDesc: string) => {
    setCargoDesc(orderDesc);
  };

  const getStartDate = (startDate: string) => {
    setStartDate(startDate);
  };

  const getEndDate = (endDate: string) => {
    setEndDate(endDate);
  };

  const getCargoLoad = (cargoLoad: string) => {
    setCargoLoad(cargoLoad);
  };

  const getWeight = (weight: string) => {
    setWeight(weight);
  };

  const getCub = (cub: string) => {
    setCub(cub);
  };

  const getPrice = (price: string) => {
    setPrice(price);
  };

  const getInfoNextStepStatus = (nextStepStatus: boolean) => {
    setDisableNext(nextStepStatus);
  };

  const toCreateOrder = async () => {
    if(token) {
      const response = await fetch('https://api.jukte.kz/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token.toString()
        },
        body: JSON.stringify({
          product: cargoDesc,
          description: duration,
          price: price,
          weight: weight,
          date: `${startDate} - ${endDate}`,
          type: transport,
          from: from,
          to: freeCar ? 'На все направления' : to,
          loadType: cargoLoad,
          cubProduct: parseInt(cub),
          logPrice: 0,
          distance: freeCar ? 'Свободная' : distance,
          detail: '',
          time: new Date(),
          ownerCompany: myCompany,
          transfer1: transfer,
          transfer2: transfer2,
          transfer3: transfer3,
          transfer4: transfer4,
        })
      });
      if (response.ok) {
        console.log('SUCCESS');
      } else {
        console.log('ERROR');
      }
      return await response.json();
    }
  }

  const handleNext = () => {
    if (activeStep === 1) {
      toCreateOrder().then(r => {
        console.log(r);
        setLoadOrder(true);
      }).catch(err => {
        console.log(err);
        setLoadOrder(true);
      })
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setDisableNext(true);
    setFreeCar(false);
  };

  return (
    <div className="w-full px-4 mt-4">
      <div className="flex items-center justify-between">
        <Typography variant="h6">
          Добавить машину
        </Typography>
        <Chip label={`Шаг: ${activeStep+1}/${maxSteps}`} variant="outlined" />
      </div>
      {activeStep !== 2 && (
        <>
          <Divider className="my-4 dark:border-white" />
          <div className="flex gap-4 item-center justify-between">
            <Button fullWidth variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
              <KeyboardArrowLeft />
              Назад
            </Button>
            <Button fullWidth variant="outlined" disabled={!disabledNext} onClick={handleNext}>
              Далее
              <KeyboardArrowRight />
            </Button>
          </div>
        </>
      )}
      <div className="mt-4">
        {activeStep === 0 && (
          <OrderRoute
            getInfoFromMap={getInfoFromMap}
            onNextStepStatus={getInfoNextStepStatus}
          />
        )}
        {activeStep === 1 && (
          <OrderDesc
            getOrderDesc={getOrderDesc}
            getStartDate={getStartDate}
            getEndDate={getEndDate}
            getCargoLoad={getCargoLoad}
            getWeight={getWeight}
            getCub={getCub}
            getPrice={getPrice}
            distance={distance}
            onNextStepStatus={getInfoNextStepStatus}
            duration={duration}
            getProduct={getProduct}
            getTransport={getTransport}
          />
        )}
        {activeStep === 2 && (
          loadOrder ? (
            <>
              <Typography variant="h6" className='text-center'>Заявка успешно создана</Typography>
              <div className="success-animation mt-4 mb-6">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <div className="flex flex-col gap-4">
                <Button fullWidth variant="outlined" onClick={() => {
                  onSetStep(ItemTypeProps.MY_ORDERS);
                }}>
                  Перейти в мои заявки
                </Button>
                <Button fullWidth variant="outlined" onClick={() => {
                  onSetStep(ItemTypeProps.MAIN);
                }}>
                  Перейти на главную
                </Button>
              </div>
            </>
          ) : (
            <Skeleton variant="rounded" className="w-full" height={300} />
          )
        )}
      </div>
    </div>
  )
}
