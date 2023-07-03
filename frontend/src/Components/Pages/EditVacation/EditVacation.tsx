import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, InputAdornment, TextField, Typography } from "@mui/material";

import { MdCloudUpload, MdDelete } from "react-icons/md";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditVacation.css";
import Vacation from "../../Models/Vacation";
import { updatedVacationAction } from "../../../Redux/VacationsReducer";
import { travel } from "../../../Redux/TravelStore";

function EditVacation(): JSX.Element {
  const [editedVacation, setEditedVacation] = useState<Vacation | null>(null);
  const [vacFile, setVacFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  type FormData = {
    vacation_code?: number;
    destination: string;
    description: string;
    start_date: Date;
    end_date: Date;
    price: number;
    file_img_name: string;
  };

  const schema: ZodType<FormData> = z
    .object({
      destination: z
        .string()
        .min(2, { message: "Destination must have at least 2 characters" })
        .nonempty(),
      start_date: z.coerce.date(),
      end_date: z.coerce.date(),
      description: z
        .string()
        .min(2, { message: "Description too short" })
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
  const { id } = useParams();

  useEffect(() => {
    const getVacation = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/vacations/list/${id}`)
        .then((response) => {
          setEditedVacation(response.data[0]);

          setImage(
            `http://localhost:4000/${id}_${response.data[0].file_img_name}`
          );
        });
    };
    getVacation();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    const imageData = new FormData();
    imageData.append("image", vacFile!);

    const updatedVacation = new Vacation(
      editedVacation?.vacation_code!,
      data.destination,
      data.description,
      data.start_date,
      data.end_date,
      data.price,
      vacFile ? vacFile.name : editedVacation!.file_img_name
    );

    await axios.put(
      `http://localhost:4000/api/v1/vacations/updateVacation`,
      updatedVacation
    );
    if (editedVacation?.file_img_name !== `${id}_${vacFile?.name}`) {
      axios.put(
        `http://localhost:4000/api/v1/vacations/upload/${id}`,
        imageData
      );
    }
    travel.dispatch(updatedVacationAction(updatedVacation));
    navigate("/");
  };

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

  return (
    <div className="EditVacation">
      {editedVacation && (
        <form className="editVacationForm" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">
            Edit Vacation{" "}
            <FontAwesomeIcon icon={faUmbrellaBeach} color="#FFC857" />
          </Typography>
          <TextField
            defaultValue={editedVacation.destination}
            className="destination"
            type="text"
            label="Destination"
            {...register("destination")}
            error={!!errors.destination}
            helperText={errors.destination?.message}
            onBlur={() => trigger("destination")}
          />
          <TextField
            defaultValue={editedVacation.description}
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
              defaultValue={new Date(editedVacation.start_date)
                .toISOString()
                .slice(0, 10)}
              type="date"
              {...register("start_date", { valueAsDate: true })}
              error={!!errors.start_date}
              helperText={errors.start_date?.message}
              onBlur={() => trigger("start_date")}
            />
            <Typography variant="subtitle2">End Date</Typography>
            <TextField
              defaultValue={new Date(editedVacation.end_date)
                .toISOString()
                .slice(0, 10)}
              type="date"
              {...register("end_date", { valueAsDate: true })}
              error={!!errors.end_date}
              helperText={errors.end_date?.message}
              onBlur={() => trigger("end_date")}
            />
          </div>
          {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
          <TextField
            defaultValue={editedVacation.price}
            style={{ width: "50%", alignSelf: "center" }}
            type="number"
            label="Price"
            {...register("price", { valueAsNumber: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
                <Typography variant="subtitle2">
                  {vacFile?.name
                    ? vacFile.name
                    : `${id}_${editedVacation.file_img_name}`}
                </Typography>
                <MdDelete onClick={handleDelete} />
              </>
            )}
          </span>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit">
            <Typography>Save Changes</Typography>
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="info"
            onClick={() => navigate("/")}>
            <Typography>Cancel</Typography>
          </Button>

          <br />
        </form>
      )}
    </div>
  );
}

export default EditVacation;
