import { ApiModelProperty } from '@nestjs/swagger';

export class BookingInput {
  @ApiModelProperty()
  restaurantId: number;
  @ApiModelProperty()
  cartItems: CartItems[];
  @ApiModelProperty()
  tableDetails: {
    people: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  mobileNumber: string;
  @ApiModelProperty()
  userId: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CartItems {
  @ApiModelProperty()
  MenuId: number;
  @ApiModelProperty()
  RestaurantId: number;
  @ApiModelProperty()
  Name: string;
  @ApiModelProperty()
  ImageUrl: string;
  @ApiModelProperty()
  OrderedCount: string;
  @ApiModelProperty()
  Rating: string;
  @ApiModelProperty()
  PreparationTime: number;
  @ApiModelProperty()
  Amount: number;
  @ApiModelProperty()
  Type: string;
  @ApiModelProperty()
  addtocart: number;
  @ApiModelProperty()
  totalprice: number;
}

// tslint:disable-next-line: max-classes-per-file
export class TableDetails {
  @ApiModelProperty()
  people: number;
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  phoneNumber: string;
}
