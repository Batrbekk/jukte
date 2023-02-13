import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRoadIcon from '@mui/icons-material/RemoveRoad';
import { MapComponent } from "../../atoms/MapComponent";
import { OrderRouteProps } from "./types";

export const OrderRoute = ({getInfoFromMap, onNextStepStatus} : OrderRouteProps) => {
  const [countTransfer, setCountTransfer] = useState<number>(0);
  const [from, setFrom] = useState<string>('');
  const [transfer, setTransfer] = useState<string>('');
  const [transfer2, setTransfer2] = useState<string>('');
  const [transfer3, setTransfer3] = useState<string>('');
  const [transfer4, setTransfer4] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const addTransfer = useCallback(() => {
    setCountTransfer(countTransfer + 1);
  }, [countTransfer]);

  const deleteTransfer = useCallback(() => {
    setCountTransfer(countTransfer - 1);
  }, [countTransfer]);

  useEffect(() => {
    if (countTransfer === 3) {
      setTransfer4('');
    } else if (countTransfer === 2) {
      setTransfer3('');
    } else if (countTransfer === 1) {
      setTransfer2('');
    } else if (countTransfer === 0) {
      setTransfer('');
    }
  }, [countTransfer]);

  const onChangeFrom = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setFrom(event.target.value);
  }, []);

  const onChangeTransfer = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer(event.target.value);
  }, []);

  const onChangeTransfer2 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer2(event.target.value);
  }, []);

  const onChangeTransfer3 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer3(event.target.value);
  }, []);

  const onChangeTransfer4 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer4(event.target.value);
  }, []);

  const onChangeTo = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTo(event.target.value);
  }, []);

  const getMapInfo = (duration: string, distance: string) => {
    setDistance(distance);
    setDuration(duration);
    getInfoFromMap(duration, distance, from, transfer, transfer2, transfer3, transfer4, to);
  }

  useEffect(() => {
    if (to && from && distance && duration) {
      onNextStepStatus(true);
    } else {
      onNextStepStatus(false);
    }
  }, [to, from, distance, duration]);

  return (
    <div className="flex flex-col gap-4">
      <TextField
        id="from"
        label="Откуда"
        variant="outlined"
        className="autofill:bg-transparent dark:autofill:bg-sky"
        value={from}
        onChange={onChangeFrom}
      />
      <>
        {countTransfer >= 1 && (
          <TextField
            id="transfer1"
            label="Промежуточный пункт"
            variant="outlined"
            value={transfer}
            onChange={onChangeTransfer}
          />
        )}
        {countTransfer >= 2 && (
          <TextField
            id="transfer2"
            label="Промежуточный пункт"
            variant="outlined"
            value={transfer2}
            onChange={onChangeTransfer2}
          />
        )}
        {countTransfer >= 3 && (
          <TextField
            id="transfer3"
            label="Промежуточный пункт"
            variant="outlined"
            value={transfer3}
            onChange={onChangeTransfer3}
          />
        )}
        {countTransfer >= 4 && (
          <TextField
            id="transfer4"
            label="Промежуточный пункт"
            variant="outlined"
            value={transfer4}
            onChange={onChangeTransfer4}
          />
        )}
        {countTransfer !== 4 && (
          <IconButton
            aria-label="addTransfer"
            className="text-[#00ABC2] dark:text-white"
            onClick={addTransfer}
          >
            <AddRoadIcon className="mr-2" />
            <Typography>
              Добавить промежуточный пункт
            </Typography>
          </IconButton>
        )}
        {countTransfer > 0 && (
          <IconButton
            aria-label="deleteTransfer"
            className="text-[#00ABC2] dark:text-white"
            onClick={deleteTransfer}
          >
            <RemoveRoadIcon className="mr-2" />
            <Typography>
              Удалить промежуточный пункт
            </Typography>
          </IconButton>
        )}
        <TextField
          id="to"
          label="Куда"
          variant="outlined"
          value={to}
          onChange={onChangeTo}
        />
        <MapComponent
          from={from}
          transfer={transfer}
          transfer2={transfer2}
          transfer3={transfer3}
          transfer4={transfer4}
          to={to}
          getInfoMap={getMapInfo}
        />
      </>
    </div>
  )
}
