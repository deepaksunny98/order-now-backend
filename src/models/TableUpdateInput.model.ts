import { ApiModelProperty } from '@nestjs/swagger';

export class TableUpdateInput {

  @ApiModelProperty()
  TableId: number;

  @ApiModelProperty()
  TableNo: number;

  @ApiModelProperty()
  RestaurantId: number;

  @ApiModelProperty()
  Size: number;

  @ApiModelProperty()
  Status: string;

  @ApiModelProperty()
  Time: number;
}
