import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { cubList } from "../../../public/types/cub";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { weightList } from "../../../public/types/weight";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import LoadingButton from "@mui/lab/LoadingButton";
import { CargoOrdersView } from "../CargoOrders";
import { getCookie } from "cookies-next";
import { transportList } from "../../../public/types/transport";
import {TransportOrdersView} from "../TransportOrders";

export const SearchTruck = () => {
  const role = getCookie('role');
  const [transport, setTransport] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [cub, setCub] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date);
  const [endDate, setEndDate] = useState<Date>(new Date);
  const [searchCargo, setSearchCargo] = useState<boolean>(false);

  const onChangeFrom = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setFrom(event.target.value);
  }, []);

  const onChangeTo = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTo(event.target.value);
  }, []);

  const onChangeCub = useCallback((event: SelectChangeEvent) => {
    setCub(event.target.value);
  }, []);

  const onChangeTransport = useCallback((event: SelectChangeEvent) => {
    setTransport(event.target.value);
  }, []);

  const onChangeWeight = useCallback((event: SelectChangeEvent) => {
    setWeight(event.target.value);
  }, []);

  return(
    <>
      {searchCargo ? (
        role === 'logistician' ? <TransportOrdersView /> : <CargoOrdersView />
        ) : (
        <div className="w-full px-4 mt-4">
          <div className="flex items-center">
            <Typography variant="h6">
              {role == 'logistician' ? '???????????? ????????????' : '???????????? ????????'}
            </Typography>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <TextField
              fullWidth
              id="from"
              label="????????????"
              variant="outlined"
              className="autofill:bg-transparent dark:autofill:bg-sky"
              value={from}
              onChange={onChangeFrom}
            />
            <TextField
              id="to"
              label="????????"
              variant="outlined"
              value={to}
              onChange={onChangeTo}
            />
            <FormControl fullWidth>
              <InputLabel id="select-label">???????????????? ??????????</InputLabel>
              <Select
                labelId="cargo-load"
                id="cargo-load"
                value={cub}
                label="???????????????? ??????????"
                onChange={onChangeCub}
              >
                {cubList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {role === 'logistician' && (
              <FormControl fullWidth>
                <InputLabel id="select-label">?????? ????????????????????</InputLabel>
                <Select
                  labelId="cargo-load"
                  id="cargo-load"
                  value={transport}
                  label="?????? ??????????"
                  onChange={onChangeTransport}
                >
                  {transportList.map((item, index) => (
                    <MenuItem key={index} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth>
              <InputLabel id="select-label">?????? ??????????</InputLabel>
              <Select
                labelId="cargo-load"
                id="cargo-load"
                value={weight}
                label="?????? ??????????"
                onChange={onChangeWeight}
              >
                {weightList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex justify-between gap-4">
              <div className='flex gap-2 items-center w-full'>
                <span className='text-base'>??</span>
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
                  }}
                  locale={ru}
                />
              </div>
              <div className='flex gap-2 items-center w-full'>
                <span className='text-base'>????</span>
                <DatePicker
                  id="select"
                  selected={endDate}
                  dateFormat="dd.MM.yyyy"
                  startDate={endDate}
                  placeholderText={'???? ' + endDate}
                  dateFormatCalendar="MMMM"
                  className="bg-transparent border border-gray-500 rounded p-2 w-full"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  minDate={startDate}
                  onChange={(date: Date) => {
                    setEndDate(date);
                  }}
                  locale={ru}
                />
              </div>
            </div>
            <LoadingButton
              variant="outlined"
              className="border-[#00abc2] text-[#00abc2]"
              onClick={() => {
                setSearchCargo(true);
              }}
            >
              {role == 'logistician' ? '?????????? ????????????' : '?????????? ????????'}
            </LoadingButton>
          </div>
        </div>
      )}
    </>
  )
}
