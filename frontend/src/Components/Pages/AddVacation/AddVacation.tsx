import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";

import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./AddVacation.css";
import axios from "axios";
import dayjs from "dayjs";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Vacation from "../../Models/Vacation";
import { travel } from "../../../Redux/TravelStore";
import { addVacationAction } from "../../../Redux/VacationsReducer";

function AddVacation(): JSX.Element {
  const [vacFile, setVacFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const today = dayjs().startOf("day").toDate();
  type FormData = {
    vacation_code?: number;
    destination: string;
    start_date: Date;
    end_date: Date;
    description: string;
    price: number;
    file_img_name: string;
  };
  // This will be the schema for the form, it'll be used to validate the form when submitting.
  //z.coerce.date() is used to convert the string to a date object.

  const schema: ZodType<FormData> = z
    .object({
      destination: z
        .string()
        .min(2, { message: "Destination must have at least 2 characters" })
        .nonempty(),
      start_date: z.coerce.date().refine((data) => data >= today, {
        message: "Start date must be today or in the future",
      }),
      end_date: z.coerce.date(),
      description: z
        .string()
        .min(2, { message: "Description is too short" })
        .nonempty(),
      price: z
        .number()
        .positive()
        .max(10000, { message: "Price must be equal to or less than $10,000" }),
      file_img_name: z.string().nonempty(),
    })
    .refine((data) => data.start_date < data.end_date, {
      message: "End date must be after start date",
      path: ["end_date"],
    });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file) {
      return "No file selected";
    }
    setVacFile(file);
    setImage(URL.createObjectURL(file));
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleDelete = () => {
    setVacFile(null);
    setImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormData) => {
    const imageData = new FormData();
    imageData.append("image", vacFile!);

    try {
      const addVacationRes = await axios.post(
        "http://localhost:4000/api/v1/vacations/addVacation",
        { ...data, file_img_name: vacFile?.name || "" }
      );

      const vacationId = addVacationRes.data.vacationId;

      await axios.put(
        `http://localhost:4000/api/v1/vacations/upload/${vacationId}`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newVacation = new Vacation(
        addVacationRes.data.vacationId,
        data.destination,
        data.description,
        new Date(data.start_date),
        new Date(data.end_date),
        data.price,
        vacFile?.name || ""
      );
      travel.dispatch(addVacationAction(newVacation));

      navigate("/");
    } catch (err) {
      console.log("error occurred in onSubmit function: ", err);
    }
  };

  return (
    <div className="AddVacation">
      <form className="addVacationForm" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          Add Vacation{" "}
          <FontAwesomeIcon icon={faUmbrellaBeach} color="#FFC857" />
        </Typography>
        <TextField
          className="destination"
          type="text"
          label="Destination"
          {...register("destination")}
          error={!!errors.destination}
          helperText={errors.destination?.message}
          onBlur={() => trigger("destination")}
        />
        <TextField
          multiline
          minRows={1}
          className="desc"
          type="text"
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          onBlur={() => trigger("description")}
        />
        <div className="dateDiv">
          <Typography variant="subtitle2">Start Date</Typography>
          <TextField
            type="date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("start_date", { valueAsDate: true })}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            onBlur={() => trigger("start_date")}
          />
          <Typography variant="subtitle2">End Date</Typography>
          <TextField
            type="date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("end_date", { valueAsDate: true })}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            onBlur={() => trigger("end_date")}
          />
        </div>
        {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
        <TextField
          style={{ width: "50%", alignSelf: "center" }}
          type="number"
          label="Price"
          {...register("price", { valueAsNumber: true })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={!!errors.price}
          helperText={errors.price ? errors.price.message : ""}
          onBlur={() => trigger("price")}
        />
        <div className="fileInput" onClick={handleClick}>
          <input
            accept="image/*"
            type="file"
            id="image-file"
            name="image"
            ref={inputRef}
            className="input-field"
            onChange={handleImageChange}
            hidden
          />
          {image ? (
            <img src={image} width={"100%"} height={"100%"} alt={File.name} />
          ) : (
            <MdCloudUpload size={50} color="#0075A2" />
          )}
          {!image && <span>Upload Image</span>}
          <input
            type="text"
            style={{ display: "none" }}
            value={"file_img_name"}
            {...register("file_img_name")}
          />
        </div>
        <span>
          {image && (
            <>
              <Typography variant="subtitle2">{vacFile?.name}</Typography>
              <MdDelete onClick={handleDelete} />
            </>
          )}
        </span>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          type="submit">
          <Typography>Add Vacation</Typography>
        </Button>
        <br />
      </form>
    </div>
  );
}

export default AddVacation;
