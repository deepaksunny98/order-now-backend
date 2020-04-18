import { ApiModelProperty } from '@nestjs/swagger';

export class CustomerLoginInput {
  @ApiModelProperty()
  Mobile: string;
}
