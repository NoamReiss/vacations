class Follower {
  public id: number;
  public user_code: number;
  public vacation_code: number;

  constructor(id: number, user_code: number, vacation_code: number) {
    this.id = id;
    this.user_code = user_code;
    this.vacation_code = vacation_code;
  }
}

export default Follower;
