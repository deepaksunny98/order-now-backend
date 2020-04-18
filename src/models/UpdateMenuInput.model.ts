import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateMenuInput {

  @ApiModelProperty()
  MenuId: number;

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
