import { ApiModelProperty } from '@nestjs/swagger';

export class RestaurantRegisterInput {
@ApiModelProperty()
Name: string;

@ApiModelProperty()
Password: string;
}
