import { ApiModelProperty } from '@nestjs/swagger';

export class MenuInput {

  @ApiModelProperty()
  RestaurantId: number;

  @ApiModelProperty()
  Name: string;

  @ApiModelProperty()
  ImageUrl: string;

  @ApiModelProperty()
  PreparationTime: number;

  @ApiModelProperty()
  Amount: number;

  @ApiModelProperty()
  Type: string;
}
