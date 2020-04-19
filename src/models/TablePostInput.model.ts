import { ApiModelProperty } from '@nestjs/swagger';

export class TablePostInput {
  @ApiModelProperty()
  TableNo: number;

  @ApiModelProperty()
  RestaurantId: number;

  @ApiModelProperty()
  Size: number;

}
