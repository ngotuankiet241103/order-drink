import React, { useEffect, useState } from "react";
import { TextField, Button, Container, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Frame from "./Frame";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import useStore from "../hooks/useStore";
import useOrder from "../hooks/useOrder";
import { order } from "../types/order";
import { store } from "../types/store";
const OrderSave: React.FC = () => {
  const [day, setDay] = useState<Date | null | undefined>(null);
  const [store, setStore] = useState<number>(0);
  const {insertOrder} = useOrder();
  const { stores, getAllStores } = useStore();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    if(!day || !store) return;
    console.log(store);
    
    const newOrder : order = {
      day,
      store: stores.find((s) => s.id === store) as store,
      total: 0,
    }
    console.log(newOrder);
    const data = await insertOrder(newOrder);
    if(!data) return;
    window.location.href = `/orders/${data?.order_id}`;
    
  };
  useEffect(() => {
    getAllStores();
  }, []);
  return (
    <Frame>
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Day order"
              defaultValue={dayjs(new Date().toString())}
              onChange={(newValue) => setDay(newValue?.toDate())}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div>
            <TextField
                select
                label="Store"
                value={store}
                onChange={(event) => setStore(Number(event.target.value))}
                fullWidth
                margin="normal"
                className="text-white"
            >
                {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                    <div className="flex items-center gap-4 border-b border-gray-300 py-2">
                        <span>{store.name}</span>
                    <img
                        src={store.image}
                        alt={store.name}
                        className="w-100"/>
                    </div>
                </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </div>
        {/* <TextField
                    select
                    label="Store"
                    value={store}
                    onChange={(event) => setStore(event.target.value)}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Store 1">Store 1</MenuItem>
                    <MenuItem value="Store 2">Store 2</MenuItem>
                    <MenuItem value="Store 3">Store 3</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button> */}
      </form>
    </Frame>
  );
};

export default OrderSave;
