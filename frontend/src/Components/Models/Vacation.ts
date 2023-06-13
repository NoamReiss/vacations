import dayjs from "dayjs";
// code, destination, description, start_date, end_date, price, file_img_name

class Vacation {
  public vacation_code: number;
  public destination: string;
  public description: string;
  public start_date: Date; // not sure
  public end_date: Date; // not sure
  public price: number;
  public file_img_name: string;
  public likes?: number;

  constructor(
    vacation_code: number,
    destination: string,
    description: string,
    start_date: Date,
    end_date: Date,
    price: number,
    file_img_name: string
  ) {
    const today = dayjs().startOf("day").toDate();
    this.vacation_code = vacation_code;
    this.destination = destination;
    this.description = description;
    this.start_date =
      start_date < today
        ? (() => {
            throw new Error("Start date cannot be earlier than today.");
          })()
        : start_date;
    this.end_date =
      end_date < start_date
        ? (() => {
            throw new Error("End date cannot be earlier than start date.");
          })()
        : end_date;
    this.price = price;
    this.file_img_name = file_img_name;
  }
}

export default Vacation;
