import React, {useCallback, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import DatePicker from "react-datepicker";
import {ru} from "date-fns/locale";
import {weightList} from "../../../public/types/weight";
import {cubList} from "../../../public/types/cub";
import {transportList} from "../../../public/types/transport";
import {OrderDescProps} from "./types";
import moment from "moment";
import {getCookie} from "cookies-next";
import {ItemTypeProps} from "../NavList/type/itemType";


export const OrderDesc = ({
                            currentStep,
                            distance,
                            freeCar,
                            duration,
                            onNextStepStatus,
                            getOrderDesc,
                            getStartDate,
                            getEndDate,
                            getCargoLoad,
                            getWeight,
                            getCub,
                            getPrice,
                            getProduct,
                            getTransport,
                          }: OrderDescProps) => {
  const myTransport = getCookie('myTransport');
  const role = getCookie('role');
  const [transport, setTransport] = useState<string>('');
  const [orderDesc, setOrderDesc] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date);
  const [endDate, setEndDate] = useState<Date>(new Date);
  const [cargoLoad, setCargoLoad] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [cub, setCub] = useState<string>('');
  const [calcDisabled, setCalcDisabled] = useState<boolean>(true);
  const [calcRes, setCalcRes] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    getStartDate(moment(new Date()).format('DD/MM/YYYY'));
    getEndDate(moment(new Date()).format('DD/MM/YYYY'));
  }, []);

  const onChangeProduct = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(event.target.value);
    getProduct(event.target.value);
  }, []);

  const onChangeDesc = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDesc(event.target.value);
    getOrderDesc(event.target.value);
  }, []);

  const onChangeCargoLoad = useCallback((event: SelectChangeEvent) => {
    setCargoLoad(event.target.value);
    getCargoLoad(event.target.value);
  }, []);

  const onChangeWeight = useCallback((event: SelectChangeEvent) => {
    setWeight(event.target.value);
    getWeight(event.target.value);
    if (distance.length > 0) {
      setCalcDisabled(false);
    }
  }, []);

  const onChangeTransport = useCallback((event: SelectChangeEvent) => {
    setTransport(event.target.value);
    getTransport(event.target.value);
  }, []);

  const onChangeCub = useCallback((event: SelectChangeEvent) => {
    setCub(event.target.value);
    getCub(event.target.value);
  }, []);

  const onCalcPrice = useCallback(() => {
    let corrDistance = parseInt(distance.replace(/\s/g, ''));
    if (transport) {
      let transportObj = transportList.filter(obj => {
        return obj.label === transport;
      });
      let transportPrice = transportObj[0].price;
      if (transportPrice === 25) {
        let totalPrice = transportPrice * parseFloat(weight) * corrDistance;
        setPrice(totalPrice + ' ₸');
        getPrice(totalPrice + ' ₸');
      }
      else {
        let totalPrice = corrDistance * transportPrice;
        setPrice(totalPrice + ' ₸');
        getPrice(totalPrice + ' ₸');
      }
      setCalcRes(true);
    }
  }, [myTransport, transport]);

  useEffect(() => {
    if (role === 'driver') {
      if (freeCar) {
        if (startDate && endDate && cargoLoad && weight && cub) {
          onNextStepStatus(true);
        } else {
          onNextStepStatus(false);
        }
      } else {
        if (startDate && endDate && cargoLoad && weight && cub && price && distance && duration) {
          onNextStepStatus(true);
        } else {
          onNextStepStatus(false);
        }
      }
    } else {
      if(price) {
        onNextStepStatus(true);
      } else {
        onNextStepStatus(false);
      }
    }
  });

  useEffect(() => {
    if (freeCar) {
      setPrice('Договорная');
      getPrice('Договорная');
    } else {
      setPrice('');
      getPrice('');
    }
  }, [freeCar]);

  return (
    <div className="flex flex-col gap-4">
      {currentStep === ItemTypeProps.ADD_CARGO && (
        <TextField
          id="product-desc"
          label="Наименование товара"
          value={product}
          onChange={onChangeProduct}
          fullWidth
        />
      )}
      <TextField
        id="order-desc"
        label="Детали перевозки"
        value={orderDesc}
        onChange={onChangeDesc}
        multiline
        fullWidth
        rows={4}
      />
      <div className="flex justify-between gap-4">
        <div className='flex gap-2 items-center w-full'>
          <span className='text-base'>С</span>
          <DatePicker
            id="select"
            selected={startDate}
            dateFormat="dd.MM.yyyy"
            startDate={startDate}
            placeholderText={'C ' + startDate}
            dateFormatCalendar="MMMM"
            className="bg-transparent border border-gray-500 rounded p-2 w-full"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            minDate={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              getStartDate(moment(date).format('DD/MM/YYYY'));
            }}
            locale={ru}
          />
        </div>
        <div className='flex gap-2 items-center w-full'>
          <span className='text-base'>До</span>
          <DatePicker
            id="select"
            selected={endDate}
            dateFormat="dd.MM.yyyy"
            startDate={endDate}
            placeholderText={'До ' + endDate}
            dateFormatCalendar="MMMM"
            className="bg-transparent border border-gray-500 rounded p-2 w-full"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            minDate={startDate}
            onChange={(date: Date) => {
              setEndDate(date);
              getEndDate(moment(date).format('DD/MM/YYYY'));
            }}
            locale={ru}
          />
        </div>
      </div>
      <FormControl fullWidth>
        <InputLabel id="select-label">Тип транспорта</InputLabel>
        <Select
          labelId="cargo-load"
          id="cargo-load"
          value={transport}
          label="Тип транспорта"
          onChange={onChangeTransport}
        >
          {transportList.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-label">Тип погрузки</InputLabel>
        <Select
          labelId="cargo-load"
          id="cargo-load"
          value={cargoLoad}
          label="Тип погрузки"
          onChange={onChangeCargoLoad}
        >
          <MenuItem value="Задний">Задний</MenuItem>
          <MenuItem value="Боковой">Боковой</MenuItem>
          <MenuItem value="Верхний">Верхний</MenuItem>
          <MenuItem value="Любой">Любой</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-label">Вес груза</InputLabel>
        <Select
          labelId="cargo-load"
          id="cargo-load"
          value={weight}
          label="Вес груза"
          onChange={onChangeWeight}
        >
          {weightList.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="select-label">Кубометр груза</InputLabel>
        <Select
          labelId="cargo-load"
          id="cargo-load"
          value={cub}
          label="Кубометр груза"
          onChange={onChangeCub}
        >
          {cubList.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!freeCar && (
        <>
          <LoadingButton
            variant="outlined"
            disabled={calcDisabled}
            onClick={onCalcPrice}
          >
            Посчитать стоимость
          </LoadingButton>
          {calcRes && (
            <div className="rounded border p-4 flex flex-col gap-y-4">
              <Typography variant="subtitle1">
                Расчетные данные
              </Typography>
              <TextField
                id="standard-basic"
                fullWidth
                variant="standard"
                label="Расстояние"
                value={distance}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="standard-basic"
                fullWidth
                variant="standard"
                label="Время в пути"
                value={duration}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="standard-basic"
                fullWidth
                variant="standard"
                label="Цена"
                value={price}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
