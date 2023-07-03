// code, destination, description, start_date, end_date, price, file_img_name

class Vacation {
  public vacation_code: number;
  public destination: string;
  public description: string;
  public start_date: Date;
  public end_date: Date;
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
    this.vacation_code = vacation_code;
    this.destination = destination;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.price = price;
    this.file_img_name = file_img_name;
  }
}

export default Vacation;
